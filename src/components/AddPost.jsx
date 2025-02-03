

import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { getCurrentUserDetail } from '../auth';
import { loadAllCategories } from "../services/category-service";
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service";

const AddPost = () => {
    const editor = useRef(null);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        setUser(getCurrentUserDetail());

        loadAllCategories().then((data) => {
           // console.log(data);
            setCategories(data);
        }).catch((error) => {
           // console.log(error);
        });
    }, []);

    const fieldChanged = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    const contentFieldChanged = (data) => {
        setPost({ ...post, 'content': data });
    };

    const createPost = (event) => {
        event.preventDefault();
        if (post.title.trim() === '') {
            toast.error("Post title is required!");
            return;
        }
        if (post.content.trim() === '') {
            toast.error("Post content is required!");
            return;
        }
        if (post.categoryId === '') {
            toast.error("Please select a category!");
            return;
        }

        post['userId'] = user.id;

        doCreatePost(post)
    .then((data) => {
        console.log("Post Created !!", data); // Check console if post is created
        // Image upload process
        if (image) {
            uploadPostImage(image, data.postId)
                .then(imageData => {
                    toast.success("Image Uploaded!");
                }).catch(error => {
                    toast.error("Error in uploading image!");
                   // console.log(error);
                });
        }

        toast.success("Post Created Successfully!");
        // Reset post form
        setPost({
            title: '',
            content: '',
            categoryId: ''
        });
        //setImage(null); // Reset image state
    })
    .catch((error) => {
        toast.error("Post creation failed!");
       // console.error("Error creating post:"); // Log any error in post creation
        //console.error(error); // Log any error in post creation
    });
 };


     //handling file chagne event

     const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
    
        if (!selectedFile) {
            toast.error("No file selected.");
            return;
        }
    
        // Validate file type
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(selectedFile.type)) {
            toast.error("Only JPG and PNG are allowed. !!");
            setImage(null); // Reset image state if invalid
            return;
        }
    
        // Validate file size (e.g., 2MB limit)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (selectedFile.size > maxSize) {
            toast.error("File size exceeds 2MB limit.");
            setImage(null); // Reset image state if invalid
            return;
        }
    
        // If valid, update the image state
        setImage(selectedFile);
        toast.success("File selected successfully!");
        //console.log("Selected Image:", selectedFile); // For debugging
    };


    //  const handleFileChange=(event)=>{
    //     console.log(event.target.files[0])
    //     setImage(event.target.files[0])
    // }

    


    return (
        <div className="wrapper">
            <Card style={{ width: '90%', left: '5%' }} className="shadow-sm border-0 mt-2">
                <CardBody>
                    <h3>What's going in your mind?</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title">Post title</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Enter here"
                                className="rounded-0"
                                name='title'
                                onChange={fieldChanged}
                            />
                        </div>

                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            <JoditEditor
                                ref={editor}
                                value={post.content}
                                onChange={contentFieldChanged}
                            />
                        </div>

                        {/* File Upload */}
                        <div className="mt-3">
                            <Label for="image">Select Post Image</Label>
                            <Input type="file" id="image" onChange={handleFileChange}></Input>
                        </div>

                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input
                                type="select"
                                id="category"
                                name="categoryId"
                                onChange={fieldChanged}
                                defaultValue={0}
                            >
                                <option disabled value={0}>Select category</option>
                                {categories.map((category) => (
                                    <option value={category.categoryId} key={category.categoryId}>
                                        {category.categoryTitle}
                                    </option>
                                ))}
                            </Input>
                        </div>

                        <Container className="text-center">
                            <Button type="submit" className="rounded-0" color="primary">Create Post</Button>
                            <Button type='reset' className="rounded-0 ms-2" color="danger">Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default AddPost;

