import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./src/models/index.js";
import jwt from "jsonwebtoken";
import config from "./src/auth.config.js";
import authMiddleware from "./src/auth.js";
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

const { userModel, postModel, likesModel, commentsModel } = db;

app.post("/register", (req, res) => {
  const { nickname, email, password } = req.body;
  const user = {
    nickname,
    email,
    password,
  };

  userModel
    .create(user)
    .then((data) => {
      res.send(data);
      const post = {
        user_id: data.dataValues.id,
        description: "Test description",
        image_path:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      };

      postModel.create(post).then((data) => {
        likesModel.create({
          post_id: data.dataValues.id,
          nickname: "brabra",
        });

        commentsModel.create({
          post_id: data.dataValues.id,
          nickname: "brabra",
          text: "sample comment",
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({ where: { email, password } }).then((user) => {
    console.log(user.nickname);
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
  likesModel.create({
    post_id,
    nickname,
  });
});

app.post("/post-comment", (req, res) => {
  const { nickname } = req;
  const { post_id, text } = req.body;
  console.log("commenting a post!");
  commentsModel.create({
    post_id,
    nickname,
    text,
  });
});

app.get("/profile", (req, res) => {
  userModel
    .findByPk(req.userId, { include: ["posts"] })
    .then((user) => res.send(user));
});
app.get("/user/:id", (req, res) => console.log(req.params.id));

app.listen(3001, () => console.log("server is running!"));
