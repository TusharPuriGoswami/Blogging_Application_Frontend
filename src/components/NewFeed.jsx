import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import { loadAllPosts } from '../services/post-service';
import Post from './Post';

function NewFeed() {
    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0,
        pageSize: 0,
        lastPage: false,
        pageNumber: 0,
    });

    useEffect(() => {
        // Load the first page initially
        changePage(0);
    }, []);

    const changePage = (pageNumber = 0, pageSize = 5) => {
        // Prevent navigating beyond the first and last pages
        if (postContent.lastPage && pageNumber > postContent.pageNumber) {
            return; // Prevent "Next" click on the last page
        }
        if (pageNumber < 0 || (postContent.pageNumber === 0 && pageNumber < postContent.pageNumber)) {
            return; // Prevent "Previous" click on the first page
        }

        // Fetch the new page data
        loadAllPosts(pageNumber, pageSize)
            .then((data) => {
                setPostContent({
                    ...data,
                    lastPage: data.pageNumber === data.totalPages - 1, // Check if the current page is the last page
                });
                window.scrollTo(0, 0); // Scroll to top after changing pages
            })
            .catch((error) => {
                toast.error('Error in Loading Posts!!');
            });
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col
                    md={{
                        size: 10,
                        offset: 1,
                    }}
                >
                    <h2 style={{ marginLeft: '2%' }}>
                        Blogs Count {postContent ? `(${postContent.totalElements})` : 'Loading...'}
                    </h2>

                    {postContent.content.map((post) => (
                        <Post post={post} key={post.postId} />
                    ))}

                    <Container className="mt-3">
                        <Pagination>
                            {/* Previous Button */}
                            <PaginationItem
                                onClick={() => changePage(postContent.pageNumber - 1)}
                                disabled={postContent.pageNumber === 0}
                            >
                                <PaginationLink previous>Previous</PaginationLink>
                            </PaginationItem>

                            {/* Page Numbers */}
                            {[...Array(postContent.totalPages)].map((_, index) => (
                                <PaginationItem
                                    onClick={() => changePage(index)}
                                    active={index === postContent.pageNumber}
                                    key={index}
                                >
                                    <PaginationLink>{index + 1}</PaginationLink>
                                </PaginationItem>
                            ))}

                            {/* Next Button */}
                            <PaginationItem
                                onClick={() => changePage(postContent.pageNumber + 1)}
                                disabled={postContent.lastPage}
                            >
                                <PaginationLink next>Next</PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container>
                </Col>
            </Row>
        </div>
    );
}

export default NewFeed;




// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
// import { loadAllPosts } from '../services/post-service';
// import Post from './Post';



// function NewFeed() {

//     const [postContent , setPostContent] = useState({
//         content:[],
//         totalPages:'',
//         totalElements:'',
//         pageSize:'',
//         lastPage:false,
//         pageNumber:''

//     })



//     useEffect(()=>{

//         changePage(0)
//         //load all the posts from server
//         // loadAllPosts(0,5).then((data)=>{
//         //     console.log(data);
//         //     setPostContent(data)
            
//         // }).catch(error=>{
//         //     console.log(error);
//         //     toast.error("Error in Loading posts")
            
//         // })
//       },[])


//       const changePage=(pageNumber=0,pageSize=5)=>{

//         // Prevent navigating beyond the first and last pages
//         if (pageNumber < 0 || pageNumber >= postContent.totalPages) {
//             return;
//         }


//         // if(pageNumber > postContent.pageNumber && postContent.lastPage){
//         //     return;

//         // }
//         // if(pageNumber < postContent.pageNumber && postContent.pageNumber==0){
//         //     return

//         // }
//         // if(postContent.lastPage){
//         //     return
//         // }
//         loadAllPosts(pageNumber,pageSize).then(data=>{
//             setPostContent(data)
//             console.log(data);
            
//             window.scroll(0,0)
//         }).catch(error=>{
//             toast.error("Error in Loading Posts !!")
//         })
//       }


//   return (
    
//     <div className="container-fluid">
//         <Row >
//             <Col md={
//                 {
//                     size:10,
//                     offset:1
//                 }

//             }>

//              {/* <h2>
//                 Blogs Count ( {postContent?.totalElements} )
//             </h2>  */}
//                   <h2 style={{marginLeft:'2%'}}>
//                 Blogs Count{' '}
//                 ({postContent ? postContent.totalElements : 'Loading...'})
//                 </h2>  


//                 {
//                    postContent.content.map((post)=>(
//                     <Post post={post} key={post.postId}/>
//                    ))
//                 }

//                <Container className='mt-3'>
//                <Pagination>
//                     <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={ postContent.pageNumber==0 }>
//                         <PaginationLink previous>
//                             previous
//                         </PaginationLink>
//                     </PaginationItem>

//                     {
//                         [...Array(postContent.totalPages)].map((item , index)=>(
//                             <PaginationItem onClick={()=>changePage(index)} active={index==postContent.pageNumber} key={index}>
//                                 <PaginationLink>
//                                     {index+1}
//                                 </PaginationLink>
//                             </PaginationItem>
//                         ))
//                     }

                    
//                     <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
//                         <PaginationLink next>
//                             next
//                         </PaginationLink>
//                     </PaginationItem>


//                 </Pagination>
//                </Container>


//             </Col>
//         </Row>
//     </div>
//   )
// }

// export default NewFeed