import express from "express";
export const userRouter = express.Router();
import { userSignIn, userSignUp } from "../controller/login.js";

userRouter.get("/", (req, res) => {
  res.send("Hello Express");
});

//userSignIn
userRouter.post("/signin", userSignIn);

//userSignUp
userRouter.post("/signup", userSignUp);
