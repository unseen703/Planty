import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'

// if user wants to like the post
// cliclk the like button => authmiddleware (next)=> like controller
export const isAuthenticatedUser = async (req, res, next) => {

  try {
 
    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = (token.length < 500);

    let decodedData;

    if ( token && isCustomAuth) {
        
      decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;

    }
    next();
  } catch (err) {
    console.log(err);
  }
};
