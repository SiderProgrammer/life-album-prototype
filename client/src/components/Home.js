import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Post from "./Post";

import api from "../api/api";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "70px",
  },
});

function Home() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("posts").then((response) => {
      console.log("get posts ", response);
      setPosts(response.data);
    });
  }, []);

  return (
    <section className={classes.root}>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </section>
  );
}

export default Home;
