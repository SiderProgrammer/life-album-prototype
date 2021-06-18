import dbConfig from "../config/db.config.js";
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

export const db = {
  Sequelize,
  sequelize,
};
export const user = userModel(sequelize, Sequelize);
export const comment = commentsModel(sequelize, Sequelize);
export const post = postModel(sequelize, Sequelize);
export const like = likesModel(sequelize, Sequelize);

user.hasMany(post, {
  as: "posts",
  foreignKey: "id",
  constraints: false,
});
post.belongsTo(user, {
  as: "owner",
  foreignKey: "user_id",
  constraints: false,
});

post.hasMany(comment, {
  as: "comments",
  foreignKey: "post_id",
  constraints: false,
});
comment.belongsTo(post, {
  as: "commentedPost",
  foreignKey: "post_id",
  constraints: false,
});

post.hasMany(like, {
  as: "likes",
  foreignKey: "post_id",
  constraints: false,
});
like.belongsTo(post, {
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
