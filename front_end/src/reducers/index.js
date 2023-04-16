import {combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
//  importing it from posts
export default combineReducers({ posts,auth});
// posts: posts, considering all values and name are same replace it with simple posts