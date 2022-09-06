import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Footer from "../components/Footer";
import { Container, Grid } from "@mui/material";
import Form from "./Form";
import Dzienniczek from "./Dzienniczek";
import Konto from "./Konto";
import Uprawnienia from "./Uprawnienia";
import NoPage from "./NoPage";
import OpiekunZ from "./OpiekunZ";
import DodawanieOpiekunow from "./DodawanieOpiekunow";
import OpiekunUHistory from "./OpiekunUHistory";
import OpiekunZHistory from "./OpiekunZHistory";
import OpiekunU from "./OpiekunU";
import OpiekunZEfekty from "./EfektyOpiekunZ";
import LoggedRoute from "../protectedRoutes/LoggedRoute";
import RoleRoute from "../protectedRoutes/RoleRoute";
function Logged(props) {
  return (
    <Grid container>
      <div>Witaj</div>
      <Grid item xs>
        <Routes>
          <Route element={<LoggedRoute auth={props?.auth} />}>
            <Route path="/">
              <Route index element={<Dzienniczek />} />
              <Route path="Form" element={<Form />} />
              <Route path="Dzienniczek" element={<Dzienniczek />} />
              <Route
                path="DodawanieOpiekunow"
                element={<DodawanieOpiekunow />}
              />
              <Route path="konto" element={<Konto />} />

              <Route path="opiekunUStatus" element={<OpiekunUHistory />} />
              <Route path="opiekunU" element={<OpiekunU />} />

              <Route path="*" element={<NoPage />} />

              {/* <Route path='ListaStudentow' element={<ListaStudentow/>}/> */}
            </Route>
          </Route>
        </Routes>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default Logged;
