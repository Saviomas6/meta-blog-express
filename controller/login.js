import { UserSignUp } from "../model/login.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "META_EXPRESS_PROJECT";

export const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await UserSignUp.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        email: existUser.email,
        id: existUser._id,
        name: existUser.name,
      },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({ user: existUser, token, message: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userSignUp = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    confirmPassword,
    bio,
    profileUrl,
    bannerUrl,
    joinedDate,
  } = req.body;
  try {
    const existUser = await UserSignUp.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const confirmHashPassword = await bcrypt.hash(confirmPassword, 10);

    const result = new UserSignUp({
      name,
      username,
      email,
      password: hashPassword,
      confirmPassword: confirmHashPassword,
      bio,
      profileUrl,
      bannerUrl,
      joinedDate,
    });
    result
      .save()
      .then(() => res.status(201).send({ user: result, message: true }))
      .catch((e) => res.status(400).send(e));
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};
