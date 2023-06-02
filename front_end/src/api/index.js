import axios from 'axios';


// const API = axios.create({ baseURL: 'http://localhost:5000/' });
const API = axios.create({ baseURL: 'https://planty-wsml.onrender.com/' });

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization= `Bearer ${JSON.parse( localStorage.getItem('profile')).token}`;
        
    }
 
    return req;
});
export const fetchPost = (Id)=>API.get(`/posts/${Id}`); 

export const fetchPosts = (page)=> API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const  createPost = (newPost)=> API.post('/posts', newPost);

export const updatePost = (Id, updatedPost) => API.patch( `/posts/${Id}`, updatedPost)

export const deletePost = (Id) => API.delete( `/posts/${Id}`)

export const likePost = (Id) => API.patch( `/posts/${Id}/likePost`)
export const addComment = (comment,Id) => API.post( `/posts/${Id}/commentPost`, {comment})

export const signUp = (formData) => API.post( `/users/signup`, formData)
export const signIn = (formData) => API.post( `/users/signin`, formData)
