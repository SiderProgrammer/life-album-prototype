import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./src/models/index.js";
import jwt from "jsonwebtoken";
import config from "./src/config/auth.config.js";
import authMiddleware from "./src/middlewares/auth.js";
import session from "cookie-session";
import helmet from "helmet";
import hpp from "hpp";
import csurf from "csurf";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
//app.use(hpp());
const syncConfig = { force: false };
db.sequelize.sync(syncConfig);

const { userModel, postModel, likesModel, commentsModel, followModel } = db;
app.use(routes);

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({ where: { email, password } }).then((user) => {
    const token = jwt.sign(
      { id: user.id, nickname: user.nickname },
      config.secret,
      {
        expiresIn: config.expireTime, // 24 hours
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true /*,sameSite:true*/,
      maxAge: 60 * 60 * 24 * 1000,
    });
    res.status(200).json("cookie");
  });
});

app.use(authMiddleware);
//app.use(csurf)
//app.get("/check-token", (req, res) => res.json({ ok: true }));

app.get("/posts", (req, res) => {
  postModel
    .findAll({ include: ["owner", "comments", "likes"] })
    .then((data) => res.send(data));
});

app.post("/post-like", (req, res) => {
  const nickname = req.nickname;
  const { post_id } = req.body;
  console.log("liking a post!");
  likesModel
    .create({
      post_id,
      nickname,
    })
    .then((r) => res.send(r));
});

app.post("/delete-like", (req, res) => {
  const nickname = req.nickname;
  console.log(nickname);
  const { post_id } = req.body;
  likesModel
    .destroy({
      where: {
        post_id,
        nickname,
      },
    })
    .then((r) => res.send(nickname));
});

app.post("/is-post-liked", (req, res) => {
  const nickname = req.nickname;
  const post_id = req.body.post_id;
  likesModel.findOne({ where: { post_id, nickname } }).then((exists) => {
    if (exists) {
      res.send("liked");
    } else {
      res.send("notLiked");
    }
  });
});

app.post("/post-comment", (req, res) => {
  const { nickname } = req;
  const { post_id, text } = req.body;
  console.log("commenting a post!", nickname);

  commentsModel
    .create({
      post_id,
      nickname,
      text,
    })
    .then((r) => res.send(r));
});

app.post("follow-user", (req, res) => {
  // const {nickname} = req;
  // const {user_nickname} = req.body
  // followModel.create({
  // })
});

app.get("/profile", (req, res) => {
  userModel.findByPk(req.userId).then((user) => res.send(user));
  // .findByPk(req.userId, { include: ["posts"] })
});
app.post("/profile-posts", (req, res) => {
  const offset = req.body.offset;

  postModel
    .findAll({
      where: { user_id: req.userId },

      limit: 9,
      offset,
      sort: [["createdAt", "ASC"]],
    })
    .then((data) => {
      res.send(data);
    });
});
app.get("/user/:id", (req, res) => console.log(req.params.id));

app.listen(3001, () => console.log("server is running!"));
