import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {
  createMuiTheme,
  fade,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import PublicIcon from "@material-ui/icons/Public";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { IconButton, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  toolbarRoot: {
    justifyContent: "space-around",
  },
  search: {
    height: theme.height,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    height: "100%",
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "180px",
    paddingRight: "25px",
  },

  navIconButtons: {
    display: "flex",
    flexDirection: "row",
    "&>a": {
      height: theme.height,
      marginLeft: "10px",
      "&>span>svg": {
        color: "white",
        height: "40px",
        width: "40px",
      },
    },
  },
}));

const theme = createMuiTheme({
  height: "40px",
});

function NavbarElements() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbarRoot}>
        <Typography variant="h4" noWrap={false}>
          <MaterialLink
            color="inherit"
            underline="none"
            component={RouterLink}
            to="/"
          >
            Lifebum
          </MaterialLink>
        </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>

        <div className={classes.navIconButtons}>
          <IconButton component={RouterLink} to="/public">
            <PublicIcon />
          </IconButton>
          <IconButton component={RouterLink} to="/">
            <HomeIcon />
          </IconButton>
          <IconButton component={RouterLink} to="/profile">
            <AccountBoxIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default function NavBar() {
  return (
    <MuiThemeProvider theme={theme}>
      <NavbarElements />
    </MuiThemeProvider>
  );
}
