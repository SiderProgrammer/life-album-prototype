export default (sequelize, Sequelize) => {
  return sequelize.define("posts", {
    user_id: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.STRING,
    },

    image_path: {
      type: Sequelize.STRING,
    },
  });
};
