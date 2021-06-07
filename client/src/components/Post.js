import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useRef, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import api from "../api/api";
import { secondsToDhms } from "../utlis";

const SAMPLE_IMG_URL =
  "https://miro.medium.com/max/1838/1*MI686k5sDQrISBM6L8pf5A.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
    width: "100%",
  },
  media: {
    paddingTop: "100%",
  },
  description: {
    background: "antiquewhite",
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
function Post(props) {
  const classes = useStyles();

  const {
    id,
    description,
    image_path,
    createdAt,
    comments,
    likes,
  } = props.data;
  const onwerNickname = props.data.owner.nickname;

  const [areCommentsOpened, setCommentsOpened] = useState(false);
  const commentInput = useRef();
  function handleCommentsVisibility() {
    areCommentsOpened ? setCommentsOpened(false) : setCommentsOpened(true);
  }
  function postLike() {
    api.post("post-like", { post_id: id });
  }

  function handleCommentSubmit() {
    api.post("post-comment", { post_id: id, text: commentInput.current.value });
  }

  function handlePublicationTime(comment) {
    return secondsToDhms(new Date() - new Date(comment.createdAt));
  }
  return (
    <Card className={classes.root}>
      <CardHeader avatar={<Avatar>XYZ</Avatar>} subheader={onwerNickname}>
        <Typography>Day 37</Typography>
      </CardHeader>
      <div className={classes.description}>
        <Typography>{description}</Typography>
      </div>

      <CardMedia
        className={classes.media}
        image={image_path || SAMPLE_IMG_URL}
      />

      <div className={classes.interaction}>
        <div>
          <Typography>{likes.length}</Typography>
          <IconButton onClick={postLike}>
            <ThumbUpAltIcon />
          </IconButton>
        </div>

        <div>
          <Typography>{comments.length}</Typography>
          <IconButton onClick={handleCommentsVisibility}>
            <ChatBubbleIcon />
          </IconButton>
        </div>
      </div>
      {areCommentsOpened && (
        <div>
          {comments.map((comment) => (
            <Grid key={comment.id} container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar></Avatar>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography variant="h4">{comment.nickname}</Typography>
                <p>{comment.text}</p>
                <p>Opublikowano {handlePublicationTime(comment)} temu</p>
              </Grid>
            </Grid>
          ))}

          <FormControl>
            <InputLabel htmlFor="comment-input">Comment the post</InputLabel>
            <Input
              id="comment-input"
              inputRef={commentInput}

              // startAdornment={
              //   <InputAdornment position="start">
              //     {/* <AccountCircle /> */}
              //   </InputAdornment>
              // }
            />
            <Button
              onClick={handleCommentSubmit}
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </FormControl>
        </div>
      )}
    </Card>
  );
}

export default Post;
