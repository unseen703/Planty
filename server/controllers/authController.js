import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwtToken.js";
// import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    //    if user doesn't exists
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);

    //  if credetntials are invalid
    if (!passwordCheck)
      return res.status(400).json({ message: "Invalid credentials." });
    // generate jwt token for signing user
    const token = generateToken(user);
    console.log(token);

    res.status(200).json({ result: user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, confirmPassword, email, password } = req.body;
 

  try {
    const oldUser = await userModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword) {
      return res.status(404).json({ message: "Password doesn't matchs" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = generateToken(result);

    if (!token) res.status(500).json({ message: "token not generated" });
    // console.log(token);

    res.status(201).json({ result, token });

  } catch (error) {

    res.status(500).json({ message: "Something went wrong" });

    // console.log(error);
  }
};
