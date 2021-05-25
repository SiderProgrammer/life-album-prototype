import {
  Avatar,
  CardMedia,
  Card,
  Grid,
  ImageList,
  makeStyles,
  Typography,
  GridListTile,
  GridList,
  CardHeader,
} from "@material-ui/core";
import React from "react";
const SAMPLE_IMG_URL =
  "https://miro.medium.com/max/1838/1*MI686k5sDQrISBM6L8pf5A.jpeg";

const useStyles = makeStyles({
  profile: {
    marginLeft: "50%",
    display: "inline-block",
    transform: "translateX(-50%)",
  },
  stats: {
    display: "inline-block",
  },
  avatarRoot: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  album: {},
  day: {
    padding: "100%",
  },
});

function Profile() {
  const classes = useStyles();
  return (
    <>
      <div>
        <div className={classes.profile}>
          <Avatar
            classes={{
              root: classes.avatarRoot,
            }}
          >
            XYZ
          </Avatar>
          <Typography>Nickname</Typography>
        </div>

        <div className={classes.stats}>
          <Typography>rank 1</Typography>
          <Typography>days 53</Typography>
          <Typography>days in a row 22</Typography>
          <Typography>favorites 277</Typography>
        </div>
      </div>

      <GridList cols={3} spacing={1}>
        <GridListTile>
          <CardHeader title="Day 1" />
          <Card>
            <CardMedia image={SAMPLE_IMG_URL} className={classes.day} />
          </Card>
        </GridListTile>
        <GridListTile>
          <Card>
            <CardHeader title="Day 1" />
            <CardMedia image={SAMPLE_IMG_URL} className={classes.day} />
          </Card>
        </GridListTile>
        <GridListTile>
          <Card>
            <CardHeader title="Day 1" />
            <CardMedia
              image={SAMPLE_IMG_URL}
              className={classes.day}
              cols={1}
            />
          </Card>
        </GridListTile>
        <GridListTile>
          <Card>
            <CardHeader title="Day 1" />
            <CardMedia
              image={SAMPLE_IMG_URL}
              className={classes.day}
              cols={1}
            />
          </Card>
        </GridListTile>
        <GridListTile>
          <Card>
            <CardMedia
              image={SAMPLE_IMG_URL}
              className={classes.day}
              cols={1}
            />
          </Card>
        </GridListTile>
        <GridListTile>
          <Card>
            <CardMedia
              image={SAMPLE_IMG_URL}
              className={classes.day}
              cols={1}
            />
          </Card>
        </GridListTile>
        <GridListTile>
          <Card>
            <CardMedia
              image={SAMPLE_IMG_URL}
              className={classes.day}
              cols={1}
            />
          </Card>
        </GridListTile>
        <GridListTile>
          <Card>
            <CardMedia
              image={SAMPLE_IMG_URL}
              className={classes.day}
              cols={1}
            />
          </Card>
        </GridListTile>
        <GridListTile>
          <Card>
            <CardMedia
              image={SAMPLE_IMG_URL}
              className={classes.day}
              cols={1}
            />
          </Card>
        </GridListTile>
      </GridList>
    </>
  );
}

export default Profile;
