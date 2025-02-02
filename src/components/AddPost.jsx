// import JoditEditor from 'jodit-react';
// import { useEffect, useRef, useState } from "react";
// import { toast } from 'react-toastify';
// import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
// import { getCurrentUserDetail } from '../auth';
// import { loadAllCategories } from "../services/category-service";
// import { createPost as doCreatePost, uploadPostImage } from "../services/post-service";

// const AddPost=()=>{

//     const editor = useRef(null)
//     //const [content,setContent] = useState('')
//     const [categories,setcategories]=useState([])
//     const[user,setUser]=useState(undefined)

//    const [post , setPost] = useState({
//         title:'',
//         content:'',
//         categoryId:''
//     })

//     const [image , setImage]=useState(null)



//     // const config={
//     //     placeholder:"Start typing...."
//     // }

//     useEffect(()=>{

//         setUser(getCurrentUserDetail())

//         loadAllCategories().then((data)=>{
//             console.log(data)
//             setcategories(data)
//         }).catch(error=>{
//             console.log(error)
//         })
//     },
//     []
// );

// //field changed function
// const fieldChanged = (event)=>{

//     //console.log(event)
//     setPost({...post,[event.target.name]:event.target.value})
// }

// const contentFieldChanged=(data)=>{
//     setPost({...post,'content':data})
// }

// //create post function
// // const createPost=(event)=>{
// //     event.preventDefault();
// //     if(post.title.trim()===''){
// //         toast.error("post title is required !!")
// //         return;
// //     }
// //     if(post.content.trim()===''){
// //         toast.error("post comment is required !!")
// //         return;
// //     }
// //     if(post.categoryId ===''){
// //         toast.error("please select some category !!")
// //         return;
// //     }

// //     //submit the form on server
// //     post['userId'] = user.id
// //     doCreatePost(post).then(data=>{


// //         // uploadPostImage(image,data.postId).then(data=>{
// //         //     toast.success("Image Uploaded!!")
// //         // }).catch(error=>{
// //         //     toast.error("Error in uploading Image!!")
// //         //     console.log(error);
            
// //         // })
        

// //         toast.success("Post Created !!")
// //         //console.log(post)
// //         setPost({
// //             title:'',
// //             content:'',
// //             categoryId:''
// //         })
// //     }).catch((error)=>{
// //         toast.error("Post not created due to some errors !!")
// //         //console.log(error)
// //     })
// // }
// const createPost = (event) => {
//     event.preventDefault();
//     if (post.title.trim() === '') {
//         toast.error("Post title is required!");
//         return;
//     }
//     if (post.content.trim() === '') {
//         toast.error("Post content is required!");
//         return;
//     }
//     if (post.categoryId === '') {
//         toast.error("Please select a category!");
//         return;
//     }

//     post['userId'] = user.id; // Assign user ID



//     doCreatePost(post)
//     .then((data) => {
//         console.log("Post Created Successfully: ", data); // Check response
//         if (image) {
//             uploadPostImage(image, data.postId)
//                 .then(() => {
//                     toast.success("Image uploaded successfully!");
//                 })
//                 .catch((error) => {
//                     toast.error("Error uploading image!");
//                     console.error("Image Upload Error: ", error);
//                 });
//         } else {
//             toast.warn("No image selected for upload.");
//         }
//         toast.success("Post created successfully!");
//         setPost({
//             title: '',
//             content: '',
//             categoryId: ''
//         });
//         setImage(null); // Reset image state
//     })
//     .catch((error) => {
//         toast.error("Post creation failed!");
//         console.error("Post Creation Error: ", error);
//     });




// //handling file change event
// // const handleFileChange=(event)=>{
// //     console.log(event.target.files[0]);
    
// // }

// // handling file change event
// const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//         setImage(selectedFile); // Update the image state with the selected file
//         console.log("File selected: ", selectedFile);
//     } else {
//         console.log("No file selected.");
//     }
// };


//     return(
//         <div className="wrapper">

//             <Card style={{width:'90%', left:'5%'}} className="shadow-sm border-0 mt-2" >
//                 <CardBody >
//                     {/* {JSON.stringify(post)} */}
//                     <h3>what's going in your mind ? </h3>

//                     <Form onSubmit={createPost}>

//                         <div className="my-3">
//                             <Label for="title">Post title </Label>
//                             <Input 
//                             type="text" 
//                             id="title"
//                             placeholder="Enter here"
//                             className="rounded-0"
//                             name='title'
//                             onChange={fieldChanged}

//                              />
//                         </div>

//                         <div className="my-3">
//                             <Label for="content">Post Content </Label>

//                             <JoditEditor 
//                             ref={editor}
//                             value={post.content}
//                            // config={config}
//                             onChange={contentFieldChanged}
//                             />
//                             {/* <Input 
//                             type="textarea" 
//                             id="content"
//                             placeholder="Enter here"
//                             className="rounded-0"
//                             style={{height:'200px'}}

//                              /> */}
//                         </div>

//                         {/* file field */}
//                         <fiv className="mt-3">
//                             <Label for='image' >Select Post Image</Label>
//                             <Input type='file' id='image' onChange={handleFileChange}></Input>
//                         </fiv>


//                         <div className="my-3">
//                             <Label for="content">Post Catrgory </Label>
//                             <Input 
//                             type="select" 
//                             id="category"
//                             placeholder="Enter here"
//                             className="rounded-0"
//                             name='categoryId'
//                             onChange={fieldChanged}
//                             defaultValue={0}

//                              >
//                                 <option disabled value={0}>Select category</option>
//                             {
//                                 categories.map((category)=>(
//                                     <option value={category.categoryId} key={category.categoryId} >
//                                         {category.categoryTitle}
//                                     </option>

//                                 ))
//                             }


//                             </Input>
//                         </div>

//                         <Container className="text-center">
//                             <Button type='submit' className="rounded-0" color="primary">Create Post</Button>
//                             <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                            
//                         </Container>

//                     </Form>
                   
//                 </CardBody>
//             </Card>
           



//          </div>
//     )
// }

// export default AddPost


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
            console.log(data);
            setCategories(data);
        }).catch((error) => {
            console.log(error);
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
                    console.log(error);
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
        console.error("Error creating post:"); // Log any error in post creation
        console.error(error); // Log any error in post creation
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
        console.log("Selected Image:", selectedFile); // For debugging
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

