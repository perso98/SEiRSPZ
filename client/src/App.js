import React, { useState, useEffect, createContext } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import UnLoggedRoute from "./protectedRoutes/UnLoggedRoute";

import NoPage from "./pages/NoPage";
import NoAuth from "./components/NoAuth";
import Uprawnienia from "./pages/Uprawnienia";
import OpiekunZHistory from "./pages/OpiekunZHistory";
import OpiekunZ from "./pages/OpiekunZ";
import RoleRoute from "./protectedRoutes/RoleRoute";
import OpiekunZEfekty from "./pages/EfektyOpiekunZ";
import Axios from "axios";

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
  useEffect(async () => {
    let isMounted = true;
    const getUser = async () => {
      await Axios.get("http://localhost:5000/api/loginToAccount").then(
        (res) => {
          isMounted && setAuth(res.data);
          console.log(res.data);
        }
      );
    };
    getUser();
    return () => {
      isMounted = false;
    };
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

                <Route
                  element={
                    <RoleRoute
                      role={auth?.user?.isAdmin}
                      logged={auth?.logged}
                    />
                  }
                >
                  <Route path="uprawnienia" element={<Uprawnienia />} />
                </Route>
                <Route element={<RoleRoute role={auth?.user?.isOpiekunZakl} />}>
                  <Route path="opiekunZ" element={<OpiekunZ />} />
                  <Route path="opiekunZStatus" element={<OpiekunZHistory />} />
                </Route>
                <Route path="OpiekunZEfekty" element={<OpiekunZEfekty />} />

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
