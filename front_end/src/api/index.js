import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });
// const url = 'http://localhost:5000/posts';/
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization= `Bearer ${JSON.parse( localStorage.getItem('profile')).token}`;
        
    }
    // console.log(req.headers);
    return req;
});

export const fetchPosts = ()=> API.get('/posts');

export const fetchPostsBySearch = (searchQuery)=> API.get(`/posts/search?searchQuery=${searchQuery.search ||'none'}&tags=${searchQuery.tags}`);

export const  createPost = (newPost)=> API.post('/posts', newPost);

export const updatePost = (Id, updatedPost) => API.patch( `/posts/${Id}`, updatedPost)

export const deletePost = (Id) => API.delete( `/posts/${Id}`)

export const likePost = (Id) => API.patch( `/posts/${Id}/likePost`)

export const signUp = (formData) => API.post( `/users/signup`, formData)
export const signIn = (formData) => API.post( `/users/signin`, formData)
