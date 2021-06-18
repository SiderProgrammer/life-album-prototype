import {
  Avatar,
  CardMedia,
  Card,
  Grid,
  makeStyles,
  Typography,
  CardHeader,
  Button,
  List,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import { useEffect, useState } from "react";
import api from "../api/api";
const SAMPLE_IMG_URL =
  "https://miro.medium.com/max/1838/1*MI686k5sDQrISBM6L8pf5A.jpeg";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  headerRoot: {
    justifyContent: "center",
    gap: "30px",
    [theme.breakpoints.down(600)]: {
      flexDirection: "column",
    },
  },
  followButton: {
    [theme.breakpoints.down(600)]: {
      order: "2",
    },
  },
  stats: {
    [theme.breakpoints.down(600)]: {
      order: "3",
    },
  },
  profile: {
    [theme.breakpoints.down(600)]: {
      order: "1",
    },
  },
  avatarRoot: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  album: {},
  day: {
    aspectRatio: "1",
  },
  tile: {
    maxWidth: "400px",
    margin: "auto",
  },
  dayTitle: {
    textAlign: "center",
  },
  post: {
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
    "&:hover": {
      transform: "scale(1.02)",
      cursor: "pointer",
    },
  },
}));
function getPostDate(i) {
  var today = new Date(new Date() - 1000 * 60 * 60 * 24 * (i - 1));
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return dd + "/" + mm + "/" + yyyy;
}
// function AlbumPosts({ classes }) {
//   const posts = [];

//   for (let i = 9; i > 0; --i) {
//     posts.push(
//       <Grid className={classes.post} key={i} item xs={4}>
//         <div className={classes.tile}>
//           <Card>
//             <CardHeader
//               title={"Day " + i}
//               subheader={getPostDate(i)}
//               className={classes.dayTitle}
//             />

//             <CardMedia image={SAMPLE_IMG_URL} className={classes.day} />
//           </Card>
//         </div>
//       </Grid>
//     );
//   }

//   return posts;
// }

function Profile() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userData, setUserData] = useState({});
  const [postsData, setPostsData] = useState(false);

  useEffect(() => {
    async function getUserData() {
      const user = await api.get("profile");
      console.log("user data ", user);
      setUserData(user.data);
      console.log(userData.createdAt);
    }
    async function getUserPostsData() {
      const posts = await api.post("profile-posts", { offset: 0 });
      console.log("posts data ", posts);

      setPostsData(posts.data);
    }
    getUserData();
    getUserPostsData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  function handlePostClick(id) {
    console.log("get and open post with id ", id);
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.wrapper}>
        <Grid className={classes.headerRoot} container alignItems="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.followButton}
          >
            Follow
          </Button>

          <div className={classes.profile}>
            <div>
              <Avatar
                classes={{
                  root: classes.avatarRoot,
                }}
              >
                XYZ
              </Avatar>
              <Typography>{userData.nickname}</Typography>
            </div>
          </div>

          <List className={classes.stats}>
            <Typography>Total days in album 53</Typography>
            <Typography>
              Published days {postsData && postsData.length}
            </Typography>
            <Typography>Max published days in a row 22</Typography>
            <Typography>Followers {userData.followers_count}</Typography>
          </List>
        </Grid>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          minDate={userData.createdAt}
          maxDate={new Date()}
          margin="normal"
          autoOk={true}
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <Grid container spacing={1}>
          {postsData &&
            postsData.map((post, i) => (
              <Grid
                className={classes.post}
                key={i}
                item
                xs={4}
                onClick={() => handlePostClick(post.id)}
              >
                <div className={classes.tile}>
                  <Card>
                    <CardHeader
                      title={"Day " + Number(i + 1)}
                      subheader={getPostDate(i)}
                      className={classes.dayTitle}
                    />

                    <CardMedia image={SAMPLE_IMG_URL} className={classes.day} />
                  </Card>
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default Profile;
