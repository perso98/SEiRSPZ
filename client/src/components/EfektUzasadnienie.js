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

const useStyles = makeStyles(theme => ({
  containerMain:{
      height: "100vh",
  },

}));

function EfektUzasadnienie(
  { 
    open,
    handleClose,
    idUser,
    info,
    operacja,
    update,
    set,
  }
  ){

    const classes = useStyles();

    const [listEfektyStudent, setListEfektyStudent] = useState([]);

    const [updateOrSave, setUpdateOrSave] = useState(false);


    const updateOrSave2 = true;


    useEffect(() => {
        axios.get("http://localhost:5000/api/listEfektyStudent").then((res) => {
            setListEfektyStudent(res.data);
          
        });
      }, []);

    

    const UpdateSave = listEfektyStudent.map((val) => (
            (val.efektyListumId === info.id ? (
                val.id
            ):null
    )))

    // const Update = <div>
    //                     <div>
    //                     <TextField className={classes.TextField}
    //                         label="Opis"
    //                         id="opis"
    //                         onChange={(e) => {
    //                             set(e.target.value);
    //                         }}
    //                         multiline
    //                         fullWidth
    //                         margin="normal"
    //                         />
    //                     </div>
    //                     <div  style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
    //                         <Button
    //                         variant="contained"
    //                         onClick={() => {
    //                             update(info.id);
    //                         }}
    //                         >
    //                             Update 
    //                         </Button>

    //                     </div>
    //                 </div>


    const Zapisz = <div>
                        <div>
                        <TextField className={classes.TextField}
                            label="Opis"
                            id="opis"
                            onChange={(e) => {
                                set(e.target.value);
                            }}
                            multiline
                            fullWidth
                            margin="normal"
                            />
                        </div>
                        <div  style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                            <Button
                            variant="contained"
                            onClick={() => {
                                operacja(info.id);
                            }}
                            >
                                Zapisz 
                            </Button>

                        </div>
                    </div>


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
            Efekt:{info.nazwa}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div>
            {listEfektyStudent.map((val) => (
                <div>
                    {(val.efektyListumId === info.id) ? (
                        <div>
                            <div>
                            <TextField className={classes.TextField}
                                label="Opis"
                                id="opis"
                                defaultValue= {val.komentarz}
                                onChange={(e) => {
                                    set(e.target.value);
                                }}
                                multiline
                                fullWidth
                                margin="normal"
                                />
                            </div>
                            <div  style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                                <Button
                                variant="contained"
                                onClick={() => {
                                    update(info.id);
                                }}
                                >
                                    Update 
                                </Button>

                            </div>
                        </div>
                    ): null}
                </div>
            ))}

                {/* <div>
                    {updateOrSave2 === true ? (
                        <div>
                            {Zapisz}
                        </div>
                    ): null}
                
                </div> */}
            </div>

          </DialogContent>
        </Dialog>
  );
}

export default EfektUzasadnienie;
