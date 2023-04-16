import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json(err);
  }
};

// params /posts/123 -> :id =123
// Query -> /posts?page= 1->page =1
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i"); // Test TEST test
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({data :posts}) ;
  } catch (err) {
    res.status(404).json(err);
  }
};
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    console.log("done");
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ error });
  }

  // res.send('Post created');
};
// /posts/params

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Post with given path exists");

    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { ...post, id },
      { new: true }
    );
    if (updatedPost) res.status(200).json(updatedPost);
    else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "unauthantidted user" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with given path exists");

  // search for post in which we want to increase like

  try {
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === req.userId);

    if (index === -1) {
      // like the post
      // console.log(post.likes);
      post.likes.push(req.userId);
    } else {
      // dislike the post
      // console.log(post.likes);
      post.likes = post.likes.filter((id) => id != req.userId);
      // console.log(post.likes);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Post with given path exists");
    await PostMessage.findByIdAndRemove(id);

    res.status(200).send("deleted _successfully");
  } catch (error) {
    console.log(error);
  }
};
