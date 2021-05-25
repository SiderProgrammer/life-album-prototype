import { useState } from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import PublicIcon from "@material-ui/icons/Public";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
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
  },

  navIconButton: {
    height: theme.height,
    marginLeft: "10px",
  },

  navIcon: {
    color: "white",
    height: "40px",
    width: "40px",
  },
}));

const theme = createMuiTheme({
  height: "40px",
});

function NavbarElements() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const classes = useStyles();
  return (
    <AppBar position="sticky">
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
          <IconButton
            className={classes.navIconButton}
            component={RouterLink}
            to="/public"
          >
            <PublicIcon className={classes.navIcon} />
          </IconButton>
          <IconButton
            className={classes.navIconButton}
            component={RouterLink}
            to="/"
          >
            <HomeIcon className={classes.navIcon} />
          </IconButton>
          <IconButton
            className={classes.navIconButton}
            component={RouterLink}
            to="/profile"
          >
            <AccountBoxIcon className={classes.navIcon} />
          </IconButton>
          <IconButton
            aria-controls="three-dots-menu"
            className={classes.navIconButton}
            onClick={handleClick}
          >
            <MoreVertIcon className={classes.navIcon} />
          </IconButton>

          <Menu
            disableScrollLock={true}
            id="three-dots-menu"
            keepMounted
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem>Settings</MenuItem>
            <MenuItem>
              <MaterialLink
                color="inherit"
                underline="none"
                component={RouterLink}
                to="/signIn"
              >
                Log out
              </MaterialLink>
            </MenuItem>
          </Menu>
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
