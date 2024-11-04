import { React, useState, useEffect } from "react";
import axios from 'axios'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, TextField } from "@mui/material";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { url } from "../services/Url";

const useStyles = makeStyles(theme => ({
  containerMain:{
      height: "100vh",
  },

}));

function DodanieEfektuDialog(
  { 
    open,
    handleClose,
    info,
    setNazwaSpecjalnosci,
    setSkrotSpecjalnosci,
    dodanieSpecjalnosci,
    val,
  }
  ){

    const classes = useStyles();



  return (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth="40%"
          style={{ fontSize: "1.2rem", color: "#403c3c" }}
        >
          <DialogTitle>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
            Dodaj efekt
            
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            </div>
            <div style={{ fontSize: "1.2rem", color: "#403c3c" }}>
            Specjalność: {info.nazwa}
            </div>
          </DialogTitle>
          <DialogContent>
            
            <div >
                <div style={{ display: "flex", flexDirection: "column"}}>
                    <TextField
                        style={{ margin: "10px"}}
                        label="Nazwa Efektu"
                        id="specjalności"
                        multiline
                        onChange={(e) => {
                            setNazwaSpecjalnosci(e.target.value);
                        }}
                    />
                    <TextField
                        style={{ margin: "10px"}}
                        label="Opis"
                        id="Ssrot"
                        multiline
                        onChange={(e) => {
                            setSkrotSpecjalnosci(e.target.value);
                        }}
                    />
                </div> 
                <Button 
                variant="contained" 
                onClick={() => {
                    dodanieSpecjalnosci(val.id);
                }} 
                >
                    Zapisz
                </Button>
            </div>

          </DialogContent>
        </Dialog>
  );
}

export default DodanieEfektuDialog;
