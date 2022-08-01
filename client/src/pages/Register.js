import React, { useState } from "react";
import logo from "../../src/img/ans.png";
import { Button, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RegisterAlertComponent from "../components/RegisterAlertComponent";
import { createAccount } from "../services/UserService";
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
  const [registerLogin, setLogin] = useState("");
  const [registerPassword, setPassword] = useState("");
  const [registerPassword2, setPassword2] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [alertSeverity, setalertSeverity] = useState("");

  const [open, setOpen] = useState(false);

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
          label="Login:"
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

        <Button
          variant="contained"
          style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
          onClick={() => {
            createAccount(
              registerLogin,
              registerPassword,
              registerPassword2,
              setRegisterStatus,
              setalertSeverity,
              setOpen
            );
          }}
        >
          Utwórz konto
        </Button>
      </div>
      <div />
    </Grid>
  );
}

export default Register;
