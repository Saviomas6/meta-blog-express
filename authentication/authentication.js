import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  const SECRET_KEY = "META_EXPRESS_PROJECT";
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const jwtToken = token.split(" ")[1];
  // Verify the token
  jwt.verify(jwtToken, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // Token is valid, store the decoded token in the request object
    req.user = decodedToken;
    next();
  });
};
