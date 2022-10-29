import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../img/ans.png";
import { makeStyles } from "@mui/styles";
import { url } from "../services/Url";
import Axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Collapse, Alert, IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function ResetPassword() {
  const useStyles = makeStyles((theme) => ({
    loginForm: {
      marginTop: "10%",
      padding: "20px",
      [theme.breakpoints.down("md")]: {
        marginTop: "20%",
      },
    },
  }));
  const classes = useStyles();
  let params = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(params.token);
  const restartPassword = async () => {
    setLoading(true);
    await Axios.post(`${url}resetPasswordForUser/${token}`, {
      password: password,
      password2: password2,
    }).then((res) => {
      if (res.data.info === true) {
        setType(true);
      } else {
        setType(false);
      }
      setLoading(false);
      setLoginStatus(res.data.message);
      setOpen(true);
    });
  };

  const [open, setOpen] = useState(false);
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

        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <>
              {!type ? (
                <Alert
                  severity="error"
                  variant="filled"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="medium"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {loginStatus}
                </Alert>
              ) : (
                <Alert
                  severity="success"
                  variant="filled"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="medium"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {loginStatus}
                </Alert>
              )}
            </>
          </Collapse>
        </Box>

        <div style={{ textAlign: "center" }}>Resetowanie hasła</div>
        <TextField
          required
          name="password"
          label="Hasło:"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          margin="normal"
          type="password"
        />
        <TextField
          required
          name="password2"
          label="Powtórz hasło:"
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
          margin="normal"
          type="password"
        />
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/login">zaloguj się</Link>
          <Link to="/register">utwórz konto</Link>
        </div>
        {password && password2 ? (
          loading ? (
            <Button
              variant="contained"
              style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
              disabled="true"
            >
              <CircularProgress color="inherit" />
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
              onClick={() => {
                restartPassword();
              }}
            >
              Wyślij
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            style={{ marginTop: "20px", minHeight: "50px", fontSize: "17px" }}
            disabled="true"
          >
            Wyślij
          </Button>
        )}
      </div>
      <div />
    </Grid>
  );
}

export default ResetPassword;
