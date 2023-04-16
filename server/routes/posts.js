import express from 'express';

import { getPosts,getPostsBySearch, createPost, updatePost,deletePost , likePost} from '../controllers/posts.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
const router = express.Router();


router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/',isAuthenticatedUser , createPost);
router.patch('/:id',isAuthenticatedUser ,updatePost);
router.delete('/:id',isAuthenticatedUser ,deletePost);
router.patch('/:id/likePost',isAuthenticatedUser ,likePost);

export default router;