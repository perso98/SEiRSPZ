import React,{ useState, useEffect} from 'react'
import axios, { Axios } from 'axios'
import {
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@mui/material";
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Toolbar,
    TextField,
  } from "@material-ui/core";
import {Link} from 'react-router-dom'
import Button from "@mui/material/Button";
import { Container, Typography, Grid, Input } from '@mui/material'
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "../components/SearchBarNoMargin";
import Helper from "../components/Helper";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Stack from '@mui/material/Stack';


const useStyles = makeStyles(theme => ({
    containerMain:{
        height: "100vh",
    },
}));

function SelectedFirma(
  {
    idFirma,
    user,
    dane,
    addOpen,
    idOpiekuna,
    jakiOpiekun,
    handleClose,
    addStudentFirma,
    delStudentFirma,
    onChange,
    object,
    infoOpiekun,
    darkMode,
    firma,
    back,
    handlefirmaEditOpen,
    handleAddOOpen,
    handleStudentEditOpen,
    handleAddSOpen,
  }
)
 {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log(" firma " + firma)
      setLoading(false)
    }, []);

    const setBack = () => {
      back([]);
  };


  const infomacja = (
    <div>
      <div>
        Przycisk "DODAJ ZAKŁAD" dodaje nam nowy zakład
      </div>
      <div>
        Przycisk "ZMIEŃ" zapisuje informację danego dnia, lecz ich nie wysyła. 
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
    </div>
  );

  const navbarButtonHelper =
        <div style={{ 
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          }}>
          <Button  variant="contained" onClick={setBack} style={{marginBottom: "10px"}}>
              Cofnij
          </Button>
          <Helper info={infomacja} title="Zarządanie Zakładami" napis={""} darkMode = {darkMode}/>
        </div>

      
  return (
    <div>
    <Container style={{ paddingTop: "3rem", paddingBottom: "3rem", marginBottom: "50px"}}>
      {navbarButtonHelper}
      <div
        style={{
          justifyContent: "space-around",
          display: 'flex',
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid container
            style={{
                justifyContent: "space-around",
                color: darkMode == "white" ? "black" : "white",
            }}
        >
                    <div
                    style={{
                        marginBottom:"30px",
                        backgroundImage: "linear-gradient(#073874, #042144)",
                        color: "white",
                        padding: "2rem",
                        display: "flex",
                        minWidth: "350px",
                        flexDirection: "column",
                        borderRadius: "25px",
                        boxShadow: " 0 0 5px black",
                    }}
                    >
                        <div style={{display: "flex", alignItems:"center", justifyContent: "flex-start"}}>
                            <div style={{display: "flex", marginRight:"5px"}}>
                            Firma: {firma.nazwa}
                            </div>
                            <div style={{display: "flex"}}>
                            <ModeEditIcon
                            fontSize="small"
                            onClick={()=> handlefirmaEditOpen(firma)}
                            />
                            </div>
                            
                        </div>
                        
                        <div
                        style={{ display: "flex", justifyContent: "space-between", marginBottom:"10px"}}
                        >
                            <div>
                            <h6>Opiekuni: </h6>
                            </div>
                            
                            <Button
                                onClick={() => {handleAddOOpen(firma)}}
                                variant="contained"
                                color="success"
                            >
                                Edycja Opiekunów
                            </Button>
                        </div>

                          {dane.map((val) => (
                              <Grid>
                                  {( val.user?.isOpiekunZakl === 1 || val.user?.isOpiekun === 1 )  && val.user?.firmaId === firma.id ? (
                                      <div>
                                          <div
                                          style={{ display: "flex", justifyContent: "space-between", flexDirection: "column-reverse" }}
                                          >
                                              { val.user?.isOpiekunZakl === 1 ? (
                                                  <div>
                                                      <div
                                                      style={{ display: "flex", justifyContent: "space-between" }}
                                                      >   
                                                          <Stack direction="row" spacing={1} alignItems="center">
                                                              <div 
                                                              style={{fontSize:"11px"}}
                                                              >
                                                                  (Opiekun zakładowy)
                                                              </div>
                                                          </Stack>
                                                          
                                                      </div>
                                                      <div
                                                      style={{ display: "flex", justifyContent: "space-between" }}
                                                      >
                                                      <div>
                                                              {val.imie} {val.nazwisko}
                                                      </div>
                                                      <Button
                                                          style={{ minWidth: '35px'}}
                                                          size="small"
                                                          onClick={() => {handleAddSOpen(firma, val.user.id, 1, val)}}
                                                          variant="contained"
                                                          color="success"
                                                          >
                                                          +/-
                                                          </Button>
                                                          </div>
                                                      
                                                  </div>
                                                  ): 
                                                  <div>
                                                      <div
                                                      style={{ display: "flex", justifyContent: "space-between" }}
                                                      >
                                                          <Stack direction="row" spacing={1} alignItems="center">
                                                              <div 
                                                              style={{fontSize:"11px"}}
                                                              >
                                                                  (Opiekun uczelniany)
                                                              </div>
                                                          </Stack>
                                                      </div>
                                                      <div 
                                                      style={{ display: "flex", justifyContent: "space-between" }}
                                                      >
                                                          <div>
                                                              {val.imie} {val.nazwisko}
                                                          </div>
                                                          <Button
                                                          style={{ minWidth: '35px'}}
                                                          size="small"
                                                          onClick={() => {handleAddSOpen(firma, val.user.id, 0, val)}}
                                                          variant="contained"
                                                          color="success"
                                                          >
                                                          +/-
                                                          </Button>
                                                      </div>
                                                  </div>
                                              }
                                          
                                          </div>
                                              
                                          
                                          <h6 style={{ position: "flex" }}>Studenci: </h6>
                                          
                                          <div
                                          style={{ marginLeft: "15px", marginBottom:"15px"}}
                                          >
                                              {user.map((valStudent) => (
                                                  <Grid>
                                                      {valStudent.isStudent === 1 && valStudent.firmaId === firma.id && ( valStudent.id_opiekunU === val.user?.id || valStudent.id_opiekunZ === val.user?.id) ? (
                                                          <div>
                                                          {dane.map((daneS) => (
                                                              daneS.id === valStudent.daneId ? (
                                                                  <div style={{marginBottom: "10px"}}>
                                                                              <div 
                                                                              onClick={() => {handleStudentEditOpen(daneS)}} 
                                                                              style={{
                                                                                  display: "flex", 
                                                                                  gap: "0.4rem", 
                                                                                  color: daneS.numerPorozumienia === null ? (
                                                                                      "red"
                                                                                      ): "green"

                                                                                  }}>
                                                                                  <div>{daneS.imie}</div>
                                                                                  {daneS.nazwisko} <div>Indeks: {daneS.indeks}</div>
                                                                              </div>
                                                                  </div>
                                                              ): null
                                                          ))}
                                                          </div>
                                                      ): null}
                                                  </Grid>
                                              ))}
                                          </div>
                                      </div>
                                  ): null}
                              </Grid>
                          ))}
                        
                    </div>
        </Grid>
      </div>
      </Container>
      
    </div>
  );
}

export default SelectedFirma