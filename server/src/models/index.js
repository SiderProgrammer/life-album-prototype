import dbConfig from "../db.config.js";
import Sequelize from "sequelize";
import userModel from "./user.model.js";
import postModel from "./posts.model.js";
const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,

  {
    dialect: "mysql",
    host: dbConfig.HOST,
  }
);

const db = {
  Sequelize,
  sequelize,
  userModel: userModel(sequelize, Sequelize),
  postModel: postModel(sequelize, Sequelize),
};

db.userModel.hasMany(db.postModel);
db.postModel.belongsTo(db.userModel);

export default db;
