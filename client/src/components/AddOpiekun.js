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
import SearchBar from "./SearchBarNoMargin";

const useStyles = makeStyles(theme => ({
    containerMain:{
        height: "100vh",
    },
    dni:{
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    ol:{
        listStyle: "none",
    },
    dniItem:{
        display:"flex",
        alignItems:"center",
        fontSize: "20px !important",
    },
    links:{
        textDecoration: 'none', 
        color:'black',
        "&:hover": {
            color:'white',
            textDecoration: 'none', 
        },
    },
    content:{
        paddingTop: theme.spacing(2),
    },
    przerwa:{
        paddingTop: theme.spacing(2),
    },
    label:{
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1),
    },
    form:{
        paddingRight: theme.spacing(2),
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: "white !important",
      },
}));

function AddOpiekun(
    {
        idFirma,
        user,
        dane,
        addOpen,
        jakiOpiekun,
        handleClose,
        addOpiekunFirma,
        delOpiekunFirma,
        onChange,
        object,
        darkMode,
      }
) {

    const giveButton = (id, firmaId) => {
      
        return (
          <Button
          variant="contained"
            color="success"
            onClick={() => {
                addOpiekunFirma(id, firmaId);
            }}
          >
            Dodaj
          </Button>
        );
      };

      const deleteButton = (id, isOpiekun, isOpiekunZakl) => {
        return (
          <Button
          variant="contained"
            color="error"
            onClick={() => {
                delOpiekunFirma(id, isOpiekun, isOpiekunZakl);
            }}
          >
            Usuń
          </Button>
        );
      };

    const classes = useStyles();
    const {
        imie, 
        nazwisko,
        telefon,
        email,
      } = object;

    const [rola, setRola] = useState("");

    const [searchLogin, setSearchLogin] = useState("");

    const [itemOffset, setItemOffset] = useState(0);

    // console.log(dane)

    const recordsAfterFiltering = dane.filter((val) => {
        if (searchLogin == "") {
          return val;
        } else if (
          val.user?.login.toLowerCase().includes(searchLogin.toLowerCase())
          ||
          val.nazwisko?.toLowerCase().includes(searchLogin.toLowerCase())
          
        ) {
          return val;
        }
      });

      
  return (
    <Dialog open={addOpen} onClose={handleClose} fullWidth="60%"
    PaperProps={{
        style: {
          backgroundColor: darkMode == "white" ? "white" : "#242424",
          color: darkMode == "white" ? "black" : "white",
        },
      }}
      >
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        Firma: {idFirma.nazwa}
        <div>Dodawanie opiekuna </div>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon 
          style={{ color: darkMode == "white" ? "black" : "white" }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginTop: "2%" }}>
            <div>
                <Grid item xs className={classes.content}>
                    <Grid container>

                            
                        
                        <Grid item xs style={{ color: darkMode == "white" ? "black" : "white" }}>

                        <div  style={{marginBottom:"1rem", marginTop:"1rem"}}>
                            <SearchBar
                            darkMode={darkMode}
                            setSearchLogin={setSearchLogin}
                            setItemOffset={setItemOffset}
                            />
                            </div>

                        <div className={classes.przerwa}>
                        <div className={classes.przerwa} style={{marginLeft:"15px", marginBottom:"15px"}}><b>Lista opiekunów do dodania</b></div>
                            
                           </div>
                           
                            {recordsAfterFiltering.map((val) => (
                                    <Grid style={{marginBottom:"15px"}} >
                                        {( val.user?.isOpiekunZakl === 1 || val.user?.isOpiekun === 1 )  && val.user?.firmaId === null ? (
                                            <div>
                                                {dane.map((dane) => (
                                                dane.id === val.user?.daneId ? (
                                                    <div style={{display: "flex", gap: "0.4rem", alignItems: "center", justifyContent: "space-between", width: "300px"}}>
                                                        <div>{dane.imie} {dane.nazwisko}
                                                            { val.user?.isOpiekunZakl === 1 ? (
                                                                <div  style={{display: "flex", gap: "0.4rem"}}>
                                                                    <div>(Opiekun</div><div>zakładowy)</div>
                                                                </div>
                                                            ): 
                                                            <div  style={{display: "flex", gap: "0.4rem"}}>
                                                                <div>(Opiekun</div><div>uczelniany)</div>
                                                            </div>
                                                            }
                                                        </div>
                                                        <div> {giveButton(val.user?.id, idFirma.id )}</div>
                                                           
                                                        
                                                    </div>
                                                 ): null
                                                 ))}
                                             
                                            </div>
                                        ): null}
                                    </Grid>
                            ))}


                            <div>
                            <div className={classes.przerwa} style={{marginLeft:"15px", marginBottom:"15px"}}><b>Przypisani Opiekuni</b></div>
                            
                            
                            
                            {user.map((val) => (
                                    <Grid style={{marginBottom:"15px"}} >
                                        {( val.isOpiekunZakl === 1 || val.isOpiekun === 1 )  && val.firmaId === idFirma.id ? (
                                            <div>
                                                <Grid item xs = {2}>
                                                    {/* <div style={{display: "flex", gap: "0.4rem"}}>
                                                        login:<div>{val.login}</div>
                                                    </div> */}
                                                </Grid>
                                            {dane.map((daneAO) => (
                                                daneAO.id === val.daneId ? (
                                                    <div>
                                                        <Grid item xs = {2}>
                                                            <div style={{display: "flex", gap: "0.4rem",  alignItems: "center", justifyContent: "space-between", width: "300px"}}>
                                                                <div>{daneAO.imie} {daneAO.nazwisko}
                                                                    { val.isOpiekunZakl === 1 ? (
                                                                        <div  style={{display: "flex", gap: "0.4rem", }}>
                                                                            <div>(Opiekun</div><div>zakładowy)</div>
                                                                        </div>
                                                                    ): 
                                                                    <div  style={{display: "flex", gap: "0.4rem"}}>
                                                                        <div>(Opiekun</div><div>uczelniany)</div>
                                                                    </div>
                                                                    }

                                                                </div>
                                                                <div>{deleteButton(val.id, val.isOpiekun, val.isOpiekunZakl)}</div>
                                                            </div>
                                                        </Grid>
                                                    </div>
                                                ): null
                                            ))}
                                            
                                            </div>
                                        ): null}
                                    </Grid>
                            ))}
                            </div>

                            

                        </Grid>
                    </Grid>
                </Grid>

            <div/>

          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default AddOpiekun