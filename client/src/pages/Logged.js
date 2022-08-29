import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Footer from "../components/Footer";
import { Container, Grid } from "@mui/material";
import Form from "./Form";
import Dzienniczek from "./Dzienniczek";
import Konto from "../components/Konto";
import Uprawnienia from "./Uprawnienia";
import NoPage from "./NoPage";
import OpiekunZ from "./OpiekunZ";
import DodawanieOpiekunow from "./DodawanieOpiekunow";
import OpiekunUHistory from "./OpiekunUHistory";
import OpiekunStatus from "./OpiekunStatus";
import OpiekunU from "./OpiekunU";
import OpiekunZEfekty from "./EfektyOpiekunZ";
function Logged() {
  return (
    <Grid container>
      {/* <Grid item >
      <Sidebar/>
    </Grid> */}
      <Grid item xs>
        <Routes>
          <Route path="/">
            <Route index element={<Dzienniczek />} />
            <Route path="Form" element={<Form />} />
            <Route path="Dzienniczek" element={<Dzienniczek />} />
            <Route path="DodawanieOpiekunow" element={<DodawanieOpiekunow />} />
            <Route path="konto" element={<Konto />} />
            <Route path="uprawnienia" element={<Uprawnienia />} />
            <Route path="opiekunZ" element={<OpiekunZ />} />
            <Route path="*" element={<NoPage />} />
            <Route path="opiekunZStatus" element={<OpiekunStatus />} />
            <Route path="opiekunUStatus" element={<OpiekunUHistory />} />
            <Route path="opiekunU" element={<OpiekunU />} />
            <Route path="OpiekunZEfekty" element={<OpiekunZEfekty />} />

            {/* <Route path='ListaStudentow' element={<ListaStudentow/>}/> */}
          </Route>
        </Routes>
      </Grid>
      <Grid item xs={12}>
      </Grid>
    </Grid>
  );
}

export default Logged;
