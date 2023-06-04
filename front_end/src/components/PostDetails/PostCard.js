import React, { useState } from "react";

import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  ButtonBase,
  Grid,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import useStyles from "./styles";

const PostCard = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();

  const history = useHistory();

  let userId = user?.result?.sub || user?.result?._id;

  const gotoPost = () => {
    history.push(`/posts/${post._id}`);
  };
  return (
    <Card className={classes.rcard} raised elevation={6}>
      <ButtonBase className={classes.rcardAction} onClick={gotoPost}>
        <CardMedia
          className={classes.rmedia}
          image={post.selectedFiles}
          alt={post.title}
          title={post.title}
        />
      </ButtonBase>

      <div className={classes.roverlay}>
        <Typography variant="h6"> {post.name} </Typography>
      </div>

      <div className={classes.rdetails}>
        <Typography variant="subtitle2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">
          {" "}
          {post.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
