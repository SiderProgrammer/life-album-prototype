export default (sequelize, Sequelize) => {
  return sequelize.define("comments", {
    post_id: {
      type: Sequelize.INTEGER,
    },
    text: {
      type: Sequelize.STRING,
    },

    nickname: {
      type: Sequelize.STRING,
    },
  });
};
