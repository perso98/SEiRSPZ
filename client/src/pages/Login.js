import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import logo from "../img/ans.png";
import { makeStyles } from "@mui/styles";
import AlertComponent from "../components/AlertComponent";
import { url } from "../services/Url";
import Axios from "axios";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
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
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "white !important",
    },
  }));
  const [darkMode] = useContext(ThemeContext);
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
          inputProps={{
            style: {
              color: darkMode == "white" ? "black" : "white",
              classes: {
                notchedOutline:
                  darkMode == "white" ? null : classes.notchedOutline,
              },
            },
          }}
          InputLabelProps={{
            style: {
              color: darkMode == "white" ? "black" : "white",
            },
          }}
          InputProps={{
            classes: {
              notchedOutline:
                darkMode == "white" ? null : classes.notchedOutline,
            },
          }}
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
          inputProps={{
            style: {
              color: darkMode == "white" ? "black" : "white",
              classes: {
                notchedOutline:
                  darkMode == "white" ? null : classes.notchedOutline,
              },
            },
          }}
          InputLabelProps={{
            style: {
              color: darkMode == "white" ? "black" : "white",
            },
          }}
          InputProps={{
            classes: {
              notchedOutline:
                darkMode == "white" ? null : classes.notchedOutline,
            },
          }}
        />
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "600",
          }}
        >
          <Link to="/resendemail">prześlij ponownie link aktywacyjny</Link>
          <Link to="/restartpassword">zrestartuj hasło</Link>
        </div>

        {login && password ? (
          <Button
            variant="contained"
            style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
            onClick={() => {
              loginToAccount();
            }}
          >
            Zaloguj się
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
            disabled="true"
          >
            Zaloguj się
          </Button>
        )}
      </div>
      <div />
    </Grid>
  );
}

export default Login;
