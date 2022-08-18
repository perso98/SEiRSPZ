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
            onClick={() => {
                addOpiekunFirma(id, firmaId);
            }}
          >
            Dodaj
          </Button>
        );
      };

      const deleteButton = (id, firmaId) => {
        return (
          <Button
            onClick={() => {
                delOpiekunFirma(id, firmaId);
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
                                    <Grid>
                                        {( val.isOpiekunZakl === 1 || val.isOpiekun === 1 )  && val.firmaId === idFirma.id ? (
                                            <div>
                                                <Grid item xs = {2}>
                                                    <div style={{display: "flex", gap: "0.4rem"}}>
                                                        login:<div>{val.login}</div>
                                                    </div>
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
                                                {deleteButton(val.id, idFirma.id )}
                                            </Grid>
                                            </div>
                                        ): null}
                                    </Grid>
                            ))}
                            </div>

                            <div>
                            <div className={classes.przerwa}>Opiekuni lista</div>
                            {user.map((val) => (
                                    <Grid>
                                        {( val.isOpiekunZakl === 1 || val.isOpiekun === 1 )  && val.firmaId === null ? (
                                            <div>
                                                <Grid item xs = {2}>
                                                    <div style={{display: "flex", gap: "0.4rem"}}>
                                                        login:<div>{val.login}</div>
                                                    </div>
                                                </Grid>
                                            {dane.map((daneNO) => (
                                                daneNO.id === val.daneId ? (
                                                    <div>
                                                        
                                                        <Grid item xs = {2}>
                                                            <div style={{display: "flex", gap: "0.4rem"}}>
                                                                imie:<div>{daneNO.imie}</div>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs = {2}>
                                                            <div style={{display: "flex", gap: "0.4rem"}}>
                                                                naziwkso:<div>{daneNO.nazwisko}</div>
                                                            </div>
                                                        </Grid>
                                                       
                                                    </div>
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