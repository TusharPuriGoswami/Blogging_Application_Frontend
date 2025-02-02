// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { Container } from "reactstrap";
// import { getCurrentUserDetail } from "../../auth";
// import AddPost from "../../components/AddPost";
// import Base from "../../components/Base";
// import Post from "../../components/Post";
// import { loadPostUserWise } from "../../services/post-service";

// const Userdashboard = () => {
//     const [user, setUser] = useState({});
//     const [posts, setPosts] = useState([]);
//     //const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         console.log(getCurrentUserDetail());

//         setUser(getCurrentUserDetail());

//         loadPostUserWise(getCurrentUserDetail().id)
//             .then((data) => {
//                 console.log("Fetched Posts:", data); // Log the data received

//                 // Make sure data is an array
//                 if (Array.isArray(data)) {
//                     setPosts(data) // Update posts state
//                     console.log("Posts updated:", data); // Log the updated posts
//                 } else {
//                     console.warn("Expected an array but got:", data);
//                 }
//                 //setLoading(false); // Set loading to false after fetching data
//             })
//             .catch((error) => {
//                 console.log("Error:", error);
//                 toast.error("Error in loading User Post");
//                 //setLoading(false); // Stop loading in case of error
//             });
//     }, []);

//     return (
//         <Base>
//             <Container>
//                 <AddPost />
//                 {/* Render the Blogs Count only if posts are loaded */}
//                 <h3>
//                     Blogs Count {`(${posts.length})`}
//                 </h3>

//                 {
//                     posts.map((post,index)=>{
//                         return (
//                             <Post post={post} key={index}></Post>
//                         )
//                     })
//                 }

                
                      
                
//             </Container>
//         </Base>
//     );
// };

// export default Userdashboard;






// // import React, { useEffect, useState } from 'react'




// // import { toast } from 'react-toastify'
// // import { Container } from 'reactstrap'
// // import { getCurrentUserDetail } from '../../auth'
// // import AddPost from '../../components/AddPost'
// // import Base from '../../components/Base'
// // import { loadPostUserWise } from '../../services/post-service'

// // const Userdashboard = () => {

// //   const [user , setUser] = useState({})
// //   const [posts , setPost] = useState([])


// //   useEffect(()=>{
// //     console.log(getCurrentUserDetail() );
    
// //     setUser(getCurrentUserDetail())

// //     loadPostUserWise(getCurrentUserDetail().id).then(data => {
// //       console.log(data);
// //       setPost(Array.isArray(data) ? [...data] : []);
// //     }).catch(error => {
// //       console.log(error);
// //       toast.error("Error in loading User Post");
// //     });
    

    
// //   }, [])

// //   return (
// //     <Base>
// //    <Container>
// //    <AddPost />
// //    <h3>Blogs Count ({})</h3>
// //    </Container>
// //     </Base>
// //   )
// // }

// // export default Userdashboard
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { getCurrentUserDetail } from "../../auth";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import Post from "../../components/Post";
import { deletePostService, loadPostUserWise } from "../../services/post-service";

const Userdashboard = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const currentUser = getCurrentUserDetail();
        console.log("Current User:", currentUser);
    
        if (!currentUser || !currentUser.id) {
            console.warn("No user ID found");
            return;
        }
    
        console.log("Fetching posts for user ID:", currentUser.id);
    
        loadPostUserWise(currentUser.id)
            .then((data) => {
                console.log("Fetched Posts Data (Final):", data);
                if (Array.isArray(data) && data.length > 0) {
                    setPosts(data);
                } else {
                    console.warn("Data is empty or not an array:", data);
                    setPosts([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                toast.error("Error in loading User Posts");
            });
    }, []);
    
    // function deletePost(post){
    //     //we are going to delete post
    //     deletePostService(post.postId).then(res=>{
    //         console.log(res);
    //         toast.success("Post is deleted!!")
            
    //     }).catch(error=>{
    //         console.log(error);
    //         toast.error("error in deleting Post !! ")
            
    //     })
    // }
    function deletePost(post) {
        console.log("deletePost function called with:", post); // Debugging log
        
        deletePostService(post.postId)
            .then(res => {
                console.log("Delete API response:", res);
                toast.success("Post is deleted!!");
    
                // Remove deleted post from state
                setPosts(prevPosts => prevPosts.filter(p => p.postId !== post.postId));
            })
            .catch(error => {
                console.log("Delete API error:", error);
                toast.error("Error in deleting Post!!");
            });
    }
    
    
    
    
    return (
        <Base>
            <Container>
                <AddPost />
                <h3 style={{marginLeft:'2%'}} className="my-3">Blogs Count ({posts.length})</h3>

                {posts.length > 0 ? (
                    posts.map((post) => <Post post={post} deletePost={deletePost} key={post.id || post.postId} />)
                ) : (
                    <p>No posts found.</p>
                )}
            </Container>
        </Base>
    );
};

export default Userdashboard;
