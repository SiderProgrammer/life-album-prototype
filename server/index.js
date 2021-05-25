import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import db from "./src/models/index.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

  userModel.findOne({ where: { email, password } }).then((c) => {
    res.json(c);
  });
});

app.get("/posts", (req, res) => {
  postModel
    .findAll({ include: [{ model: userModel, as: userModel.tableName }] })
    .then((data) => res.send(data));
});

app.listen(3001, () => console.log("server is running!"));
