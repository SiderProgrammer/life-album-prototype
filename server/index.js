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
db.sequelize.sync();

const { userModel, postModel } = db;

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

      postModel.create(post);
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
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.expireTime, // 24 hours
    });

    res.cookie("session_id", token, {
      httpOnly: true,
      secure: true /*,sameSite:true*/,
    });
    res.status(200).json("cookie");
  });
});

//app.use(authMiddleware);
//app.use(csurf)
app.get("check-token", (req, res) => res.json({ ok: true }));

app.get("/posts", (req, res) => {
  console.log(req.headers);
  postModel.findAll({ include: ["owner"] }).then((data) => res.send(data));
});

app.listen(3001, () => console.log("server is running!"));
