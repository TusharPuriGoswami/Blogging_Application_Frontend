import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap"
import { IsLoggedIn } from "../auth"
import Base from "../components/Base"
import { BASE_URL } from "../services/helper"
import { createComment, loadPost } from "../services/post-service"

const PostPage=()=>{

    const { postId } =useParams()
    const [post,setPost]=useState(null)
    const [comment,setComment]=useState({
        content:''
    })

    useEffect(()=>{
        //load post of postId

        loadPost(postId).then(data=>{
            console.log(data);
            setPost(data)

        }).catch(error=>{
            console.log(error)
            toast.error("Error in Loading post")
        })

    },[])

    const printDate=(numbers)=>{

        return new Date(numbers).toLocaleDateString()
    }

    const submitPost=()=>{

        if(!IsLoggedIn()){
            toast.error("Need to Login first !!")
            return
        }

        if(comment.content.trim()===''){
            return
        }
        createComment(comment,post.postId)
        .then(data=>{
            console.log(data);
            toast.success("Comment Submited!!")
            setPost({
                ...post,
                comments:[...post.comments,data.data]
            })
            setComment({
                content:''
            })
        }).catch(error=>{
            console.log(error);
            
        })
    }

    return(
        <Base>
        <Container className="mt-4">
            <Link to="/">Home / {post && post.title}</Link>

            <Row>
                <Col md={{size: 12}}>

                <Card className="mt-3 ps-2 border-0" >

                    {
                        (post) && (
                            <CardBody>
                        <CardText>
                            Posted By&nbsp; 
                            <b>
                                {post.user.name}
                                </b>&nbsp; on <b>{printDate(post.addedDate)}</b></CardText>

                                <CardText>
                                    <span  className="text-muted">{post.category.categoryTitle}</span>
                                </CardText>

                                <div className="divider mb-2" style={{width:'100%' , height:'1px' , background:'#e2e2e2'}}></div>

                            <cardText className="mt-3">
                            <h2>{post.title}</h2>
                            </cardText>

                            <div className="image-container mt-4" shadow style={{maxWidth:'50%'}}>
                                <img className="img-fluid" src={BASE_URL + '/post/image/'+post.imageName} alt="" />
                            </div>

                            <CardText className="mt-4" dangerouslySetInnerHTML={{__html:post.content}}>

                            </CardText>


                    </CardBody>
                        )
                    }


                    
                </Card>
                </Col>
            </Row>

            <Row className="my-3">
                <Col md={{
                    size:9,
                    offset:1
                }}>
                    <h4>Comments ({post ? post.comments.length : 0})</h4>

                    {
                        post && post.comments.map((c,index)=>(
                            <Card className=" border-1" key={index}>
                                <CardBody>
                                    <CardText>
                                        {c.content}
                                    </CardText>
                                </CardBody>
                            </Card>
                        ))
                    }

                            <Card className=" border-1">
                                <CardBody>
                                    <Input type="textarea" 
                                    placeholder="Enter comment here"
                                    value={comment.content}
                                    onChange={(event)=> setComment({content:event.target.value})}
                                     />

                                    <Button onClick={submitPost} className="mt-2" color="primary">Submit</Button>
                                </CardBody>
                            </Card>

                </Col>
            </Row>

        </Container>
        </Base>
    )
}
export default PostPage