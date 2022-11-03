import React, { useState, useContext } from "react";
import logo from "../../src/img/ans.png";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RegisterAlertComponent from "../components/RegisterAlertComponent";
import { url } from "../services/Url";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Axios from "axios";
import Box from "@mui/material/Box";
import { ThemeContext } from "../context/ThemeContext";
function Register() {
  const useStyles = makeStyles((theme) => ({
    registerForm: {
      paddingTop: "10%",
      padding: "20px",
      [theme.breakpoints.down("md")]: {
        paddingTop: "20%",
      },
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "white !important",
    },
  }));

  const classes = useStyles();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [alertSeverity, setalertSeverity] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode] = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  Axios.defaults.withCredentials = true;

  const createAccount = async () => {
    await Axios.post(`${url}createAccount`, {
      login: login,
      password: password,
      password2: password2,
    }).then((res) => {
      if (res.data.message) {
        setRegisterStatus(res.data.message);
        if (res.data.register) setalertSeverity(false);
        else setalertSeverity(true);
        setOpen(true);
        setLoading(false);
      }
    });
  };

  return (
    <Grid
      container
      sm={12}
      justifyContent={"space-between"}
      className={classes.registerForm}
    >
      <div />
      <div
        style={{ display: "flex", flexDirection: "column", minWidth: "250px" }}
      >
        <img src={logo} alt="Logo" style={{ marginBottom: "5%" }} />

        <RegisterAlertComponent
          registerStatus={registerStatus}
          alertSeverity={alertSeverity}
          open={open}
          setOpen={setOpen}
        />

        <TextField
          required
          name="registerLogin"
          label="E-mail:"
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
          name="registerPassword"
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
        <TextField
          required
          name="registerPassword2"
          label="Powtórz hasło:"
          onChange={(e) => {
            setPassword2(e.target.value);
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
          <Link to="/login">zaloguj się</Link>
          <Link to="/restartpassword">zrestartuj hasło</Link>
        </div>
        {loading == false ? (
          login && password && password2 ? (
            <Button
              variant="contained"
              style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
              onClick={() => {
                setLoading(true);
                createAccount();
              }}
            >
              Utwórz konto
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
              disabled="true"
            >
              Utwórz konto
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
            disabled="true"
          >
            <CircularProgress color="inherit" />
          </Button>
        )}
      </div>
      <div />
    </Grid>
  );
}

export default Register;
