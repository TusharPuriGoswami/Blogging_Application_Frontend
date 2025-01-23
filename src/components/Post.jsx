import React from 'react'
import { Button, Card, CardBody, CardText } from 'reactstrap'

function Post({post= {title:"This is default post title" , content:"This is default post content"}}) {
  return (
    
    <Card style={{ width:'97%', left:'2%'}} className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h3 >{post.title}</h3>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,40)+"...."}} >
               
            </CardText>

            <div>
                <Button>Read More</Button>
            </div>

        </CardBody>
    </Card>


  )
}

export default Post