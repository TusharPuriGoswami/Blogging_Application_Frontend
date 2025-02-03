

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
           // console.log("deletePost function called with:", post); // Debugging log
            
            deletePostService(post.postId)
                .then(res => {
                    //console.log("Delete API response:", res);
                    toast.success("Post is deleted!!");
        
                    // Remove deleted post from state
                    setPosts(prevPosts => prevPosts.filter(p => p.postId !== post.postId));
                })
                .catch(error => {
                   // console.log("Delete API error:", error);
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






