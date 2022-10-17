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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

  const [listaKierunkow, setListaKierunkow] = useState([]);

  useEffect(() => {
    Axios.get(`${url}getListaKierunkow`).then((res) => {
      setListaKierunkow(res.data);
    });

  }, []);

console.log(listaKierunkow)
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

  const [imie, setImie] = useState(null);
  const [nazwisko, setNazwisko] = useState(null);
  const [studia, setStudia] = useState(null);
  // const [kierunek, setKierunek] = useState(null);
  const [specjalnosc, setSpecjalnosc] = useState(null);
  const [rokStudiow, setRokStudiow] = useState(null);
  const [rodzajStudiow, setRodzajStudiow] = useState(null);
  const [telefon, setTelefon] = useState(null);

  const [kierunek, setKierunek] = useState(null);

  const [changeDaneStatus, setChangeDaneStatus] = useState("");

  const handleChange = (event) => {
    setSpecjalnosc(event.target.value);
  };

  const changeDaneToAccount = () => {
    Axios.post(`${url}changeDaneToAccount`, {
      imie: imie,
      nazwisko: nazwisko,
      studia: studia,
      kierunek: kierunek, 
      specjalnosc: specjalnosc, 
      rokStudiow: rokStudiow, 
      rodzajStudiow: rodzajStudiow, 
      telefon: telefon, 

    }).then((res) => {
      if (res.data.message) {
        setChangeDaneStatus(res.data.message);
        if (res.data.message == "Pomyślnie zmieniono dane do konta")
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
          {changeDaneStatus != "" && (
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
                      {changeDaneStatus}
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
                      {changeDaneStatus}
                    </Alert>
                  )}
                </>
              </Collapse>
            </Box>
          )}
          <TextField
            className={classes.TextField}
            label="Imie"
            id="imie"
            margin="normal"
            onChange={(e) => {
              setImie(e.target.value);
            }}
          />
          <TextField
            className={classes.TextField}
            label="Nazwisko"
            id="nazwisko"
            margin="normal"
            onChange={(e) => {
              setNazwisko(e.target.value);
            }}
          />
          <TextField
            className={classes.TextField}
            label="Studia"
            id="studia"
            margin="normal"
          />
          <TextField
            className={classes.TextField}
            label="Kierunek"
            id="kierunek"
            margin="normal"
            onChange={(e) => {
              setSpecjalnosc(e.target.value);
            }}
          />
          <Box style={{ paddingTop: "3%", paddingBottom:" 1%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Specjalność</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={specjalnosc}
                label="specjalnosc"
                onChange={handleChange}
              >
                <MenuItem>-</MenuItem>
                {listaKierunkow.map((val)=> (
                  <MenuItem value={val.nazwa}>{val.nazwa}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            className={classes.TextField}
            label="Rok studiow"
            id="rok_studiow"
            margin="normal"
            onChange={(e) => {
              setRokStudiow(e.target.value);
            }}
          />
          <TextField
            className={classes.TextField}
            label="Rodzaj studiow"
            id="rodzaj_studiow"
            margin="normal"
            onChange={(e) => {
              setRodzajStudiow(e.target.value);
            }}
          />
          <TextField
            className={classes.TextField}
            label="Telefon"
            id="telefon"
            margin="normal"
            onChange={(e) => {
              setTelefon(e.target.value);
            }}
          />

          <Button
            variant="contained"
            style={{ marginTop: "20px", minHeight: "50px", fontSize: "15px" }}
            onClick={changeDaneToAccount}
          >
            Zapisz
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default Konto;
