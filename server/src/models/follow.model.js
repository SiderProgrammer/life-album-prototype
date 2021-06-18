export default (sequelize, Sequelize) => {
  return sequelize.define("follow", {
    user_id: {
      type: Sequelize.INTEGER,
    },
    nickname: {
      type: Sequelize.STRING,
    },
  });
};
