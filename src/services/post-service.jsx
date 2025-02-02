import axios from "axios";
import { myAxios, privateAxios } from "./helper";

// Function to create a post
export const createPost = (postData) => {
    return privateAxios
        .post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error creating post:", error);
            throw error;
        });
};

//get all posts
//get all posts
export const loadAllPosts = (pageNumber, pageSize) => {
    return myAxios
        .get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=postId&sortDir=desc`) // Change sortBy to 'postId' and sortDir to desired order
        .then((response) => response.data);
};

// export const loadAllPosts = (pageNumber,pageSize) => {
//     return myAxios
//     .get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
//     .then(response=>response.data)
// }

//load post from given Id
export const loadPost=(postId)=>{
    return myAxios.get("/posts/" + postId).then((response) => response.data);
}

export const createComment=(comment,postId)=>{
    return privateAxios.post(`/post/${postId}/comment`,comment)
}

//upload post Image

export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios
      .post(`/post/image/upload/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  };

  // Get Category-wise posts
  
  export function loadPostCategoryWise(categoryId) {
    return axios
        .get(`https://bloggingapp.up.railway.app/api/category/${categoryId}/posts`)
        .then((response) => {
            console.log("Full API Response:", response.data); // ✅ Debug ke liye
            return response.data; // ✅ Ensure correct response
        })
        .catch((error) => {
            console.error("Error fetching posts:", error.response?.data || error.message);
            throw error;
        });
}

// export function loadPostUserWise(userId) {
//     return privateAxios.get(`/user/${userId}/posts`).then((res) => res.data);
//   }


export function loadPostUserWise(userId) {
    return axios
        .get(`https://bloggingapp.up.railway.app/api/user/${userId}/posts`)
        .then((response) => {
            console.log("Full API Response:", response.data);

            // Extract posts from 'content' key
            if (response.data && Array.isArray(response.data.content)) {
                return response.data.content; 
            } else {
                console.error("Unexpected API Response Format:", response.data);
                return [];
            }
        })
        .catch((error) => {
            console.error("Error fetching posts:", error.response?.data || error.message);
            return [];
        });
}

//delete post
export function deletePostService(postId) {
    return privateAxios.delete(`/posts/${postId}`).then(res => res.data);
}

//update post 
export function updatePost(post, postId) {
    console.log("Updating Post:", post);
    
    return privateAxios.put(`posts/${postId}`, post)
        .then((resp) => {
            console.log("Update Success:", resp.data);
            return resp.data;
        })
        .catch((error) => {
            console.error("Error updating post:", error);
            throw error;  // Ensures UI properly handles errors
        });
}

// export function updatePost(post, postId){
//     console.log(post);
    
//     return privateAxios.put(`.posts/${postId}`,post).then((resp) => resp.data);
// }


    // export function loadPostUserWise(userId) {
    //     return axios
    //         .get(`http://localhost:9090/api/user/${userId}/posts`)
    //         .then((response) => {
    //             console.log("Full API Response:", response); // ✅ Debugging API response
    //             if (Array.isArray(response.data)) {
    //                 return response.data;  // Ensure the response is an array
    //             } else {
    //                 console.error("API returned invalid format:", response.data);
    //                 return [];  // Return an empty array if the format is not valid
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching posts:", error.response?.data || error.message);
    //             throw error;
    //         });
    // }




  