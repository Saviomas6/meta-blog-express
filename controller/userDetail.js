import jwt from "jsonwebtoken";
import { UserSignUp } from "../model/login.js";

const SECRET_KEY = "META_EXPRESS_PROJECT";

export const userDetail = async (req, res) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const jwtToken = token.split(" ")[1];

  jwt.verify(jwtToken, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await UserSignUp.findOne(
      { email: decoded.email },
      { __v: 0, password: 0, confirmPassword: 0 }
    );

    return res.json(user);
  });
};
