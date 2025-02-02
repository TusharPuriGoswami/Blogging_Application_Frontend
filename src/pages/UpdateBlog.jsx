// import JoditEditor from 'jodit-react'
// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
// import Base from '../components/Base'
// import userContext from '../context/userContext'
// import { loadAllCategories } from '../services/category-service'
// import { updatePost as doUpdatePost, loadPost } from '../services/post-service'



// function UpdateBlog() {

     

//     const editor = useRef(null);
//     const [categories, setCategories] = useState([]);
//     const { blogId } = useParams()
//     const object  = useContext(userContext)
//     const navigate=useNavigate()
//     const [post,setPost] = useState(null)

//     useEffect(()=>{

//          loadAllCategories().then((data) => {
//                     console.log(data);
//                     setCategories(data);
//                 }).catch((error) => {
//                     console.log(error);
//                 });

//         //load the blog from data base
//         loadPost(blogId).then(data=>{
//             console.log(data);
//             setPost({...data, categoryId : data.category.categoryId})
//         }).catch(error=>{
//             console.log(error);
//             toast.error("Error in updating the blog !!")
            
//         })
        
//     },[])

//     useEffect(()=>{
//         if(post){
//             if(post.user.id != object.user.data.id){
//                 toast.error("This is not your post !!")
//                 navigate("/")

//             }
//         }

//     },[post])


//     const handleChange=(event,fieldName)=>{
//         setPost({
//             ...post,
//             [fieldName]: event.target.value
//         })
//     }

//     const updatePost=(event)=>{
//         event.preventDefault()
//         console.log(post);
//         doUpdatePost({...post,category: {categoryId:post.categoryId}},post.postId)
//         .then(res=>{
//             console.log(res);
//             toast.success("Post Updated !!")
            
//         }).catch(error=>{
//             toast.error("Error in Updating post !!")
//             console.log(error);
            
//         })
        
//     }

//     const updateHtml=()=>{
//         return (
//             <div className="wrapper">
//                 {/* {JSON.stringify(post)} */}
//             <Card style={{ width: '90%', left: '5%' }} className="shadow-sm border-0 mt-2">
//                 <CardBody>
//                     <h3>Update Post from here !!</h3>
//                     <Form onSubmit={updatePost}>
//                         <div className="my-3">
//                             <Label for="title">Post title</Label>
//                             <Input
//                                 type="text"
//                                 id="title"
//                                 placeholder="Enter here"
//                                 className="rounded-0"
//                                 name='title'
//                                 value={post.title}
//                                 onChange={(event)=>handleChange(event,'title')}
//                             />
//                         </div>

//                         <div className="my-3">
//                             <Label for="content">Post Content</Label>
                            
//                             <JoditEditor
//                                 ref={editor}
//                                 value={post.content}
//                                 onChange={newContent=>setPost({...post,content:newContent})}
//                             />
//                         </div>

//                         {/* File Upload */}
//                         <div className="mt-3">
//                             <Label for="image">Select Post Image</Label>
//                             <Input type="file" id="image" onChange={''}></Input>
//                         </div>

//                         <div className="my-3">
//                             <Label for="category">Post Category</Label>
//                             <Input
//                                 type="select"
//                                 id="category"
//                                 name="categoryId"
//                                 onChange={(event) => handleChange(event, 'categoryId')}
//                                 //defaultValue={0}
//                                 value={post.categoryId}
//                             >
//                                 <option disabled value={0}>Select category</option>
//                                 {categories.map((category) => (
//                                     <option value={category.categoryId} key={category.categoryId}>
//                                         {category.categoryTitle}
//                                     </option>
//                                 ))}
//                             </Input>
//                         </div>

//                         <Container className="text-center">
//                             <Button type="submit" className="rounded-0" color="primary">Update Post</Button>
//                             <Button type='reset' className="rounded-0 ms-2" color="danger">Reset Content</Button>
//                         </Container>
//                     </Form>
//                 </CardBody>
//             </Card>
//         </div>
//         )
//     }

//   return (
//     <Base>
//     <Container>
//     {post && updateHtml()}
//     </Container>
   
//     </Base>
//   )
// }

// export default UpdateBlog


import JoditEditor from 'jodit-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import Base from '../components/Base';
import userContext from '../context/userContext';
import { loadAllCategories } from '../services/category-service';
import { updatePost as doUpdatePost, loadPost } from '../services/post-service';

function UpdateBlog() {
    const editor = useRef(null);
    const [categories, setCategories] = useState([]);
    const { blogId } = useParams();
    const object = useContext(userContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        loadAllCategories()
            .then((data) => setCategories(data))
            .catch((error) => console.error(error));

        loadPost(blogId)
            .then(data => {
                setPost({ ...data, categoryId: data.category.categoryId });
            })
            .catch(error => {
                console.error(error);
                toast.error("Error in loading the blog !!");
            });
    }, [blogId]);

    useEffect(() => {
        if (post && object.user?.data?.id) {
            if (post.user.id !== object.user.data.id) {
                toast.error("This is not your post !!");
                navigate("/");
            }
        }
    }, [post, object.user?.data?.id, navigate]);

    const handleChange = (event, fieldName) => {
        let value = event.target.value;
        if (fieldName === 'categoryId') {
            value = Number(value);
        }
        setPost(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const updatePost = (event) => {
        event.preventDefault();
        if (!post) return;

        doUpdatePost({ ...post, category: { categoryId: post.categoryId } }, post.postId)
            .then(res => {
                toast.success("Post Updated Successfully!");
                navigate(`/posts/${post.postId}`);
            })
            .catch(error => {
                toast.error("Error in Updating post !!");
                console.error(error);
            });
    };

    const updateHtml = () => (
        <div className="wrapper">
            <Card style={{ width: '90%', left: '5%' }} className="shadow-sm border-0 mt-2">
                <CardBody>
                    <h3>Update Post from here !!</h3>
                    <Form onSubmit={updatePost}>
                        <div className="my-3">
                            <Label for="title">Post title</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Enter here"
                                className="rounded-0"
                                name='title'
                                value={post?.title || ''}
                                onChange={(event) => handleChange(event, 'title')}
                            />
                        </div>

                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            <JoditEditor
                                ref={editor}
                                value={post?.content || ''}
                                onChange={(newContent) => setPost(prev => ({ ...prev, content: newContent }))}
                            />
                        </div>

                        <div className="mt-3">
                            <Label for="image">Select Post Image</Label>
                            <Input type="file" id="image" onChange={() => {}} />
                        </div>

                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input
                                type="select"
                                id="category"
                                name="categoryId"
                                onChange={(event) => handleChange(event, 'categoryId')}
                                value={post?.categoryId || 0}
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
                            <Button type="submit" className="rounded-0" color="primary">Update Post</Button>
                            <Button type='reset' className="rounded-0 ms-2" color="danger" onClick={() => setPost({ ...post, title: '', content: '' })}>Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );

    return (
        <Base>
            <Container>
                {post && updateHtml()}
            </Container>
        </Base>
    );
}

export default UpdateBlog;
