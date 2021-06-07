import dbConfig from "../db.config.js";
import Sequelize from "sequelize";
import userModel from "./user.model.js";
import postModel from "./posts.model.js";
import commentsModel from "./comments.model.js";
import likesModel from "./likes.model.js";

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,

  {
    logging: false,
    dialect: "mysql",
    host: dbConfig.HOST,
  }
);

const db = {
  Sequelize,
  sequelize,
  userModel: userModel(sequelize, Sequelize),
  postModel: postModel(sequelize, Sequelize),
  commentsModel: commentsModel(sequelize, Sequelize),
  likesModel: likesModel(sequelize, Sequelize),
};

db.userModel.hasMany(db.postModel, { as: "posts", foreignKey: "id" });
db.postModel.belongsTo(db.userModel, { as: "owner", foreignKey: "user_id" });

db.postModel.hasMany(db.commentsModel, {
  as: "comments",
  foreignKey: "post_id",
  constraints: false,
});
db.commentsModel.belongsTo(db.postModel, {
  as: "commentedPost",
  foreignKey: "post_id",
  constraints: false,
});

db.postModel.hasMany(db.likesModel, {
  as: "likes",
  foreignKey: "post_id",
  constraints: false,
});
db.likesModel.belongsTo(db.postModel, {
  as: "likedPost",
  foreignKey: "post_id",
  constraints: false,
});

// db.postModel.hasMany(db.likesModel, {
//   //  as: "likes",
//   foreignKey: "post_id",
//   constraints: false,
// });
// db.likesModel.belongsTo(db.postModel, {
//   as: "post",
//   foreignKey: "post_id",
//   constraints: false,
// });
export default db;
