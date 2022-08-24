import { React, useState } from "react";
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

function EditDay(
  { 
    editOpen,
    handleEditClose,
    editDay,
    deleteDay,
    createEditDay,
    setChangeOpis,
    setChangeDzien,
    setChangeData,
    setChangeIloscGodzin,
  }
  ){

    

  const classes = useStyles();

  return (
    <>
      {editDay && (
        <Dialog
          open={editOpen}
          onClose={handleEditClose}
          fullWidth="40%"
          style={{ fontSize: "1.2rem", color: "#403c3c" }}
        >
          <DialogTitle
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            Dzień:{editDay.dzien}
            <IconButton onClick={handleEditClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>

            <div style={{ margin: "1rem 0px 1rem 0 " }}>
              <h5>Dzień:</h5> 
              <TextField className={classes.TextField}
                label="Dzień"
                defaultValue= {editDay.dzien}
                onChange={(e) => {
                  setChangeDzien(e.target.value);
                }}
                margin="normal"
                />


              <h5>Data:</h5> 
              <TextField className={classes.TextField}
                label="Data"
                defaultValue= {editDay.data}
                onChange={(e) => {
                  setChangeData(e.target.value);
                }}
                margin="normal"
                />

              <h5>Ilość godzin:</h5> 
              <TextField className={classes.TextField}
                label="Ilość godzin"
                defaultValue= {editDay.ilosc_godzin}
                onChange={(e) => {
                  setChangeIloscGodzin(e.target.value);
                }}
                margin="normal"
                />
              <h5>Opis:</h5> 
              <TextField className={classes.TextField}
                label="Opis"
                id="opis"
                defaultValue= {editDay.opis}
                onChange={(e) => {
                  setChangeOpis(e.target.value);
                }}
                multiline
                fullWidth
                margin="normal"
                />
            </div>

            <div style={{ margin: "1rem 0px 1rem 0 " }}>
              <b>Zatwierdzenie </b>

              <h5>Opiekun uczelniany: </h5>
              {editDay.statusOpiekunaU}

              <h5>Opiekun zakładowy: </h5>
              {editDay.statusOpiekunaZ}

            </div>

            <h5>Efekty uczenia:</h5>

        <div  style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
            <Button
            variant="contained"
            style={{ marginTop: "5vh" }}
            onClick={() => {
              createEditDay(editDay.id, editDay.dzien, editDay.data, editDay.ilosc_godzin, editDay.opis);
            }}
          >
            Zmień {editDay.opis}
          </Button>

          <Button
            variant="contained"
            color="error"
            style={{ marginTop: "5vh" }}
            onClick={() => {
              deleteDay(editDay.id);
            }}
          >
            Usuń
          </Button>
          </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default EditDay;
