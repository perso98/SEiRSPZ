import React, { useState, useEffect, createContext } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import UnLoggedRoute from "./protectedRoutes/UnLoggedRoute";

import NoPage from "./pages/NoPage";
import NoAuth from "./components/NoAuth";
import Admin from "./pages/Admin";
import OpiekunZHistory from "./pages/OpiekunZHistory";
import OpiekunZ from "./pages/OpiekunZ";
import RoleRoute from "./protectedRoutes/RoleRoute";
import EfektyOpiekunU from "./pages/EfektyOpiekunU";
import OpiekunUHistory from "./pages/OpiekunUHistory";
import OpiekunU from "./pages/OpiekunU";
import Dyrektor from "./pages/zastepstwa";
import EfektyUczeniaSie from "./pages/EfektyUczeniaSie";
import Dzienniczek from "./pages/Dzienniczek";
import EfektyUzasadnienie from "./pages/EfektyUzasadnienie";
import Konto from "./pages/Konto";
import ZarzadzanieZakladami from "./pages/ZarzadzanieZakladami";
import Axios from "axios";
import { url } from ".//services/Url";
import ResendEmail from "./pages/ResendEmail";
import ResetPassword from "./pages/ResetPassword";
import EmailPasswordReset from "./pages/EmailPasswordReset";
import ConfirmEmail from "./pages/ConfirmEmail";

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
    await Axios.get(`${url}loginToAccount`).then((res) => {
      setAuth(res.data);
    });
  }, [status]);
  const classes = useStyles();
  const [darkMode, setDarkmode] = useState(localStorage.getItem("theme"));
  useEffect(() => {
    localStorage.setItem("theme", darkMode);
  }, [darkMode]);
  return (
    <Paper
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode,
      }}
    >
      <BrowserRouter>
        <Nav
          auth={auth}
          setStatus={setStatus}
          setDarkmode={setDarkmode}
          darkMode={darkMode}
        />
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
                        <Login setStatus={setStatus} darkMode={darkMode} />
                      </div>
                    }
                  />
                  <Route
                    path="confirm/:token"
                    element={<ConfirmEmail darkMode={darkMode} />}
                  />
                  <Route
                    path="resendemail"
                    element={
                      <div className={classes.margingora}>
                        <ResendEmail darkMode={darkMode} />
                      </div>
                    }
                  />
                  <Route
                    path="restartpassword/:token"
                    element={<ResetPassword darkMode={darkMode} />}
                  />

                  <Route
                    path="restartpassword"
                    element={
                      <div className={classes.margingora}>
                        <EmailPasswordReset darkMode={darkMode} />
                      </div>
                    }
                  />
                  <Route
                    path="register"
                    element={
                      <div className={classes.margingora}>
                        <Register darkMode={darkMode} />
                      </div>
                    }
                  />
                </Route>
                //admin route
                <Route
                  element={
                    <RoleRoute
                      role={auth?.user?.isAdmin}
                      logged={auth?.logged}
                    />
                  }
                >
                  <Route
                    path="admin"
                    element={
                      <Admin setStatus={setStatus} darkMode={darkMode} />
                    }
                  />
                </Route>
                <Route
                  element={
                    <RoleRoute
                      role={auth?.user?.isOpiekunZakl}
                      logged={auth?.logged}
                    />
                  }
                >
                  <Route
                    path="opiekunz"
                    element={
                      <OpiekunZ setStatus={setStatus} darkMode={darkMode} />
                    }
                  />
                  <Route
                    path="opiekunz/historia"
                    element={
                      <OpiekunZHistory
                        setStatus={setStatus}
                        darkMode={darkMode}
                      />
                    }
                  />
                </Route>
                <Route path="efektyuczeniasie" element={<EfektyUczeniaSie />} />
                <Route path="dzienniczek" element={<Dzienniczek />} />
                <Route path="efekty" element={<EfektyUzasadnienie />} />
                <Route
                  path="zarzadzaniezakladami"
                  element={<ZarzadzanieZakladami />}
                />
                <Route path="konto" element={<Konto darkMode={darkMode} />} />
                //Routy do opiekuna uczelnianego
                <Route
                  element={
                    <RoleRoute
                      role={auth?.user?.isOpiekun}
                      logged={auth?.logged}
                    />
                  }
                >
                  <Route
                    path="opiekunuefekty"
                    element={
                      <EfektyOpiekunU
                        setStatus={setStatus}
                        darkMode={darkMode}
                      />
                    }
                  />
                  <Route
                    path="opiekunu/historia"
                    element={
                      <OpiekunUHistory
                        setStatus={setStatus}
                        darkMode={darkMode}
                      />
                    }
                  />
                  <Route
                    path="opiekunu"
                    element={
                      <OpiekunU setStatus={setStatus} darkMode={darkMode} />
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
                  <Route
                    path="zastepstwa"
                    element={<Dyrektor setStatus={setStatus} />}
                  />
                </Route>
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </Paper>
  );
}

export default App;
