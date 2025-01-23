import CustomNavbar from "./CustomNavbar";

const Base=({title="Welcome to our Website",children})=>{
    return (
        <div classname="container-fluid p-0 m-0">
            
            <CustomNavbar />


            { children }
          
        </div>

    );
};

export default Base;