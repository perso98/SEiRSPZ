import { React, useState } from "react";
import Axios from "axios"
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
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const useStyles = makeStyles(theme => ({
  containerMain:{
      height: "100vh",
  },

}));

function Zalacznik(
  { 
    key,
    handleEditClose,

  }
  ){

    const [zalacznik,setZalacznik]=useState("");
    const [FormStatus, setFormStatus] = useState("");

    const createZalacznik = ()=>
    {
        Axios.post("http://localhost:5000/api/createZalacznik",
        {
            zalacznik : zalacznik,

        }).then((res) => {
            if (res.data.message) {
                setFormStatus(res.data.message);
            }
          })
    }

  const classes = useStyles();

  return (
    <>
      <input type="file" id="zalacznik" name="zalacznik" onChange={(e=>{setZalacznik(e.target.value)})}/> 
      
      <Button variant="contained" onClick={createZalacznik}>Zapisz</Button><h4>{FormStatus}</h4>
    </>
  );
}

export default Zalacznik;
