import { CssBaseline } from "@material-ui/core";
import NavBar from "./components/NavBar";
import Post from "./components/Post";
import Profile from "./components/Profile";
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />

        <Route exact path="/">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "70px",
            }}
          >
            <Post />
            <Post />
          </div>
        </Route>

        <Route path="/profile" exact component={Profile} />
      </BrowserRouter>
    </>
  );
}

export default App;
