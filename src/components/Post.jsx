// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Card, CardBody, CardText } from 'reactstrap'

// function Post({post= {title:"This is default post title" , content:"This is default post content"}}) {
//   return (
    
//     <Card style={{ width:'97%', left:'2%'}} className='border-0 shadow-sm mt-3'>
//         <CardBody>
//             <h3 >{post.title}</h3>
//             <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,30)}}> 


               
//             </CardText>

//             <div>
//                <Link className='btn btn-primary' to={'/posts/'+post.postId}>Read More</Link>
//             </div>

            

//         </CardBody>
//     </Card>



//   )
// }

// export default Post

import React, { useContext, useEffect, useState } from 'react'; // Importing useState and useEffect
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText } from 'reactstrap';
import { getCurrentUserDetail, IsLoggedIn } from '../auth';
import userContext from '../context/userContext';

function Post({post= {id:-1 , title:"This is default post title" , content:"This is default post content"} , deletePost}) {
  console.log("Rendering Post Component with Data:", post);

  // Declare state hooks before any return statements or conditionals
  const userContextData=useContext(userContext)
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);

  // Set user and login status in the effect hook
  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(IsLoggedIn());
  }, []); // empty dependency array ensures it runs once

  // Early return if post data is missing
  if (!post || !post.title) {
    return <p>Error: Post data is missing!</p>;
  }

  return (
    <Card style={{ width: '97%', left: '2%' }} className='border-0 shadow-sm mt-3'>
      <CardBody>
        <h3>{post.title}</h3>
        <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 30) }}></CardText>
        <div>
          <Link className='btn btn-primary' to={'/posts/' + (post.id || post.postId)}>
            Read More
          </Link>

         {userContextData.user.login && (user && user.id==post.user.id? 
         <Button onClick={() => {
            console.log("Delete button clicked for post:", post); // Debugging log
            deletePost(post);
        }} color='danger' className='ms-2'>Delete</Button>
        
            :'')}

{userContextData.user.login && (user && user.id==post.user.id? 
         <Button tag={Link} to={`/user/update-blog/${post.postId}`}
        //   onClick={() => {
        //     //console.log("Delete button clicked for post:", post); // Debugging log
        //     //deletePost(post);
        // }}
         color='warning' className='ms-2'>Update</Button>
        
            :'')}
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;

