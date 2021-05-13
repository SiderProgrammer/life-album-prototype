import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import React from "react";

const SAMPLE_IMG_URL =
  "https://miro.medium.com/max/1838/1*MI686k5sDQrISBM6L8pf5A.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    width: "100%",
  },
  media: {
    paddingTop: "110%",
  },
  description: {
    background: "antiquewhite;",
  },
  interaction: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    "&>div": {
      display: "flex",
      flexDirection: "column",

      alignItems: "center",
    },
  },
}));
function Post() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader avatar={<Avatar>XYZ</Avatar>} subheader="Nickname">
        <Typography>Day 37</Typography>
      </CardHeader>
      <div className={classes.description}>
        <Typography>Description ...</Typography>
      </div>

      <CardMedia className={classes.media} image={SAMPLE_IMG_URL} />

      <div className={classes.interaction}>
        <div>
          <Typography>576</Typography>
          <IconButton>
            <ThumbUpAltIcon />
          </IconButton>
        </div>

        <div>
          <Typography>3,7k</Typography>
          <IconButton>
            <ChatBubbleIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

export default Post;
