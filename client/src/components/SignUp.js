import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Link as MaterialLink } from "@material-ui/core";
import { useFormik } from "formik";

import api from "../api/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      nickname: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit({ nickname, email, password }) {
      api
        .post("register", {
          nickname,
          email,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            //  localStorage.setItem("nickname", JSON.stringify(res.data.nickname));
            history.push("/");
          }
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="nickname"
                name="nickname"
                variant="outlined"
                required
                fullWidth
                id="nickname"
                label="Nickname"
                value={formik.values.nickname}
                onChange={formik.handleChange}
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeatPassword"
                label="Repeat password"
                type="password"
                id="repeatPassword"
                autoComplete="current-password"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <MaterialLink component={RouterLink} to="/signIn" variant="body2">
                Already have an account? Sign in
              </MaterialLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
