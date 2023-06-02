import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
// import { LOGOUT } from "../../front_end/src/constants/actionTypes.js";

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Post with given path exists");

    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const postPerPage = 8;
    const startIndex = (Number(page) - 1) * postPerPage; // start  of each page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 }) // newest posts first
      .limit(postPerPage) // selects first 8 posts
      .skip(startIndex); // skips posts of previous pages

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / postPerPage),
    });
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
    //
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
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
    // post.likes = [];
    if (index === -1) {
      // like the post

      post.likes.push(req.userId);
    } else {
      // dislike the post

      post.likes = post.likes.filter((id) => id != req.userId);
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
  ``;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Post with given path exists");
    await PostMessage.findByIdAndRemove(id);

    res.status(200).send("deleted _successfully");
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const post = await PostMessage.findById(id);
    post.comments.push(comment);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
