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

function EditStudent(
  { 
    open,
    handleClose,
    info,
    operacja,
    onChange,
    setChange,
    setChangeNP,
    setChangeCTP,
    setChangePO,
    setChangePD,
    setChangeDP

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
          <DialogTitle
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            Student:
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            
          </DialogTitle>
          
          <DialogContent>
          {info.imie} {info.nazwisko}
            <div style={{ margin: "1rem 0px 1rem 0 ",width: "300px", display: "flex", flexDirection: "column"}}>
              <TextField className={classes.TextField}
                label="Numer porozumienia"
                defaultValue= {info.numerPorozumienia}
                onChange={(e) => {
                    setChangeNP(e.target.value);
                }}
                margin="normal"
                />
                <TextField className={classes.TextField}
                label="Czas trwania praktyki"
                defaultValue= {info.czasTrwaniaPraktyki}
                onChange={(e) => {
                    setChangeCTP(e.target.value);
                }}
                margin="normal"
                />
                <TextField className={classes.TextField}
                label="Porozumienie Od"
                defaultValue= {info.porozumienieOd}
                onChange={(e) => {
                    setChangePO(e.target.value);
                }}
                margin="normal"
                />
                <TextField className={classes.TextField}
                label="Porozumienie Do"
                defaultValue= {info.porozumienieDo}
                onChange={(e) => {
                    setChangePD(e.target.value);
                }}
                margin="normal"
                />
                <TextField className={classes.TextField}
                label="Data Porozumienia"
                defaultValue= {info.dataPorozumienia}
                onChange={(e) => {
                    setChangeDP(e.target.value);
                }}
                margin="normal"
                />
            </div>

      

        <div  style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
            <Button
            variant="contained"
            style={{ marginTop: "5vh" }}
            onClick={() => {
                operacja(info.id, info.nazwa);
            }}
          >
            Zmień 
          </Button>

          </div>
          </DialogContent>
        </Dialog>
  );
}

export default EditStudent;
