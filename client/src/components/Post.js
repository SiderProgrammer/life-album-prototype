import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useEffect, useRef, useState } from "react";
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
  header: {
    borderBottom: "1px solid grey",
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

  nickname: {
    color: "black",
  },
  description: {
    padding: "10px",
    wordBreak: "break-all",
  },
  interactionCounter: {
    paddingTop: "12px",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
      color: "blue",
    },
  },
}));

function UsersDialog({ handleClose, open }) {
  return (
    <Dialog aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title">Modal title</DialogTitle>
      <IconButton aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
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

  useEffect(() => {
    api.post("is-post-liked", { post_id: id }).then((r) => {
      if (r.data === "liked") setLiked(true);
    });
  }, [id]);

  const onwerNickname = props.data.owner.nickname;

  const [areCommentsOpened, setCommentsOpened] = useState(false);
  const commentInput = useRef();
  const [commentValue, setCommentValue] = useState("");
  const [isLiked, setLiked] = useState(false);
  const [allComments, setComments] = useState(comments);
  const [allLikes, setLikes] = useState(likes);
  const [showUsersDialog, setUsersDialogVisibility] = useState(true);

  function handleCommentsVisibility() {
    areCommentsOpened ? setCommentsOpened(false) : setCommentsOpened(true);
  }
  function postLike() {
    if (!isLiked) {
      api.post("post-like", { post_id: id }).then((like) => {
        setLikes([...allLikes, like.data]);
      });
      setLiked(true);
    } else {
      api.post("delete-like", { post_id: id }).then((response) => {
        const removedNickname = response.data;

        const oldLikes = [...allLikes];

        oldLikes.splice(
          oldLikes.findIndex((data) => data.nickname === removedNickname),
          1
        );
        setLikes(oldLikes);
      });
      setLiked(false);
    }
  }

  function handleCommentSubmit() {
    api
      .post("post-comment", { post_id: id, text: commentValue })
      .then((comment) => {
        setComments([...allComments, comment.data]);
      });
    commentInput.current.value = "";
    setCommentValue("");
  }

  function commentValueChanged() {
    setCommentValue(commentInput.current.value);
  }

  function handlePublicationTime(comment) {
    return secondsToDhms(new Date() - new Date(comment.createdAt));
  }

  function handleClose() {
    setUsersDialogVisibility(false);
  }
  function openLikesUsers() {
    setUsersDialogVisibility(true);
  }

  function openCommentsUsers() {
    setUsersDialogVisibility(true);
  }

  return (
    <Card className={classes.root}>
      <UsersDialog open={showUsersDialog} handleClose={handleClose} />
      <CardHeader
        avatar={<Avatar>XYZ</Avatar>}
        subheader={onwerNickname}
        subheaderTypographyProps={{ variant: "subtitle1" }}
        classes={{
          subheader: classes.nickname,
          root: classes.header,
        }}
      >
        <Typography>Day 37</Typography>
      </CardHeader>
      <Box className={classes.description}>
        <Typography>{description}</Typography>
      </Box>

      <CardMedia
        className={classes.media}
        image={image_path || SAMPLE_IMG_URL}
      />

      <div className={classes.interaction}>
        <div>
          <Typography
            className={classes.interactionCounter}
            onClick={openLikesUsers}
          >
            {allLikes.length}
          </Typography>
          <IconButton onClick={postLike}>
            {isLiked ? <ThumbUpAltIcon color="primary" /> : <ThumbUpAltIcon />}
          </IconButton>
        </div>

        <div>
          <Typography
            className={classes.interactionCounter}
            onClick={openCommentsUsers}
          >
            {allComments.length}
          </Typography>
          <IconButton onClick={handleCommentsVisibility}>
            <ChatBubbleIcon />
          </IconButton>
        </div>
      </div>
      {areCommentsOpened && (
        <div>
          {allComments.map((comment) => (
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
              onChange={commentValueChanged}
              inputRef={commentInput}

              // startAdornment={
              //   <InputAdornment position="start">
              //     {/* <AccountCircle /> */}
              //   </InputAdornment>
              // }
            />
            {commentValue !== "" ? (
              <Button
                onClick={handleCommentSubmit}
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            ) : (
              <Button
                onClick={handleCommentSubmit}
                variant="contained"
                disabled
                color="primary"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            )}
          </FormControl>
        </div>
      )}
    </Card>
  );
}

export default Post;
