import express from 'express';

import { getPost, getPosts,getPostsBySearch, createPost, updatePost,deletePost , likePost, addComment} from '../controllers/posts.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);


router.post('/',isAuthenticatedUser , createPost);
router.patch('/:id',isAuthenticatedUser ,updatePost);
router.delete('/:id',isAuthenticatedUser ,deletePost);
router.patch('/:id/likePost',isAuthenticatedUser ,likePost);
router.post('/:id/commentPost',isAuthenticatedUser ,addComment);

export default router;