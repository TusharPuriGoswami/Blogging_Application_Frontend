// import React, { useContext, useEffect, useState } from 'react';
// import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
// import {
//     Collapse,
//     DropdownItem,
//     DropdownMenu,
//     DropdownToggle,
//     Nav,
//     Navbar,
//     NavbarBrand,
//     NavbarToggler,
//     NavItem,
//     NavLink,
//     UncontrolledDropdown
// } from 'reactstrap';
// import { DoLogout, getCurrentUserDetail, IsLoggedIn } from '../auth';
// import userContext from '../context/userContext';

// const CustomNavbar = () => {

//     const userContextData=useContext(userContext)
//     let navigate = useNavigate()
//     // State to manage the toggling of the Navbar
//     // const [isOpen, setIsOpen] = useState(false);

//      // Function to toggle the Navbar
//     // const toggle = () => setIsOpen(!isOpen);

//    const [isOpen,setIsOpen]=useState(false)


//    const [login,setLogin]=useState(false)
//    const [user,setUser]=useState(undefined)

//    useEffect(()=>{

//     setLogin(IsLoggedIn())
//     setUser(getCurrentUserDetail())
//    } , [login])

//    const logout = () => {
//     DoLogout(() => {
//         //logged out
//         setLogin(false)
//         userContextData.setUser({
//             data: null,
//             login: false
//         })

//         navigate("/")
//     })
//    }

//     return (
//         <div>
//             <Navbar 
//             color="dark"
//              dark expand="md"
//              className='px-5'
//              >
//                 <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
//                 <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>
//                 <Collapse isOpen={isOpen} navbar>

                
//                     <Nav className="me-auto" navbar>

//                     <NavItem>
//                             <NavLink tag={ReactLink} to="/"> New Feed</NavLink>
//                         </NavItem>
//                         <NavItem>
//                             <NavLink tag={ReactLink} to="/about"> About</NavLink>
//                         </NavItem>
//                         <NavItem>
//                             <NavLink tag={ReactLink} to="/services"> Services</NavLink>
//                         </NavItem>
                        




//                         <UncontrolledDropdown nav inNavbar>
//                             <DropdownToggle nav caret>
//                                 Options
//                             </DropdownToggle>
//                             <DropdownMenu right>
//                                 <DropdownItem tag={ReactLink} to="/services">Contact Us</DropdownItem>
//                                 <DropdownItem>Facebook</DropdownItem>
//                                 <DropdownItem divider />
//                                 <DropdownItem>Youtube</DropdownItem>
//                                 <DropdownItem>Instagram</DropdownItem>
//                                 <DropdownItem>LinkdIn</DropdownItem>
//                             </DropdownMenu>
//                         </UncontrolledDropdown>
//                     </Nav>

//                     <Nav navbar>


//                         {
//                             login && (

//                                 <>

//                                     <NavItem>
//                                         <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`} >
//                                             Profile Info
//                                         </NavLink>
//                                     </NavItem>



                                

//                                 <NavItem>
//                                     <NavLink tag={ReactLink} to="/user/dashboard">{user.name}</NavLink>
//                                 </NavItem>

//                                 <NavItem>
//                                     <NavLink onClick={logout}>Logout</NavLink>
//                                 </NavItem>
                                
                                
//                                 </>
                                

                           
//                             )
//                         }



//                     {
//                         !login && (
//                             <>
                            
//                             <NavItem>
//                             <NavLink tag={ReactLink} to="/login">
//                                 Login
//                             </NavLink>
//                         </NavItem>

//                         <NavItem>
//                             <NavLink tag={ReactLink} to="/signup">Signup</NavLink>
//                         </NavItem>
//                         <NavItem></NavItem>
                            
//                             </>
//                         )
//                     }


//                     </Nav>




                    
                    
//                 </Collapse>
//             </Navbar>
//         </div>
//     );
// };

// export default CustomNavbar;


import React, { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';
import { DoLogout, getCurrentUserDetail, IsLoggedIn } from '../auth';
import userContext from '../context/userContext';

const CustomNavbar = () => {
    const userContextData = useContext(userContext);
    let navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        setLogin(IsLoggedIn());
        setUser(getCurrentUserDetail());
    }, []);

    const logout = () => {
        DoLogout(() => {
            setLogin(false);
            userContextData.setUser({ data: null, login: false });
            navigate("/");
        });
    };

    return (
        <div>
            <Navbar color="dark" dark expand="md" className='px-5'>
                <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem><NavLink tag={ReactLink} to="/">New Feed</NavLink></NavItem>
                        <NavItem><NavLink tag={ReactLink} to="/about">About</NavLink></NavItem>
                        <NavItem><NavLink tag={ReactLink} to="/services">Services</NavLink></NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>Options</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={ReactLink} to="/services">Contact Us</DropdownItem>
                                <DropdownItem>Facebook</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Youtube</DropdownItem>
                                <DropdownItem>Instagram</DropdownItem>
                                <DropdownItem>LinkedIn</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav navbar>
                        {login && user && (
                            <>
                                <NavItem>
                                    <NavLink tag={ReactLink} to={`/user/profile-info/${user.id || ''}`}>
                                        Profile Info
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={ReactLink} to="/user/dashboard">{user.name}</NavLink>
                                </NavItem>
                                <NavItem><NavLink onClick={logout}>Logout</NavLink></NavItem>
                            </>
                        )}
                        {!login && (
                            <>
                                <NavItem><NavLink tag={ReactLink} to="/login">Login</NavLink></NavItem>
                                <NavItem><NavLink tag={ReactLink} to="/signup">Signup</NavLink></NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default CustomNavbar;

