import React, { useEffect } from "react";
import PostCard from "./PostCard";
import {
  Paper,
  Typography,
  CircularProgress,
  Link,
  Divider,
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import useStyles from "./styles";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  const recommendedPosts = posts.filter((post1) => post1._id != id);

  if (!post) return <h6>no posts found</h6>;
  const openPost = (_id) => {
    history.push(`/posts/${post._id}`);
  };

  // console.log(post);
  if (isLoading) {
    return (
      <paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </paper>
    );
  }
  return (
    <>
      <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">
              {post.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.message}
            </Typography>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <CommentSection post={post} />
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={post.selectedFiles}
              alt={post.title}
            />
          </div>
        </div>
      </Paper>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also Like:
          </Typography>
          <Divider />
          <Grid container className={classes.mainContainer} alignItems="center" spacing={3}>
            
              {recommendedPosts?.map((post, index) => (
                <Grid key={index} item >
                  <PostCard post={post} />
                </Grid>
              ))}
        
          </Grid>
        </div>
      )}
    </>
  );
};

export default PostDetails;
