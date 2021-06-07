export default (sequelize, Sequelize) => {
  return sequelize.define("likes", {
    post_id: {
      type: Sequelize.INTEGER,
    },
    nickname: {
      type: Sequelize.STRING,
    },
  });
};
