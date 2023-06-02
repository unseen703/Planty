import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { TextField, Typography, Button, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";

const Form = ({ currId, setCurrId }) => {

  const post = useSelector((state) => 
    currId ? state.posts.posts.find((p) => p._id === currId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({
    name: "",
    title: "",
    message: "",
    tags: [],
    selectedFiles: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currId) {
 
      dispatch(updatePost(currId, { ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
      
      
    }
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          plese Sign in to Create Your own posts
        </Typography>
      </Paper>
    );
  }
  const clear = () => {
    {
      setCurrId(null);
      setPostData({
        title: "",
        message: "",
        tags: [],
        selectedFiles: "",
      });
    }
  };

  return (
    // <Typography varaint = "h1" > form </Typography>
    <Paper className={classes.paper} elevation={6}>
      <Typography variant="h6">
        {" "}
        {currId ? "Editing" : "Creating"} a Memory
      </Typography>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        method={`post`}
        // onSubmit=
      >
        <TextField
          name="title"
          // varient="outlined"
          variant="outlined"
          label="Title"
          fullwidth="true"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullwidth="true"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullwidth="true"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          {" "}
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFiles: base64 })
            }
          />{" "}
          Choose File{" "}
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="reset"
          size="small"
          onClick={clear}
          fullwidth="true"
        >
          Clear
        </Button>
      </form>
    </Paper>
    // {/* <h1>Form</h1>  */}
  );
};

export default Form;
