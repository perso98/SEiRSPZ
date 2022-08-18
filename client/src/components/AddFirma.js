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

    label:{
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1),
    },
    form:{
        paddingRight: theme.spacing(2),
    },
}));

function AddFirma(
    {
        addOpen,
        handleAddClose,
        createFirma,
        onChange,
        firmaObject,
      }
) {

    const classes = useStyles();

    const {
        nazwa, 
        opis,
      } = firmaObject;

  return (
    <Dialog open={addOpen} onClose={handleAddClose} fullWidth="60%">
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        Dodawanie nowego zakładu
        <IconButton aria-label="close" onClick={handleAddClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginTop: "2%" }}>
            <div>
                <Grid item xs className={classes.content}>
                    <Grid container>
                        <Grid item xs>
                            <form className={classes.form}>
                                <div>
                                    <Grid container>
                                        <Grid item marginRight={1}>
                                        <TextField className={classes.TextField}
                                            label="Nazwa Zakładu"
                                            id="nazwa"
                                            value={nazwa}
                                            onChange={(e) => onChange(e)}
                                            sx={{ width: '8ch'}}
                                            margin="normal"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <TextField className={classes.TextField}
                                        fullWidth 
                                        label="Opis"
                                        id="opis"
                                        value={opis}
                                        onChange={(e) => onChange(e)}
                                        multiline
                                        margin="normal"
                                    />
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            <div/>
            <Button
              variant="contained"
              style={{ marginTop: "4%" }}
              onClick={createFirma}
            >
              Dodaj
            </Button>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default AddFirma