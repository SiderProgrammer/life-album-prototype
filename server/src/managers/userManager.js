class userManager {
  constructor() {}
  register(req, res) {
    const { nickname, email, password } = req.body;
    const user = {
      nickname,
      email,
      password,
    };

    userModel.create(user).then((data) => {
      res.send(data);
      const post = {
        user_id: data.dataValues.id,
        description: "Test description",
        image_path:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      };
      postModel.create(post);
      postModel.create(post).then((data) => {
        likesModel.create({
          post_id: data.dataValues.id,
          nickname: "brabra",
        });

        commentsModel.create({
          post_id: data.dataValues.id,
          nickname: "brabra",
          text: "sample comment",
        });
      });
    });
    //   .catch((err) => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the Tutorial.",
    //     });
    //   });
  }
}
