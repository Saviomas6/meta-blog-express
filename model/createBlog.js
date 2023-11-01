import mongoose from "mongoose";

const createBlogSchema = new mongoose.Schema({
  blogImage: {
    type: String,
    required: true,
  },
  blogHeading: {
    type: String,
    required: true,
  },

  blogDescription: {
    type: String,
    required: true,
  },
  blogCategory: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserLogin",
    required: true,
  },
});

export const CreateBlog = mongoose.model("CreateBlog", createBlogSchema);
