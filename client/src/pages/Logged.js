import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import Footer from "../components/Footer";
import { Container, Grid } from "@mui/material";
import Form from "../components/Form";
import Dzienniczek from "../components/Dzienniczek";
import Konto from "../components/Konto";
import Uprawnienia from "../components/Uprawnienia";
import NoPage from "../components/NoPage";
import OpiekunZ from "../components/OpiekunZ";
import OpiekunStatus from "../components/OpiekunStatus";

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
            <Route path="konto" element={<Konto />} />
            <Route path="uprawnienia" element={<Uprawnienia />} />
            <Route path="opiekunZ" element={<OpiekunZ />} />
            <Route path="opiekunStatus" element={<OpiekunStatus />} />
            <Route path="*" element={<NoPage />} />
            {/* <Route path='ListaStudentow' element={<ListaStudentow/>}/> */}
          </Route>
        </Routes>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Logged;
