import { CreateBlog } from "../model/createBlog.js";
import { authenticateToken } from "../authentication/authentication.js";
import { UserSignUp } from "../model/login.js";

export const createBlog = async (req, res) => {
  const { blogImage, blogHeading, blogDescription, blogCategory } = req.body;

  authenticateToken(req, res, async () => {
    try {
      const user = await UserSignUp.findOne(
        { email: res.req.user.email },
        { __v: 0, password: 0, confirmPassword: 0 }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user) {
        const data = {
          blogImage,
          blogHeading,
          blogDescription,
          blogCategory,
          user,
        };
        const result = new CreateBlog(data);
        result
          .save()
          .then(() => res.status(201).send({ user: result, message: true }))
          .catch((e) => res.status(400).send(e));
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};
