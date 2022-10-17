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
  return (
    <Dialog open={addOpen} onClose={handleClose} fullWidth="60%">
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        Firma: {idFirma.nazwa}
        <div>Dodawanie opiekuna </div>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginTop: "2%" }}>
            <div>
                <Grid item xs className={classes.content}>
                    <Grid container>
                        
                        <Grid item xs >
                            <div>
                            Przypisani Opiekuni<p></p>
                            Imie i naziwkso: 
                            
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
                                                            <div style={{display: "flex", gap: "0.4rem"}}>
                                                                <div>{daneAO.imie}</div><div>{daneAO.nazwisko}</div>
                                                                <div>
                                                                    { val.isOpiekunZakl === 1 ? (
                                                                        <div  style={{display: "flex", gap: "0.4rem"}}>
                                                                            <div>(Opiekun</div><div>zakładowy)</div>
                                                                        </div>
                                                                    ): 
                                                                    <div  style={{display: "flex", gap: "0.4rem"}}>
                                                                        <div>(Opiekun</div><div>uczelniany)</div>
                                                                    </div>
                                                                    }

                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </div>
                                                ): null
                                            ))}
                                            <Grid item xs = {2}>
                                                {deleteButton(val.id, val.isOpiekun, val.isOpiekunZakl)}
                                            </Grid>
                                            </div>
                                        ): null}
                                    </Grid>
                            ))}
                            </div>

                            <div>
                            <div className={classes.przerwa}>
                            Opiekuni lista<p></p>
                            Imie i naziwkso: <p></p>
                           </div>
                            {user.map((val) => (
                                    <Grid style={{marginBottom:"15px"}} >
                                        {( val.isOpiekunZakl === 1 || val.isOpiekun === 1 )  && val.firmaId === null ? (
                                            <div>
                                                {dane.map((dane) => (
                                                dane.id === val.daneId ? (
                                                <Grid item xs = {2}>
                                                    <div style={{display: "flex", gap: "0.4rem"}}>
                                                        <div>{dane.imie}</div><div>{dane.nazwisko}</div>
                                                        <div>
                                                            { val.isOpiekunZakl === 1 ? (
                                                                <div  style={{display: "flex", gap: "0.4rem"}}>
                                                                    <div>(Opiekun</div><div>zakładowy)</div>
                                                                </div>
                                                            ): 
                                                            <div  style={{display: "flex", gap: "0.4rem"}}>
                                                                <div>(Opiekun</div><div>uczelniany)</div>
                                                            </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </Grid>
                                                 ): null
                                                 ))}
                                             <Grid item xs = {2}>
                                                {giveButton(val.id, idFirma.id )}
                                            </Grid>
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