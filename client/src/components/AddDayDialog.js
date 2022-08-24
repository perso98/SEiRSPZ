import React ,{ useState, useEffect } from "react";
import { makeStyles } from '@mui/styles'
import {
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TextField } from "@material-ui/core";
import Button from "@mui/material/Button";
import { Container, Typography, Grid, Input } from '@mui/material'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from "axios"
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

function AddDayDialog({
  addOpen,
  handleAddClose,
  createDay,
  onChange,
  dayObject,
}) {


    const classes = useStyles();


    const {
        dzien,
        data,
        iloscGodzin,
        opis,
      } = dayObject;

{
  return (
    <Dialog open={addOpen} onClose={handleAddClose} fullWidth="60%">
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        Dodawanie nowego dnia
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
                                            label="Dzień"
                                            id="dzien"
                                            value={dzien}
                                            onChange={(e) => onChange(e)}
                                            sx={{ width: '8ch'}}
                                            margin="normal"
                                            />
                                        </Grid>
                                        <Grid item marginRight={1}>
                                            <TextField className={classes.TextField}
                                            label="Data"
                                            id="data"
                                            value={data}
                                            onChange={(e) => onChange(e)}
                                            size='8'
                                            sx={{ width: '15ch'}}
                                            margin="normal"
                                            />
                                        </Grid>
                                        <Grid item >
                                            <TextField className={classes.TextField}
                                            label="Ilość godzin"
                                            id="iloscGodzin"
                                            value={iloscGodzin}
                                            onChange={(e) => onChange(e)}
                                            sx={{ width: '5ch'}}
                                            margin="normal"
                                            />
                                        </Grid>
                                        
                                    </Grid>
                                    <TextField className={classes.TextField}
                                        fullWidth 
                                        label="Opis wykonanej pracy"
                                        id="opis"
                                        value={opis}
                                        onChange={(e) => onChange(e)}
                                        multiline
                                        margin="normal"
                                    />
                                </div>


                                <div>
                                    <Button variant="contained">Dodaj załącznik</Button>
                                </div>

                                {/* <Box sx={{ minWidth: 200, maxWidth: 200, paddingTop: 2 , paddingBottom: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demoSimpleSelect-label">Efekt uczenia się</InputLabel>
                                        <Select
                                        labelId="demoSimpleSelect-label"
                                        id="demoSimpleSelect"
                                        value={efekt}
                                        label="Efekt uczenia się"
                                        onChange={handleChange}
                                        >
                                        <MenuItem value={0}>-</MenuItem>
                                        {efektUczenia.map((val) => (
                                            <MenuItem value={val.efektUczeniaSieNazwa}>{val.efektUczeniaSieNazwa}</MenuItem>
                                        ))
                                        }
                                        </Select>
                                    </FormControl>
                                </Box> */}

                               
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
              onClick={createDay}
            >
              Dodaj
            </Button>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
}
export default AddDayDialog;
