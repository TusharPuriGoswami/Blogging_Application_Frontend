// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Font Awesome Icons
// import { toast } from "react-toastify";
// import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
// import Base from "../components/Base";
// import { signUp } from "../services/user-service";


//     const Signup=()=>{

      


//       const [data,setData]=useState({

//         name:'',
//         email:'',
//         password:'',
//         about:'',
        
       
//       })


//       const [error,setError]= useState({
//         errors:{},
//         isError:false

//       })


//       const handleChange=(event,property)=>{

//         //Dynamic settings the values
//         setData({...data,[property]:event.target.value

//         })
//       }


//       //Reseting the form
//       const resetData=()=>{
//         setData({
//           name:'',
//           email:'',
//           password:'',
//           about:'',
//         })
//       }

//       //submit the form
//       const submitForm=(event)=>{
//         event.preventDefault()

//         //handle errors in currect way

//         // if(error.IsError){
//         //   toast.error("Form Data is Invalid !! , Currect all details then submit !!")
//         //   setError({...error,isError:false})
//         //   return;
//         // }


//         console.log(data);

//         //data validate

        
        
//         //call server api for sending data

//         signUp(data)
//       .then((resp) => {
//         console.log(resp);
//         console.log("success log");
//         // toast.success("User is Registerd Sucessfully !!")
//          toast.success("User is registered successfully !! user id " + resp.id);
//         setData({
//           name: "",
//           email: "",
//           password: "",
//           about: "",
//         });
        
//       })
//       .catch((error) => {
//         console.log(error);
//         console.log("Error log");
//         //handle errors in proper way
//         setError({
//           errors: error,
//           isError: true,
//         });
//         //toast.error("Something went wrong! Please try again.");

//       });
//   };




//       //   signUp(data).then((resp)=>{
//       //     console.log(resp);
//       //     console.log("success log");
//       //   }).catch((error)=>{
//       //     console.log(error)
//       //     console.log("Error log");
//       //   })
//       // };

//       const [passwordType, setPasswordType] = useState("password"); // State for password type

//       const togglePassword = () => {
//         setPasswordType(passwordType === "password" ? "text" : "password");
//       };



//         return(
//           <Base>
          
//           <Container>

//             <Row className="mt-4">

//               {/* {JSON.stringify(data)} */}


//               <Col sm={{size:6,offset:3}}>

//               <Card color="dark" inverse> 
//               <CardHeader>
//                 <h3>Fill Information to Register !!</h3>
//               </CardHeader>

//               <CardBody>
//                 {/* creating form*/}

//                 <Form onSubmit={submitForm}>
//                   {/* name field*/}

//                   <FormGroup>
//                     <Label for="name">Enter Name</Label>
//                     <Input
//                     type="text"
//                     placeholder="Enter here" 
//                     id="name"
//                     onChange={(e)=>handleChange(e,'name')}
//                     value={data.name}
//                     invalid={ !!error.errors?.response?.data?.name ? true: false }
//                     />

//                   <FormFeedback>
//                     {
//                       error.errors?.response?.data?.name
//                     }
//                   </FormFeedback>



//                   </FormGroup>

                 

//                   {/* Email field */}

//                   <FormGroup>
//                     <Label for="email">Enter Email</Label>
//                     <Input
//                     type="email"
//                     placeholder="Enter here" 
//                     id="email"
//                     onChange={(e)=>handleChange(e,'email')}
//                     value={data.email}
//                     invalid={ !!error.errors?.response?.data?.email ? true: false }

//                     />

//                   <FormFeedback>
//                     {
//                       error.errors?.response?.data?.email
//                     }
//                   </FormFeedback>
//                     </FormGroup>

                    

//                   {/* Password field with show/hide icon */}
//                   <FormGroup>
//                     <Label for="password">Enter Password</Label>
//                     <div style={{ position: "relative" }}>
//                       <Input
//                         type={passwordType}
//                         placeholder="Enter here"
//                         id="password"
//                         onChange={(e)=>handleChange(e,'password')}
//                         invalid={ !!error.errors?.response?.data?.password ? true: false }
//                         value={data.password}
//                         style={{ paddingRight: "40px" }} // Add space for icon
//                       />
//                       <FormFeedback>
//                     {
//                       error.errors?.response?.data?.password
//                     }
//                   </FormFeedback>
//                       <span
//                         onClick={togglePassword}
//                         style={{
//                           position: "absolute",
//                           right: "30px",
//                           top: "28%",
//                           transform: "translateY(-50%)",
//                           cursor: "pointer",
//                           color: "#6c757d",
//                         }}
//                       >
//                         {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
//                       </span>
//                     </div>
//                   </FormGroup>


//                     {/* about field */}

//                     <FormGroup>
//                     <Label for="about">About</Label>
//                     <Input
//                     type="textarea"
//                     placeholder="Enter here" 
//                     id="about"
//                     onChange={(e)=>handleChange(e,'about')}
//                     value={data.about}
//                     style={{height:"150px"}}
//                     invalid={ !!error.errors?.response?.data?.about ? true: false }

//                     />

// <FormFeedback>
//                     {
//                       error.errors?.response?.data?.about
//                     }
//                   </FormFeedback>
//                     </FormGroup>

//                     <Container className="text-center">
//                       <Button outline color="light">Register</Button>
//                       <Button outline onClick={resetData} color="light" className="ms-2" type="reset">Reset</Button>

//                     </Container>






//                 </Form>



//               </CardBody>
//             </Card>

//               </Col>


//             </Row>
            


//           </Container>
          
//           </Base>
//         );
//     };

//     export default Signup;

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Font Awesome Icons
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/user-service";

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigate

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("User is registered successfully !! user id " + resp.id);
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });

        // Redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Fill Information to Register !!</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={!!error.errors?.response?.data?.name}
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={!!error.errors?.response?.data?.email}
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <div style={{ position: "relative" }}>
                      <Input
                        type={passwordType}
                        placeholder="Enter here"
                        id="password"
                        onChange={(e) => handleChange(e, "password")}
                        invalid={!!error.errors?.response?.data?.password}
                        value={data.password}
                        style={{ paddingRight: "40px" }}
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.password}
                      </FormFeedback>
                      <span
                        onClick={togglePassword}
                        style={{
                          position: "absolute",
                          right: "30px",
                          top: "28%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#6c757d",
                        }}
                      >
                        {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter here"
                      id="about"
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      style={{ height: "150px" }}
                      invalid={!!error.errors?.response?.data?.about}
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="light">Register</Button>
                    <Button
                      outline
                      onClick={resetData}
                      color="light"
                      className="ms-2"
                      type="reset"
                    >
                      Reset
                    </Button>
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

export default Signup;

