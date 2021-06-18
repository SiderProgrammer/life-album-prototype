import jwt from "jsonwebtoken";

import authConfig from "../config/auth.config.js";

export default (req, res, next) => {
  const token = req.cookies.token || "";

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    jwt.verify(token, authConfig.secret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.userId = user.id;
      req.nickname = user.nickname;

      next();
    });
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
