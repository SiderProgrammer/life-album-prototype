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

  const { description, image_path, createdAt } = props.data;
  const onwerNickname = props.data.owner.nickname;
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
