import express from "express";
export const userRouter = express.Router();
import { userSignIn, userSignUp } from "../controller/login.js";
import { userDetail } from "../controller/userDetail.js";
import { createBlog } from "../controller/createBlog.js";
import { getAllBlog } from "../controller/getAllBlog.js";
import { getBlogById } from "../controller/getBlogById.js";

userRouter.get("/", (req, res) => {
  res.send("Hello Express");
});

//userSignIn
userRouter.post("/signin", userSignIn);

//userSignUp
userRouter.post("/signup", userSignUp);

//userDetail
userRouter.get("/userDetail", userDetail);

//createBlog
userRouter.post("/createBlog", createBlog);

//getAllBlog
userRouter.get("/getAllBlog", getAllBlog);

//getBlogById
userRouter.get("/getBlogById/:id", getBlogById);
