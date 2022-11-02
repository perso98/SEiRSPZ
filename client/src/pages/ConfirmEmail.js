import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { url } from "../services/Url";
import { Button, Grid, TextField } from "@mui/material";
import { Box, Collapse, Alert, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../img/ans.png";
import { ThemeContext } from "../context/ThemeContext";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
function ConfirmEmail() {
  const useStyles = makeStyles((theme) => ({
    loginForm: {
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
  let params = useParams();
  const token = params.token;
  axios.defaults.withCredentials = true;
  const [info, setInfo] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [darkMode] = useContext(ThemeContext);
  useEffect(() => {
    axios.get(`${url}confirmMail/${token}`).then((res) => {
      setMessage(res.data.message);
      setInfo(res.data.info);
      setOpen(true);
    });
  }, []);
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
        <div
          style={{
            textAlign: "center",
            margin: "1rem",
            color: darkMode == "white" ? "black" : "white",
          }}
        >
          Potwierdzenie konta
        </div>
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <>
              {!info ? (
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
                  {message}
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
                  {message}
                </Alert>
              )}
            </>
          </Collapse>
        </Box>
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "600",
          }}
        >
          <Button variant="contained" style={{ marginRight: "1rem" }}>
            <Link
              to="/login "
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              zaloguj się
            </Link>
          </Button>
          <Button variant="contained">
            <Link
              to="/resendemail"
              style={{ color: "white", textDecoration: "none" }}
            >
              prześlij ponownie link aktywacyjny
            </Link>
          </Button>
        </div>
      </div>
      <div />
    </Grid>
  );
}

export default ConfirmEmail;
