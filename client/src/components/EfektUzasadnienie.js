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
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },

}));

function EfektUzasadnienie(
  { 
    open,
    handleClose,
    idUser,
    info,
    operacja,
    set,
    komentarze,
    darkMode,
  }
  ){

    const classes = useStyles();

    // const [listEfektyStudent, setListEfektyStudent] = useState([]);

  
    // useEffect(() => {
    //   console.log(info)
    //     axios.get(`${url}listEfektyStudent`,{
    //       id: info
    //     }).then((res) => {
    //         setListEfektyStudent(res.data);
    //     });

    //   }, []);

  return (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth="40%"
          style={{ fontSize: "1.2rem", color: "#403c3c" }}
          PaperProps={{
            style: {
              backgroundColor: darkMode == "white" ? "white" : "#242424",
              color: darkMode == "white" ? "black" : "white",
            },
          }}
        >
          <DialogTitle>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
            Efekt: {info.nazwa}
            <IconButton onClick={handleClose}>
              <CloseIcon style={{ color: darkMode == "white" ? "black" : "white" }}/>
            </IconButton>
            </div>
            <div>
            Opis: {info.opis}
            </div>
          </DialogTitle>
          <DialogContent>
            
            <div>
                <div>
                  <TextField className={classes.TextField}
                  label="Opis"
                  id="opis"
                  defaultValue= {komentarze}
                  onChange={(e) => {
                      set(e.target.value);
                  }}
                  multiline
                  fullWidth
                  margin="normal"
                  inputProps={{
                    style: {
                      color: darkMode == "white" ? "black" : "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: darkMode == "white" ? "black" : "white",
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline:
                        darkMode == "white" ? null : classes.notchedOutline,
                    },
                  }}
                                  />
                      
                </div>
                <div  style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                    <Button
                    variant="contained"
                    onClick={() => {
                        operacja();
                    }}
                    >
                        Zapisz 
                    </Button>

                </div>
            </div>

          </DialogContent>
        </Dialog>
  );
}

export default EfektUzasadnienie;
