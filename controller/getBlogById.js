import { CreateBlog } from "../model/createBlog.js";

export const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await CreateBlog.find({ _id: id }, { __v: 0 }).populate({
      path: "user",
      select: "-password -confirmPassword -__v",
    });
    res.send(result);
  } catch (e) {
    console.log(e);
  }
};
