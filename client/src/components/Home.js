import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import Post from "./Post";
import axios from "axios";

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((respone) => console.log(respone));
  }, []);

  return (
    <section className={classes.root}>
      <Post />
      <Post />
    </section>
  );
}

export default Home;
