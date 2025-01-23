import { myAxios, privateAxios } from "./helper";

// Function to create a post
export const createPost = (postData) => {
    return privateAxios
        .post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
        .then((response) => response.data)
        .catch((error) => {
            //console.error("Error creating post:", error);
            throw error;
        });
};

//get all posts
export const loadAllPosts = (pageNumber,pageSize) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response=>response.data)
}

