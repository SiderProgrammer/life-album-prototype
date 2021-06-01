export default (sequelize, Sequelize) => {
  return sequelize.define("user", {
    nickname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    followers_count: {
      type: Sequelize.INTEGER,
    },
  });
};
