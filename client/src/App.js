import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logged from "./pages/Logged";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import UnLoggedRoute from "./protectedRoutes/UnLoggedRoute";
import { getUser } from "./services/UserService";
import NoPage from "./pages/NoPage";
import NoAuth from "./components/NoAuth";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(0),
    height: "90vh",
  },
  margingora: {
    paddingTop: theme.spacing(2),
  },

  marginHome: {
    paddingTop: theme.spacing(10),
  },
}));

function App() {
  const [auth, setAuth] = useState();
  const [status, setStatus] = useState();
  useEffect(() => {
    getUser(setAuth);
    console.log(status);
  }, [status]);

  const classes = useStyles();
  return (
    <div className="App">
      <BrowserRouter>
        <Nav auth={auth} setStatus={setStatus} />
        <Grid container>
          <Grid item xs className={classes.content}>
            <Routes>
              <Route path="/">
                <Route
                  index
                  element={
                    <div className={classes.marginHome}>
                      <Home />
                    </div>
                  }
                />
                <Route path="noauth" element={<NoAuth />} />
                <Route element={<UnLoggedRoute auth={auth} />}>
                  <Route
                    path="login"
                    element={
                      <div className={classes.margingora}>
                        <Login setStatus={setStatus} />
                      </div>
                    }
                  />
                  <Route
                    path="register"
                    element={
                      <div className={classes.margingora}>
                        <Register />
                      </div>
                    }
                  />
                </Route>
                <Route path="profil/*" element={<Logged auth={auth} />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default App;
