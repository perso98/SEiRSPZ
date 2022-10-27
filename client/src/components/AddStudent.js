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

    label:{
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1),
    },
    form:{
        paddingRight: theme.spacing(2),
    },
}));

function AddStudent(
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
      }
) {

    const giveButton = (userId, firmaId, id ) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() => {
                addStudentFirma(userId, firmaId ,id, idOpiekuna, jakiOpiekun);
            }}
          >
            Dodaj
          </Button>
          
        );
      };

      const deleteButton = (id, userId) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
                delStudentFirma(id, userId, jakiOpiekun);
            }}
          >
            Usuń
          </Button>
        );
      };

      
    const classes = useStyles();

    const [searchLogin, setSearchLogin] = useState("");

    const [itemOffset, setItemOffset] = useState(0);

    // console.log(dane)

    const recordsAfterFiltering = user.filter((val) => {
        if (searchLogin == "") {
          return val;
        } else if (
          val.login.toLowerCase().includes(searchLogin.toLowerCase())
        //   ||
        //   val.user.nazwisko.toLowerCase().includes(searchLogin.toLowerCase())
          
        ) {
          return val;
        }
      });


  return (
    <Dialog open={addOpen} onClose={handleClose} fullWidth="60%">
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        Firma: {idFirma.nazwa}
        <div>Dodawanie studenta </div>
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
                            <div  style={{marginBottom:"1rem"}}>
                            <SearchBar
                            setSearchLogin={setSearchLogin}
                            setItemOffset={setItemOffset}
                            />
                            </div>
                            <div className={classes.przerwa} style={{marginLeft:"15px", marginBottom:"15px"}}><b>Studenci lista</b></div>
                            {recordsAfterFiltering.map((val) => (
                                    jakiOpiekun === 1 ? (
                                <Grid style={{ width: "300px"}}>
                                <div >
                                        { val.isStudent === 1 && val.id_opiekunZ === null ? (
                                            <Grid container style={{ display: "flex", justifyContent: "space-between" }} >
                                                {/* <Grid  style={{marginRight:"15px"}}
                                                xs = {2}>
                                                        login: {val.login}
                                                </Grid> */}
                                                {dane.map((daneNO) => (
                                                    daneNO.id === val.daneId ? (
                                                        <Grid style={{marginRight:"15px"}}>
                                                            <div>
                                                                    {daneNO.imie} {daneNO.nazwisko}
                                                            </div>
                                                        </Grid>
                                                    ): null
                                                ))}
                                                <Grid>
                                                    {giveButton(val.id, idFirma.id )}
                                                </Grid>
                                            </Grid>
                                        ): null}
                                    </div>
                                    </Grid>
                                    ): 
                                    <Grid style={{ width: "300px"}}>
                                    <div>
                                        { val.isStudent === 1 && val.id_opiekunU === null ? (
                                        <Grid container style={{ display: "flex", justifyContent: "space-between" }}>
                                            {/* <Grid  style={{marginRight:"15px"}}
                                            xs = {2}>
                                                    login: {val.login}
                                            </Grid> */}
                                                {dane.map((daneNO) => (
                                                daneNO.id === val.daneId ? (
                                                    <Grid style={{marginRight:"15px"}}>
                                                        <div>
                                                                {daneNO.imie} {daneNO.nazwisko}
                                                        </div>
                                                    </Grid>
                                                ): null
                                            ))}
                                            <Grid>
                                                {giveButton(val.id, idFirma.id )}
                                            </Grid>
                                        </Grid>
                                        
                                    ): null}
                                    </div>
                                    </Grid>
                            ))}
                                <div className={classes.przerwa} style={{margin:"15px"}}><b>Przypisani Studenci</b></div>
                                {user.map((val) => (
                                    <Grid style={{ width: "300px"}}>
                                        { jakiOpiekun === 1 ? (
                                            <div>
                                                { val.isStudent === 1 && val.firmaId === idFirma.id && val.id_opiekunZ === idOpiekuna  ? (
                                                    <Grid container style={{ display: "flex", justifyContent: "space-between" }}>
                                                        {/* <Grid style={{marginRight:"15px"}}
                                                        xs = {2}>
                                                                login: {val.login}
                                                        </Grid> */}
                                                        {dane.map((daneAO) => (
                                                            daneAO.id === val.daneId ? (
                                                                    <Grid
                                                                    style={{marginRight:"15px"}}>
                                                                        <div style={{ gap: "0.4rem"}}>
                                                                           {daneAO.imie} {daneAO.nazwisko}
                                                                        </div>
                                                                    </Grid>
                                                            ): null
                                                        ))}
                                                        <Grid>
                                                            {deleteButton(val.id)}
                                                        </Grid>
                                                    </Grid>
                                                ): null}
                                            </div>
                                        ): <div>
                                        { val.isStudent === 1 && val.firmaId === idFirma.id && val.id_opiekunU === idOpiekuna  ? (
                                                <Grid container style={{ display: "flex", justifyContent: "space-between" }}>
                                                    {/* <Grid
                                                    style={{marginRight:"15px"}}
                                                    xs = {2}>
                                                        login: {val.login}
                                                    </Grid> */}
                                                    {dane.map((daneAO) => (
                                                        daneAO.id === val.daneId ? (
                                                            <Grid style={{marginRight:"15px"}}>
                                                                {daneAO.imie} {daneAO.nazwisko} 
                                                            </Grid>
                                                        ): null
                                                    ))}
                                                    <Grid>
                                                        {deleteButton(val.id)}
                                                    </Grid>
                                                </Grid>
                                        ): null}
                                    </div>}
                                    </Grid>
                                ))}

                            </div>

                            <div>

                            
                            
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

export default AddStudent