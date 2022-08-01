import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Container, Toolbar, Typography } from "@mui/material";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ListaStudentow from "./ListaStudentow";
import Form from "./Form";
import Logged from "../pages/Logged";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

function Rightbar() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {/* <BrowserRouter >
                <Routes>
                    <Route path="/">
                    <Route path='login' element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter> */}
    </Container>
  );
}

export default Rightbar;
