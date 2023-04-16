import React from 'react';
import { useSelector } from 'react-redux'
import { Grid , CircularProgress } from '@material-ui/core';

import Post from './Post/Post.js';
import useStyles from "./styles";

const Posts = ({ setCurrId })=>{
    const classes = useStyles();
    const posts = useSelector((state) =>state.posts)
    // console.log(posts);
    return (
        // loading spinner.
        !posts.length?<CircularProgress/>:(
            <Grid className= { classes.container} container alignItems='stretch' spacing = {3}>
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