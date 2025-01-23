import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Correctly import 'Outlet'
import { IsLoggedIn } from '../auth';

const Privateroute = () => {


    return IsLoggedIn() ? <Outlet /> : <Navigate to={"/login"}/>
    
    // if(IsLoggedIn()){
    //     return <Outlet/>
    // }
    // else{
    //     return <Navigate to={"/login"} />;
    // }
  
};

export default Privateroute;
