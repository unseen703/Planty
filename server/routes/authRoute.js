import express from 'express';

import { signUp, signIn} from '../controllers/authController.js';
const router = express.Router();


router.post('/signin',signIn);
router.post('/signup',signUp);

export default router;