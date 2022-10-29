import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../img/ans.png";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { url } from "../services/Url";
import Axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Collapse, Alert, IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function EmailPasswordReset() {
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
  const [email, setEmail] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const resendEmail = async () => {
    setLoading(true);
    await Axios.post(`${url}resetPassword`, {
      email: email,
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
        <div style={{ textAlign: "center", margin: "1rem" }}>
          Wpisz swój e-mail, aby zrestartować hasło
        </div>
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

        <TextField
          required
          name="email"
          label="E-mail:"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          margin="normal"
          type="email"
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
        {email ? (
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
                resendEmail();
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

export default EmailPasswordReset;
