import * as api from '../api';

//  Actions Creators 
export const getPosts = () => async (dispatch )=>{
    try{
    //  action is asncronous data for which actually some time needs to be passed
    // so we will use redux thunk , which allows us to specify additional asyncronus function
    const { data } = await api.fetchPosts();
    console.log( data);
         dispatch( {type:'FETCH_ALL', payload : data});
    } catch(err){
        console.log(err);
    }

}
export const getPostsBySearch = (searchQuery) => async (dispatch )=>{
    try{

    const { data:{data} } = await api.fetchPostsBySearch(searchQuery);
    console.log( data);
         dispatch( {type:'FETCH_BY_SEARCH', payload : data});
    } catch(err){
        console.log(err);
    }

}

export const createPost = ( post ) => async ( dispatch ) => {
    try {
      const { data } = await api.createPost(post);
      console.log( data);
  
      dispatch({ type: 'CREATE', payload: data });
  
      // history.push(`/posts/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  export const updatePost= (id, post)=>async (dispatch) =>{
    try{
     

        const {data } = await api.updatePost(id, post);

        dispatch({type:'UPDATE', payload : data});

    } catch(err){
      console.log( err);
    }
  }
  export const deletePost= (id, post)=>async (dispatch) =>{
    try{
      await api.deletePost(id);
      
      dispatch({type:'DELETE', payload : id});
      
    } catch(err){
      console.log( err);
    }
  }
  export const likePost= (id)=>async (dispatch) =>{
    try{
        const {data } = await api.likePost(id);

        dispatch({type:'LIKE_POST', payload : data});

    } catch(err){
      console.log( err);
    }
  }