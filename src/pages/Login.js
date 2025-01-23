import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Font Awesome Icons
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { doLogin } from "../auth";
import Base from "../components/Base";
import { loginUser } from "../services/user-service";

const Login=()=>{

  const navigate=useNavigate()

    const [passwordType, setPasswordType] = useState("password"); // State for password type
    
          const togglePassword = () => {
            setPasswordType(passwordType === "password" ? "text" : "password");
          };


          const [loginDetail,setLoginDetail] = useState({
            username:'',
            password:''

          })

          //Reseting the <form action=""></form>
      const resetData=()=>{
        setLoginDetail({
          username:'',
          password:'',
        });
      }


          const handleChange=(event,field)=>{

           let actualValue=event.target.value
           setLoginDetail({
            ...loginDetail,
            [field]:actualValue
           })

          }

          

          const handleFormSubmit=(event)=>{
            event.preventDefault();
            console.log(loginDetail);

            //validation
            if(loginDetail.username.trim()=='' || loginDetail.password.trim()==''){
              toast.error("username or password is required !!")
              return;
            }



            // Submit the data to the server and generate the token
    loginUser(loginDetail)
    .then((data) => {
      console.log("User logged in successfully:");
      console.log(data);

      //save the data to LocalStorage
      doLogin(data,()=>{
        console.log("Login Detail saved to local storage")
        //redirect to user dashboard
        navigate("/user/dashboard")
      });

      // Store the token in localStorage (or any other storage mechanism)
      localStorage.setItem("token", data.token);
      toast.success("Login successful !!");
    })
    .catch((error) => {
      console.error(error);

      if (error.response?.status === 400 || error.response?.status === 404) {
        toast.error(error.response.data.message || "Invalid username or password");
      } else {
        toast.error("Something went wrong on the server!");
      }
    });
};

            // //submit the data to server and generate the token 
            // loginUser(loginDetail).then((jwtTokenData)=>{
            //   console.log("user login:");
            //   console.log(jwtTokenData)
            // }).catch(error=>{
            //   console.log(error)
            //   if(error.response.status==400 || error.response.status==404){
            //     toast.error(error.response.data.message)
            //   }else{
            //     toast.error("Something went wrong on server !!")
            //   }
              
            // })

         // }

          

    return(
     <Base>

     <Container>
        <Row  className="mt-4">
            <Col  sm={{
                size:6,offset:3
            }}>

                <Card color="dark" inverse >
                    <CardHeader>
                        <h3>Login Here</h3>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={handleFormSubmit}>

                            {/*Email field */}

                            <FormGroup>
                                <Label for="email">Enter Email</Label>
                                <Input type="text" 
                                placeholder="Enter here"
                                 id="email" 
                                 value={loginDetail.username} 
                                 onChange={(e)=> handleChange(e,'username')}
                                 >

                                 </Input>
                            </FormGroup>


                            {/*password field */}

                            {/* Password field with show/hide icon */}
                                              <FormGroup>
                                                <Label for="password">Enter Password</Label>
                                                <div style={{ position: "relative" }}>
                                                  <Input
                                                    type={passwordType}
                                                    placeholder="Enter here"
                                                    id="password"
                                                    value={loginDetail.password}
                                                    onChange={(e)=> handleChange(e,'password')}
                                                    style={{ paddingRight: "40px" }} // Add space for icon
                                                  />
                                                  <span
                                                    onClick={togglePassword}
                                                    style={{
                                                      position: "absolute",
                                                      right: "10px",
                                                      top: "50%",
                                                      transform: "translateY(-50%)",
                                                      cursor: "pointer",
                                                      color: "#6c757d",
                                                    }}
                                                  >
                                                    {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                                                  </span>
                                                </div>
                                              </FormGroup>

                            {/* <FormGroup>
                                <Label for="email">Enter Password</Label>
                                <Input type="password" id="password"></Input>
                            </FormGroup> */}
                            

                            <Container className="text-center">
                             <Button outline color="light">Login</Button>
                             <Button outline color="light" onClick={resetData} className="ms-2" type="reset">Reset</Button>
                            
                                                </Container>



                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
     </Container>
      
      



     </Base>
    );
};

export default Login;


