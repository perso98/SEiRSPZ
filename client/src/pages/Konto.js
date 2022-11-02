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
import { url } from "../services/Url";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Konto(props) {
  const useStyles = makeStyles((theme) => ({
    center: {
      justifyContent: "space-around",
    },
    changePasswordForm: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "5%",
      paddingRight: "5%",
      paddingBottom: "5%",
      minWidth: "600px",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        minWidth: "400px",
      },
    },
    daneForm: {
      display: "flex",
      flexDirection: "column",
      padding: "5%",
      minWidth: "600px",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        minWidth: "400px",
      },
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "white !important",
    },
  }));

  const [listaKierunkow, setListaKierunkow] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${url}getListaKierunkow`).then((res) => {
      setListaKierunkow(res.data);
    });

    Axios.get(`${url}getUserSesionId`).then((res) => {
      setUser(res.data);
      setLoading(false);
      setImie(res.data.imie);
      setNazwisko(res.data.nazwisko);
      setStudia(res.data.studia);
      setKierunek(res.data.kierunek);
      setSpecjalnosc(res.data.specjalnosc);
      setRokStudiow(res.data.rok_studiow);
      setRodzajStudiow(res.data.rodzaj_studiow);
      setTelefon(res.data.telefon);
    });
  }, []);

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
        if (res.data.message === "Pomyślnie zmieniono hasło do konta")
          setalertSeverity(false);
        else setalertSeverity(true);
        setOpen(true);
      }
    });
  };

  const [imie, setImie] = useState(null);
  const [nazwisko, setNazwisko] = useState(null);
  const [studia, setStudia] = useState(null);
  const [specjalnosc, setSpecjalnosc] = useState(null);
  const [rokStudiow, setRokStudiow] = useState(null);
  const [rodzajStudiow, setRodzajStudiow] = useState(null);
  const [telefon, setTelefon] = useState(null);
  const [kierunek, setKierunek] = useState(null);

  const [changeDaneStatus, setChangeDaneStatus] = useState("");

  const handleChangeSpecjalnosc = (event) => {
    setSpecjalnosc(event.target.value);
  };

  const handleChangeKierunek = (event) => {
    setKierunek(event.target.value);
    setSpecjalnosc()
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
        if (res.data.message === "Pomyślnie zmieniono dane do konta")
          setalertSeverity(false);
        else setalertSeverity(true);
        setOpen(true);
      }
    });
  };

  const classes = useStyles();
  return (
    <Grid
      style={{
        backgroundColor: props.darkMode == "white" ? "white" : "#242424",
      }}
    >
      {loading === false ? (
        <Grid container sm={12} className={classes.center}>
          <div className={classes.daneForm}>
            <Typography
              variant="h4"
              color="initial"
              style={{ color: props.darkMode == "white" ? "black" : "white" }}
            >
              {" "}
              Wprowadź swoje dane
            </Typography>
            {changeDaneStatus !== "" && (
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
              defaultValue={user.imie}
              margin="normal"
              inputProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      props.darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    props.darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
              onChange={(e) => {
                setImie(e.target.value);
              }}
            />

            <TextField
              className={classes.TextField}
              label="Nazwisko"
              id="nazwisko"
              defaultValue={user.nazwisko}
              margin="normal"
              inputProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      props.darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    props.darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
              onChange={(e) => {
                setNazwisko(e.target.value);
              }}
            />
            <TextField
              className={classes.TextField}
              label="Studia"
              id="studia"
              defaultValue={user.studia}
              inputProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      props.darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    props.darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
              onChange={(e) => {
                setStudia(e.target.value);
              }}
              margin="normal"
            />

            {/* <Box style={{ paddingTop: "3%", paddingBottom:" 1%" }}>
              <FormControl fullWidth>
                <InputLabel id="select-Kierunek-label">Kierunek</InputLabel>
            <TextField
              className={classes.TextField}
              label="Kierunek"
              id="kierunek"
              defaultValue={user.kierunek}
              margin="normal"
              inputProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      props.darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    props.darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
              onChange={(e) => {
                setKierunek(e.target.value);
              }}
            /> */}
            <Box style={{ paddingTop: "3%", paddingBottom: " 1%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Specjalność
                </InputLabel>
                <Select
                  labelId="select-Kierunek-label"
                  id="select-Kierunek"
                  defaultValue={user.kierunek}
                  label="Kierunek"
                  onChange={handleChangeKierunek}
                >
                  <MenuItem>-</MenuItem>
                  {listaKierunkow.map((val) => (
                    <MenuItem value={val.nazwa}>{val.nazwa}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box style={{ paddingTop: "3%", paddingBottom:" 1%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Specjalność</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={user.specjalnosc}
                  label="specjalnosc"
                  onChange={handleChangeSpecjalnosc}
                >
                  <MenuItem>-</MenuItem>
                  {listaKierunkow.map((valKierunek)=> (
                      valKierunek.nazwa === kierunek ? (  
                          valKierunek.listaSpecjalnoscis.map((val)=> ( 
                            <MenuItem value={val.id}>{val.nazwa}</MenuItem>
                          ))
                      ): null
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TextField
              className={classes.TextField}
              label="Rok studiow"
              id="rok_studiow"
              defaultValue={user.rok_studiow}
              margin="normal"
              inputProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      props.darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    props.darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
              onChange={(e) => {
                setRokStudiow(e.target.value);
              }}
            />
            <TextField
              className={classes.TextField}
              label="Rodzaj studiow"
              id="rodzaj_studiow"
              defaultValue={user.rodzaj_studiow}
              margin="normal"
              inputProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      props.darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    props.darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
              onChange={(e) => {
                setRodzajStudiow(e.target.value);
              }}
            />
            <TextField
              className={classes.TextField}
              label="Telefon"
              id="telefon"
              defaultValue={user.telefon}
              margin="normal"
              inputProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      props.darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: props.darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    props.darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
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
      ) : null}

      <Grid container sm={12} className={classes.center}>
        <div />

        <div className={classes.changePasswordForm}>
          <Typography
            variant="h4"
            color="initial"
            style={{ color: props.darkMode == "white" ? "black" : "white" }}
          >
            {" "}
            Zmiana hasła
          </Typography>
          {changePasswordStatus !== "" && (
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
            inputProps={{
              style: {
                color: props.darkMode == "white" ? "black" : "white",
                classes: {
                  notchedOutline:
                    props.darkMode == "white" ? null : classes.notchedOutline,
                },
              },
            }}
            InputLabelProps={{
              style: {
                color: props.darkMode == "white" ? "black" : "white",
              },
            }}
            InputProps={{
              classes: {
                notchedOutline:
                  props.darkMode == "white" ? null : classes.notchedOutline,
              },
            }}
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
            inputProps={{
              style: {
                color: props.darkMode == "white" ? "black" : "white",
                classes: {
                  notchedOutline:
                    props.darkMode == "white" ? null : classes.notchedOutline,
                },
              },
            }}
            InputLabelProps={{
              style: {
                color: props.darkMode == "white" ? "black" : "white",
              },
            }}
            InputProps={{
              classes: {
                notchedOutline:
                  props.darkMode == "white" ? null : classes.notchedOutline,
              },
            }}
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
    </Grid>
  );
}

export default Konto;
