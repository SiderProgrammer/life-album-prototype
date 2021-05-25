import { CssBaseline } from "@material-ui/core";
import NavBar from "./components/NavBar";

import Profile from "./components/Profile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
function App() {
  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <Switch>
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
          <NavBar />
        </Switch>

        <Route exact path="/" component={Home} />

        <Route path="/profile" exact component={Profile} />
      </BrowserRouter>
    </>
  );
}

export default App;
