import express from "express";
export const userRouter = express.Router();
import { userSignIn, userSignUp } from "../controller/login.js";

//userSignIn
userRouter.post("/signin", userSignIn);

//userSignUp
userRouter.post("/signup", userSignUp);
