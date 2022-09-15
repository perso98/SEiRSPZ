import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../img/ans.png";
import { makeStyles } from "@mui/styles";
import AlertComponent from "../components/AlertComponent";
import { url } from "../services/Url";
import Axios from "axios";

import { useNavigate } from "react-router-dom";

function Login(props) {
  const useStyles = makeStyles((theme) => ({
    loginForm: {
      marginTop: "10%",
      padding: "20px",
      [theme.breakpoints.down("md")]: {
        marginTop: "20%",
      },
    },
  }));

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const loginToAccount = async () => {
    await Axios.post(`${url}loginToAccount`, {
      login: login,
      password: password,
    }).then((res) => {
      if (res.data.message) setLoginStatus(res.data.message);
      if (res.data.logged) {
        props.setStatus(res.data);
      } else {
        setOpen(true);
      }
    });
  };

  return (
    <Grid
      container
      sm={12}
      justifyContent={"space-between"}
      className={classes.loginForm}
    >
      <div />
      <div
        style={{ display: "flex", flexDirection: "column", minWidth: "250px" }}
      >
        <img src={logo} alt="Logo" style={{ marginBottom: "5%" }} />

        <AlertComponent
          loginStatus={loginStatus}
          open={open}
          setOpen={setOpen}
        />

        <TextField
          required
          name="loginLogin"
          label="E-mail:"
          type="email"
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          margin="normal"
        />
        <TextField
          required
          name="loginPassword"
          label="Hasło:"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          margin="normal"
          type="password"
        />

        <Button
          variant="contained"
          style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
          onClick={() => {
            loginToAccount();
          }}
        >
          Zaloguj się
        </Button>
      </div>
      <div />
    </Grid>
  );
}

export default Login;
