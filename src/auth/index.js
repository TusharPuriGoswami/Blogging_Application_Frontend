// Check if user is logged in
export const IsLoggedIn = () => {
    let data = localStorage.getItem("data");
    return data != null;
};

// Save login data to localStorage
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
};

// Remove login data from localStorage
export const DoLogout = (next) => {
    localStorage.removeItem("data");
    next();
};

// Get current user details
export const getCurrentUserDetail = () => {
    if (IsLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).user;
    }
    return undefined;
};

// Get the JWT token from localStorage
export const getToken = () => {
    if (IsLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).token;
    }
    return null;
};




// //   Authentication     IsLoggenIn=>

//     export const IsLoggedIn=()=>{
//         let data=localStorage.getItem("data");
//         if(data != null)
//             return true;
//         else
//             return false;
        
//     };


// //DoLogin=> Data => set to local storage

// export const doLogin=(data,next)=>{
//     localStorage.setItem("data" , JSON.stringify(data));
//     next()
// }

// //DoLogut => remove from localStorage 

// export const DoLogout=(next)=>{
//     localStorage.removeItem("data")
//     next()
// }

// //get current user
// export const getCurrentUserDetail=()=>{
//     if(IsLoggedIn()){
//         return JSON.parse(localStorage.getItem("data")).user;
//     }else{
//         return undefined;
//     }
// }

// export const getToken=()=>{
//     if(IsLoggedIn()){
//         return JSON.parse(localStorage.getItem("data")).token
//     }else{
//         return null;
//     }
// }