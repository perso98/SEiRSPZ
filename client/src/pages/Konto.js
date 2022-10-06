import { React, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Axios from "axios";
import {
  Button,
  Grid,
  TextField,
  Box,
  Alert,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Form from "./Form";
import { url } from "../services/Url";

function Konto() {
  const useStyles = makeStyles((theme) => ({
    center: {
      justifyContent: "space-around",
    },
    changePasswordForm: {
      display: "flex",
      flexDirection: "column",
      padding: "5%",
      minWidth: "600px",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        minWidth: "400px",
      },
    },
    daneForm: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: "5%",
      paddingLeft: "5%",
      paddingRight: "5%",
      minWidth: "600px",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        minWidth: "400px",
      },
    },
  }));
  Axios.defaults.withCredentials = true;
  const [open, setOpen] = useState(false);
  const [changePassword, getChangePassword] = useState("");
  const [changePassword2, getChangePassword2] = useState("");
  const [changePasswordStatus, setChangePasswordStatus] = useState("");
  const [alertSeverity, setalertSeverity] = useState("");

  const changePasswordToAccount = () => {
    Axios.post(`${url}changePasswordToAccount`, {
      changePassword: changePassword,
      changePassword2: changePassword2,
    }).then((res) => {
      if (res.data.message) {
        setChangePasswordStatus(res.data.message);
        if (res.data.message == "Pomyślnie zmieniono hasło do konta")
          setalertSeverity(false);
        else setalertSeverity(true);
        setOpen(true);
      }
    });
  };

  const classes = useStyles();
  return (
    <Grid>
      <Grid container sm={12} className={classes.center}>
        <div />

        <div className={classes.changePasswordForm}>
          <Typography
            variant="h4"
            color="initial"
            style={{ paddingBottom: "5%" }}
          >
            {" "}
            Zmiana hasła
          </Typography>
          {changePasswordStatus != "" && (
            <Box sx={{ width: "100%" }}>
              <Collapse in={open}>
                <>
                  {alertSeverity ? (
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
                      {changePasswordStatus}
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
                      {changePasswordStatus}
                    </Alert>
                  )}
                </>
              </Collapse>
            </Box>
          )}

          <TextField
            required
            id="changePassword"
            label="Podaj hasło:"
            margin="normal"
            type="password"
            onChange={(e) => {
              getChangePassword(e.target.value);
            }}
          />
          <TextField
            type="password"
            required
            id="changePassword2"
            label="Powtórz hasło:"
            margin="normal"
            onChange={(e) => {
              getChangePassword2(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={changePasswordToAccount}
            style={{ marginTop: "20px", minHeight: "50px", fontSize: "15px" }}
          >
            Zmień hasło
          </Button>
        </div>

        <div />
      </Grid>
      <Grid container sm={12} className={classes.center}>
        <div className={classes.daneForm}>
          <Typography
            variant="h4"
            color="initial"
            style={{ paddingBottom: "5%" }}
          >
            {" "}
            Wprowadź swoje dane
          </Typography>
          <TextField
            className={classes.TextField}
            label="Imie"
            id="dzien"
            margin="normal"
          />
          <TextField
            className={classes.TextField}
            label="Nazwisko"
            id="dzien"
            margin="normal"
          />
          <TextField
            className={classes.TextField}
            label="Studia"
            id="dzien"
            margin="normal"
          />
          <TextField
            className={classes.TextField}
            label="Kierunek"
            id="dzien"
            margin="normal"
          />
          <TextField
            className={classes.TextField}
            label="Specjalność"
            id="dzien"
            margin="normal"
          />
          <TextField
            className={classes.TextField}
            label="Rok studiow"
            id="dzien"
            margin="normal"
          />
          <TextField
            className={classes.TextField}
            label="Rodzaj studiow "
            id="dzien"
            margin="normal"
          />
          <TextField
            className={classes.TextField}
            label="Telefon"
            id="dzien"
            margin="normal"
          />

          <Button
            variant="contained"
            style={{ marginTop: "20px", minHeight: "50px", fontSize: "15px" }}
          >
            Zapisz
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default Konto;
