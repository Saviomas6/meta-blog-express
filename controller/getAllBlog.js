import { CreateBlog } from "../model/createBlog.js";

export const getAllBlog = async (req, res) => {
  try {
    const allBlog = await CreateBlog.find({}, { __v: 0 }).populate({
      path: "user",
      select: "-password -confirmPassword -__v",
    });
    res.send(allBlog);
  } catch (e) {
    console.log(e);
  }
};
