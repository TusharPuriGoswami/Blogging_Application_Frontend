import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Container, Table } from 'reactstrap'
import { getCurrentUserDetail, IsLoggedIn } from '../auth'

const ViewUserProfile = ({ user })=> {


    const [currentUser , setCurentUser] = useState(null)
    const [login , setLogin] = useState(false)

    useEffect(()=>{
        setCurentUser(getCurrentUserDetail())
        setLogin(IsLoggedIn())
    },[])


  return (
    <Card className='mt-2 border-0 shadow-sm' >
    <CardBody>
      <h4 className="text-uppercase">User-Information</h4>
      <Container className="text-center">
        <img
          style={{ maxWidth: '170px', maxHeight: '170px' }}
          src={user.image ? user.image : 'https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM='}
          className="img-fluid rounded-circle"
          alt="user profile picture"
        />
      </Container>

      <Table responsive striped bordered={false} hover className='mt-3 text-center'>
        <tbody>
          <tr>
            <td>USER-ID</td>
            <td>USER-{user.id}</td>
          </tr>
          <tr>
            <td>NAME</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>E-MAIL</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>ABOUT</td>
            <td>{user.about}</td>
          </tr>
          <tr>
            <td>ROLE</td>
            <td>{user.roles.map((role)=>{
              return (
                <div key={role.id}>{role.name}</div>
              )
            })}</td>
          </tr>
        </tbody>
      </Table>

      {currentUser ? (currentUser.id==user.id) ? (<CardFooter className='text-center'>
        <Button color='warning'>Update Profile</Button>
      </CardFooter>):'' : ''}

    </CardBody>
  </Card>
  )
}

export default ViewUserProfile