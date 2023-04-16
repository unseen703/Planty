import React, { useState } from "react";

import moment from "moment";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const classes = useStyles();
  const dispatch = useDispatch();

  let userId  = user?.result?.sub || user?.result?._id;
  
  // if(user.token.length >500){
  //   userId =user?.result.sub;
  // }
  // else{
    
  //   userId = user?.result?.id;
  // }
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {

    dispatch(likePost(post._id));
    // console.log(post._id);
    console.log(post.likes);
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };
  // String(req.userId)
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFiles}
        alt={post.title}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6"> {post.name} </Typography>
        <Typography variant="body2">
          {" "}
          {moment(post.createdAt).fromNow()}{" "}
        </Typography>
        {/* <Typography variant='h6' >        {post.creator}          </Typography>  */}
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.sub === post?.creator ||
          user?.result?.id === post?._id) && (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} variant="h5" gutterBottom>
        {" "}
        {post.title}
        {/* {user.result.googleId} */}

      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {" "}
          {post.message}{" "}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator ||
          user?.result?.id === post?.creator) && (

          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
          {/* {user?.result?.sub} */}
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
