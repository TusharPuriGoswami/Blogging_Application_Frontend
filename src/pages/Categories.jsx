// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { Col, Container, Row } from 'reactstrap'
// import Base from '../components/Base'
// import CategorySideMenu from '../components/CategorySideMenu'
// import Post from '../components/Post'
// import { loadPostCategoryWise } from '../services/post-service'


// function Categories() {
//    const [posts, setPosts] = useState([]);  // Initialize posts as an empty array
//    const { categoryId } = useParams();  // Get categoryId from the URL

//    useEffect(() => {
//        console.log("Category ID:", categoryId); // Log categoryId to check if it's correct
       
//        loadPostCategoryWise(categoryId)  // Fetch posts for the selected category
//            .then(data => {
//                console.log("Loaded posts:", data);  // Log the response data

//                // Check if data is an array of posts or an object with a posts key
//                if (Array.isArray(data)) {
//                    setPosts(data);  // If it's an array, set it directly
//                } else if (data && data.posts && Array.isArray(data.posts)) {
//                    setPosts(data.posts);  // If data contains 'posts' key, use it
//                } else {
//                    console.warn("Unexpected data format:", data);  // Log unexpected formats
//                    setPosts([]);  // Set empty posts if the response is not valid
//                }
//            })
//            .catch(error => {
//                console.error(error);  // Log any errors
//                toast.error("Error in Loading Posts!");  // Show an error message
//            });
//    }, [categoryId]);  // Re-run the effect when categoryId changes

//    console.log("Posts in state:", posts);  // Log the posts in state

//    return (
//        <Base>
//            <Container className="mt-3">
//                <Row>
//                    <Col md={2} className="pt-3">
//                        <CategorySideMenu />
//                    </Col>
//                    <Col md={9}>
//                        {posts.length > 0 ? (
//                            posts.map((post, index) => (
//                                <Post key={index} post={post} />
//                            ))
//                        ) : (
//                            <p>No posts available for this category.</p>  // Display when no posts exist
//                        )}
//                    </Col>
//                </Row>
//            </Container>
//        </Base>
//    );
// }

// export default Categories;
// import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Col, Container, Row } from 'reactstrap';
// import Base from '../components/Base';
// import CategorySideMenu from '../components/CategorySideMenu';
// import Post from '../components/Post';
// import { loadPostCategoryWise } from '../services/post-service';

// function Categories() {
//     const [postContent, setPostContent] = useState({
//         content: [],
//         totalPages: 0,
//         totalElements: 0,
//         pageSize: 0,
//         lastPage: false,
//         pageNumber: 0,
//     });

//     const { categoryId } = useParams();

//     useEffect(() => {
//         console.log("Category ID:", categoryId);
//         setPostContent({
//             content: [],
//             totalPages: 0,
//             totalElements: 0,
//             pageSize: 0,
//             lastPage: false,
//             pageNumber: 0,
//         }); // Reset state on category change
//         fetchPosts(0);  // Fetch first page of posts
//     }, [categoryId]);

//     const fetchPosts = (page) => {
//         loadPostCategoryWise(categoryId, page, 5)  // Load 5 posts per page
//             .then((data) => {
//                 if (data && data.content && Array.isArray(data.content)) {
//                     setPostContent((prevContent) => ({
//                         ...prevContent,
//                         content: [...prevContent.content, ...data.content],
//                         totalPages: data.totalPages,
//                         totalElements: data.totalElements,
//                         pageSize: data.pageSize,
//                         lastPage: data.lastPage,
//                         pageNumber: data.pageNumber,
//                     }));
//                 } else {
//                     console.warn("Unexpected Data Format:", data);
//                     setPostContent((prevContent) => ({
//                         ...prevContent,
//                         lastPage: true,  // Mark last page if unexpected format
//                     }));
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching posts:", error.response?.data || error.message);
//                 toast.error("Error in Loading Posts!");
//             });
//     };

//     const loadMorePosts = () => {
//         if (!postContent.lastPage) {
//             fetchPosts(postContent.pageNumber + 1);  // Load next page of posts
//         }
//     };

//     return (
//         <Base>
//             <Container className="mt-3">
//                 <Row>
//                     <Col md={2} className="pt-3">
//                         <CategorySideMenu />
//                     </Col>
//                     <Col md={9}>
//                         <h2 style={{ marginLeft: '2%' }}>
//                             Blogs Count {postContent.totalElements > 0 ? `(${postContent.totalElements})` : 'Loading...'}
//                         </h2>

//                         <InfiniteScroll
//                             dataLength={postContent.content.length}
//                             next={loadMorePosts}
//                             hasMore={!postContent.lastPage && postContent.content.length > 0}  // Only show more if there are posts to load
//                             loader={<h4 style={{ textAlign: 'center' }}>Loading more posts...</h4>}
//                             endMessage={<p style={{ textAlign: 'center' }}><b>You have seen all posts!</b></p>}
//                         >
//                             {postContent.content.length > 0 ? (
//                                 postContent.content.map((post, index) => (
//                                     <Post key={post.id || index} post={post} />
//                                 ))
//                             ) : (
//                                 <p>No blogs available for this category.</p>
//                             )}
//                         </InfiniteScroll>
//                     </Col>
//                 </Row>
//             </Container>
//         </Base>
//     );
// }

// export default Categories;
// import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Col, Container, Row } from 'reactstrap';
// import Base from '../components/Base';
// import CategorySideMenu from '../components/CategorySideMenu';
// import Post from '../components/Post';
// import { loadPostCategoryWise } from '../services/post-service';

// function Categories() {
//     const [postContent, setPostContent] = useState({
//         content: [],
//         totalPages: 0,
//         totalElements: 0,
//         pageSize: 0,
//         lastPage: false,
//         pageNumber: 0,
//     });

//     const { categoryId } = useParams();

//     useEffect(() => {
//         console.log("Category ID:", categoryId);
//         setPostContent({
//             content: [],
//             totalPages: 0,
//             totalElements: 0,
//             pageSize: 0,
//             lastPage: false,
//             pageNumber: 0,
//         }); // Reset state on category change
//         fetchPosts(0);  // Fetch first page of posts
//     }, [categoryId]);

//     const fetchPosts = (page) => {
//         loadPostCategoryWise(categoryId, page, 5)  // Load 5 posts per page
//             .then((data) => {
//                 if (data && data.content && Array.isArray(data.content)) {
//                     setPostContent((prevContent) => ({
//                         ...prevContent,
//                         content: [...prevContent.content, ...data.content],
//                         totalPages: data.totalPages,
//                         totalElements: data.totalElements,
//                         pageSize: data.pageSize,
//                         lastPage: data.lastPage,
//                         pageNumber: data.pageNumber,
//                     }));
//                 } else {
//                     console.warn("Unexpected Data Format:", data);
//                     setPostContent((prevContent) => ({
//                         ...prevContent,
//                         lastPage: true,  // Mark last page if unexpected format
//                     }));
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching posts:", error.response?.data || error.message);
//                 toast.error("Error in Loading Posts!");
//             });
//     };

//     const loadMorePosts = () => {
//         if (!postContent.lastPage) {
//             fetchPosts(postContent.pageNumber + 1);  // Load next page of posts
//         }
//     };

//     return (
//         <Base>
//             <Container className="mt-3">
//                 <Row>
//                     <Col md={2} className="pt-3">
//                         <CategorySideMenu />
//                     </Col>
//                     <Col md={9}>
//                         <h2 style={{ marginLeft: '2%' }}>
//                             Blogs Count {postContent.totalElements > 0 ? `(${postContent.totalElements})` : 'Loading...'}
//                         </h2>

//                         <InfiniteScroll
//                             dataLength={postContent.content.length}
//                             next={loadMorePosts}
//                             hasMore={!postContent.lastPage}  // Ensures that the scroll stops when lastPage is true
//                             loader={<h4 style={{ textAlign: 'center' }}>Loading more posts...</h4>}
//                             endMessage={
//                                 postContent.content.length === 0 ? (
//                                     <p style={{ textAlign: 'center' }}>No posts available for this category.</p>
//                                 ) : (
//                                     <p style={{ textAlign: 'center' }}><b>No more posts available!</b></p>
//                                 )
//                             }
//                         >
//                             {postContent.content.length > 0 ? (
//                                 postContent.content.map((post, index) => (
//                                     <Post key={post.id || index} post={post} />
//                                 ))
//                             ) : (
//                                 <p style={{ textAlign: 'center' }}>Loading posts...</p>
//                             )}
//                         </InfiniteScroll>
//                     </Col>
//                 </Row>
//             </Container>
//         </Base>
//     );
// }

// export default Categories;



// import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Col, Container, Row } from 'reactstrap';
// import Base from '../components/Base';
// import CategorySideMenu from '../components/CategorySideMenu';
// import Post from '../components/Post';
// import { loadPostCategoryWise } from '../services/post-service';

// function Categories() {
//     const [postContent, setPostContent] = useState({
//         content: [],
//         totalElements: 0,
//         lastPage: false,
//         pageNumber: 0,
//     });

//     const { categoryId } = useParams();

//     useEffect(() => {
//         console.log("Category ID changed:", categoryId);

//         // Reset state before fetching new posts
//         setPostContent({
//             content: [],
//             totalElements: 0,
//             lastPage: false,
//             pageNumber: 0,
//         });

//         // Fetch posts for new category
//         fetchPosts(0,true); 

//     }, [categoryId]);

//     const fetchPosts = (page, reset = false) => {
        
//         loadPostCategoryWise(categoryId, page, 5) // Load 5 posts per page
//             .then((data) => {
//                 //console.log("Fetched Data:", data); // Debugging: Check response from API

//                 if (data && data.content && Array.isArray(data.content)) {
//                     setPostContent((prevContent) => {
//                         const newContent = reset ? data.content : [...prevContent.content, ...data.content];

//                         return {
//                             content: newContent,
//                             totalElements: data.totalElements,
//                             lastPage: data.lastPage,
//                             pageNumber: data.pageNumber,
//                         };
//                     });
//                 } else {
//                    // console.warn("Unexpected Data Format:", data);
//                     setPostContent((prevContent) => ({
//                         ...prevContent,
//                         lastPage: false,
//                     }));
//                 }
//             })
//             .catch((error) => {
//                 //console.error("Error fetching posts:", error.response?.data || error.message);
//                 toast.error("Error in Loading Posts!");
//             });
//     };

//     const loadMorePosts = () => {
//         if (!postContent.lastPage) {
//            fetchPosts(postContent.pageNumber + 1);
//         }
//     };

//     return (
//         <Base>
//             <Container className="mt-3">
//                 <Row>
//                     <Col md={2} className="pt-3">
//                         <CategorySideMenu />
//                     </Col>
//                     <Col md={9}>
//                         <h2 style={{ marginLeft: '2%' }}>
//                             Blogs Count {postContent.totalElements > 0 ? `(${postContent.totalElements})` : 'Loading...'}
//                         </h2>

//                         <InfiniteScroll
//                             dataLength={postContent.content.length}
//                             next={!loadMorePosts}
//                             hasMore={!postContent.lastPage}
//                             loader={<h4 style={{ textAlign: 'center' }}>Loading more posts...</h4>}
//                             endMessage={
//                                 postContent.content.length === 0 ? (
//                                     <p style={{ textAlign: 'center' }}>No posts available for this category.</p>
//                                 ) : (
//                                     <p style={{ textAlign: 'center' }}><b>No more posts available!</b></p>
//                                 )
//                             }
//                         >
//                             {postContent.content.length > 0 ? (
//                                 postContent.content.map((post) => (
//                                     <Post key={post.id} post={post} />
//                                 ))
//                             ) : (
//                                 <p style={{ textAlign: 'center' }}>Loading posts...</p>
//                             )}
//                         </InfiniteScroll>
//                     </Col>
//                 </Row>
//             </Container>
//         </Base>
//     );
// }

// export default Categories;

import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import Base from '../components/Base';
import CategorySideMenu from '../components/CategorySideMenu';
import Post from '../components/Post';
import { deletePostService, loadPostCategoryWise } from '../services/post-service';

function Categories() {
        const [posts, setPosts] = useState([]);
    
    const [postContent, setPostContent] = useState({
        content: [],
        totalElements: 0,
        lastPage: false,
        pageNumber: 0,
    });

    const { categoryId } = useParams();

    useEffect(() => {
        console.log("Category ID changed:", categoryId);

        // Reset state before fetching new posts
        setPostContent({
            content: [],
            totalElements: 0,
            lastPage: false,
            pageNumber: 0,
        });

        // Fetch posts for new category
        fetchPosts(0, true);

    }, [categoryId]);

    const fetchPosts = (page, reset = false) => {
        loadPostCategoryWise(categoryId, page, 5) // Load 5 posts per page
            .then((data) => {
                if (data && data.content && Array.isArray(data.content)) {
                    setPostContent((prevContent) => {
                        const newContent = reset ? data.content : [...prevContent.content, ...data.content];

                        // Check if we've fetched the last page
                        const lastPage = newContent.length >= data.totalElements;

                        return {
                            content: newContent,
                            totalElements: data.totalElements,
                            lastPage: lastPage, // Mark as lastPage when we have enough posts
                            pageNumber: prevContent.pageNumber + 1,
                        };
                    });
                } else {
                    setPostContent((prevContent) => ({
                        ...prevContent,
                        lastPage: true, // If unexpected data or error, treat as last page
                    }));
                }
            })
            .catch((error) => {
                toast.error("Error in Loading Posts!");
            });
    };

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


    const loadMorePosts = () => {
        if (!postContent.lastPage) {
            fetchPosts(postContent.pageNumber); // Fetch next page
        }
    };

    return (
        <Base>
            <Container className="mt-3">
                <Row>
                    <Col md={2} className="pt-3">
                        <CategorySideMenu />
                    </Col>
                    <Col md={9}>
                        <h2 style={{ marginLeft: '2%' }}>
                            Blogs Count {postContent.totalElements > 0 ? `(${postContent.totalElements})` : 'Loading...'}
                        </h2>

                        <InfiniteScroll
                            dataLength={postContent.content.length}
                            next={loadMorePosts} // Passed the function here
                            hasMore={!postContent.lastPage} // Ensure the scroll stops when lastPage is true
                            loader={<h4 style={{ textAlign: 'center' }}>Loading more posts...</h4>}
                            endMessage={
                                postContent.content.length === 0 ? (
                                    <p style={{ textAlign: 'center' }}>No posts available for this category.</p>
                                ) : (
                                    <p style={{ textAlign: 'center' }}><b>No more posts available!</b></p>
                                )
                            }
                        >
                            {postContent.content.length > 0 ? (
                                postContent.content.map((post) => (
                                    <Post deletePost={deletePost} key={post.id} post={post} />
                                ))
                            ) : (
                                <p style={{ textAlign: 'center' }}>Loading posts...</p>
                            )}
                        </InfiniteScroll>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default Categories;






