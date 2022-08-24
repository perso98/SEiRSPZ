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

function EditFirma(
  { 
    open,
    handleClose,
    info,
    operacja,
    onChange,
    setChange,
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
            Firma:{info.nazwa}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>

            <div style={{ margin: "1rem 0px 1rem 0 " }}>
              <TextField className={classes.TextField}
                label="Firma"
                defaultValue= {info.nazwa}
                onChange={(e) => {
                    setChange(e.target.value);
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

export default EditFirma;
