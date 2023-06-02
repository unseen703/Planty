import * as api from '../api/index.js';
import { CREATE, DELETE,LIKE, FETCH_ALL,FETCH_BY_SEARCH,FETCH_POST,UPDATE, START_LOADING,END_LOADING, COMMENT } from "../constants/actionTypes";

//  Actions Creators 
export const getPost = (id) => async (dispatch )=>{
  // console.log("reached endpoint");
  try{
    dispatch( {type:START_LOADING});
    const  {data}  = await api.fetchPost(id);
    // console.log(data);
  //  action is asncronous data for which actually some time needs to be passed
  dispatch( {type:FETCH_POST, payload : data});
  // so we will use redux thunk , which allows us to specify additional asyncronus function
  
  dispatch( {type:END_LOADING});
  } catch(err){
      console.log(err);
  }

}
export const getPosts = (page) => async (dispatch )=>{
    try{
    //  action is asncronous data for which actually some time needs to be passed
    // so we will use redux thunk , which allows us to specify additional asyncronus function
    
    dispatch( {type:START_LOADING});
    const post = await api.fetchPosts(page);
    // console.log(post);
    const data = post.data;
    dispatch( {type:FETCH_ALL, payload : data});
    dispatch( {type:END_LOADING});
    } catch(err){
        console.log(err);
    }

}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const post = await api.fetchPostsBySearch(searchQuery);
      
        const data = post.data.data;
        // console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload:  {data}  });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = ( post ,history) => async ( dispatch ) => {
    try {
    dispatch( {type:START_LOADING});

      const { data } = await api.createPost(post);

      history.push(`/posts/${data._id}`);
      
      dispatch({ type: CREATE, payload: data });
      // dispatch(getPosts);

      dispatch( {type:END_LOADING});
  
    
    } catch (error) {
      console.log(error);
    }
  };

  export const updatePost= (id, post)=>async (dispatch) =>{
    try{
    // dispatch( {type:START_LOADING});
     

        const {data } = await api.updatePost(id, post);

        dispatch({type:UPDATE, payload : data});
        // dispatch(getPosts);

        // dispatch( {type:END_LOADING});

    } catch(err){
      console.log( err);
    }
  }
  export const deletePost= (id)=>async (dispatch) =>{
    try{
    dispatch( {type:START_LOADING});
      await api.deletePost(id);

      dispatch({type:DELETE, payload : id});

    dispatch( {type:END_LOADING});
      
    } catch(err){
      console.log( err);
    }
  }
  export const likePost= (id)=>async (dispatch) =>{
    try{
    // dispatch( {type:START_LOADING});

        const {data } = await api.likePost(id);
// console.log(id);
        dispatch({type:LIKE, payload : data});
       
        // dispatch( {type:END_LOADING});

    } catch(err){
      console.log( err);
    }
  }

  export const commentPost = (comment, id)=> async (dispatch) =>{
    try {
      const {data} = await api.addComment(comment, id);
      console.log(data);
      dispatch({type:COMMENT, payload : data});
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  }