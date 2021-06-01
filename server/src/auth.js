import jwt from "jsonwebtoken";

import authConfig from "./auth.config.js";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    jwt.verify(token, authConfig.secret, (err, user) => {
      console.log(err);

      if (err) return res.sendStatus(403);
      req.user = user;

      next();
    });
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
