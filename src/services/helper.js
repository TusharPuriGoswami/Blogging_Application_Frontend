import axios from "axios";
import { getToken } from "../auth";

//export const BASE_URL = "http://localhost:9090/api";
export const BASE_URL = "https://bloggingapp.up.railway.app/api/";

// Axios instance for public requests
export const myAxios = axios.create({
    baseURL: BASE_URL,
});

// Axios instance for private requests (with token)
export const privateAxios = axios.create({
    baseURL: BASE_URL,
});

// Add an interceptor to include the Authorization token
privateAxios.interceptors.request.use(
    (config) => {
        const token = getToken(); // Get the token from localStorage
        //console.log("Token:", token);

        if (token) {
            config.headers = config.headers || {}; // Ensure headers object exists
            config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
        }

        return config; // Return the modified config
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);



// import axios from "axios";
// import { getToken } from "../auth";

// export const BASE_URL='http://localhost:9090/api';

// export const myAxios=axios.create({
//     baseURL:BASE_URL,
// });

// export const privateAxios=axios.create({
//     baseURL:BASE_URL,
// });


//  privateAxios.interceptors.request.use(config=>{

//   const token = getToken()
//   console.log(token)
//   if(token){
//     config.headers.common.Authorization=`Bearer ${token}`
// return config
//   }
// }, error=>Promise.reject(error))
 




// // privateAxios.interceptors.request.use(config=>{

// //     const token = getToken();
    
// //     console.log(token)
// //     // if(token){
// //     //     config.headers.common.Authorization = `Bearer ${token}`;
// //     //     console.log(config)
       
// //     // }
// //     if (token) {
// //         config.headers = config.headers || {};
// //         config.headers.Authorization = `Bearer ${token}`;
// //         console.log(config);
// //     }
// //     return config;

// // },
// // (error) => Promise.reject(error)
// // );
