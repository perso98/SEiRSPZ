import React, { useState, useEffect, createContext } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { Grid, Paper } from "@mui/material";

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
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [auth, setAuth] = useState();
  const [status, setStatus] = useState();
  useEffect(async () => {
    await Axios.get(`${url}loginToAccount`).then((res) => {
      setAuth(res.data);
    });
  }, [status]);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "white"
  );
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
        <ThemeContext.Provider value={[darkMode, setDarkMode]}>
          <Nav auth={auth} setStatus={setStatus} />
          <Routes>
            <Route path="/">
              <Route index element={<Home auth={auth} />} />
              <Route path="noauth" element={<NoAuth />} />
              <Route element={<UnLoggedRoute auth={auth} />}>
                <Route path="login" element={<Login setStatus={setStatus} />} />
                <Route path="confirm/:token" element={<ConfirmEmail />} />
                <Route path="resendemail" element={<ResendEmail />} />
                <Route
                  path="restartpassword/:token"
                  element={<ResetPassword />}
                />

                <Route
                  path="restartpassword"
                  element={<EmailPasswordReset />}
                />
                <Route path="register" element={<Register />} />
              </Route>
              <Route
                element={
                  <RoleRoute role={auth?.user?.isAdmin} logged={auth?.logged} />
                }
              >
                <Route path="admin" element={<Admin setStatus={setStatus} />} />
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
                  element={<OpiekunZ setStatus={setStatus} />}
                />
                <Route
                  path="opiekunz/historia"
                  element={<OpiekunZHistory setStatus={setStatus} />}
                />
              </Route>
              <Route path="efektyuczeniasie" element={<EfektyUczeniaSie />} />
              <Route path="dzienniczek" element={<Dzienniczek />} />
              <Route path="efekty" element={<EfektyUzasadnienie />} />
              <Route
                path="zarzadzaniezakladami"
                element={<ZarzadzanieZakladami />}
              />
              <Route
                element={<RoleRoute role={auth?.user} logged={auth?.logged} />}
              >
                <Route path="konto" element={<Konto />} />
              </Route>
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
                  element={<EfektyOpiekunU setStatus={setStatus} />}
                />
                <Route
                  path="opiekunu/historia"
                  element={<OpiekunUHistory setStatus={setStatus} />}
                />
                <Route
                  path="opiekunu"
                  element={<OpiekunU setStatus={setStatus} />}
                />
              </Route>
              <Route
                element={
                  <RoleRoute role={auth?.user?.isAdmin} logged={auth?.logged} />
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
        </ThemeContext.Provider>
      </BrowserRouter>
    </Paper>
  );
}

export default App;
