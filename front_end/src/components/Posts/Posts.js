import React from 'react';
import { useSelector} from 'react-redux'
import { Grid , CircularProgress } from '@material-ui/core';

import Post from './Post/Post.js';
import useStyles from "./styles";


const Posts = ({ setCurrId })=>{
    const classes = useStyles();
    const { posts, isLoading} = useSelector((state) =>state.posts); //=> { isloading, page, posts:[]}

if(!posts.length && !isLoading) return 'No posts';

    return (
        // loading spinner.
        isLoading?<CircularProgress/>:(
            <Grid className= { classes.maincontainer} container alignItems='stretch' spacing = {3}>
               {posts.map((post, index)=>(
                <Grid key={index} item  xs={12} sm= {12} md = {6} lg= {3}>
                    <Post   post = {post}  setCurrId = {setCurrId} />
                </Grid>
            ))}


            </Grid>
        )
    );
}
export default Posts;