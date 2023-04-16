// const  = require("jsonwebtoken")
import jwt from 'jsonwebtoken'

const generateToken = (user) => {

    const accessToken = jwt.sign({ id:user._id, email:user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    return accessToken;
  };

  export default generateToken;