import React, { useState } from "react";
import logo from "../../src/img/ans.png";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RegisterAlertComponent from "../components/RegisterAlertComponent";
import { url } from "../services/Url";
import CircularProgress from "@mui/material/CircularProgress";
import Axios from "axios";
import Box from "@mui/material/Box";
function Register() {
  const useStyles = makeStyles((theme) => ({
    registerForm: {
      marginTop: "10%",
      padding: "20px",
      [theme.breakpoints.down("md")]: {
        marginTop: "20%",
      },
    },
  }));

  const classes = useStyles();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [alertSeverity, setalertSeverity] = useState("");
  const [loading, setLoading] = useState(false);

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
        />

        {loading == false ? (
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
            <CircularProgress color="inherit" />
          </Button>
        )}
      </div>
      <div />
    </Grid>
  );
}

export default Register;
