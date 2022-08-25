import React ,{ useState, useEffect } from "react";
import axios from 'axios'
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
import { Container, Typography, Grid, Input } from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddDayDialog from "./AddDayDialog";
import EditDay from "./EditDay";

const useStyles = makeStyles(theme => ({
    containerMain:{
        fontSize: "12px",
        margin: "15px",
        height: "100%",
        marginBottom:"100px",
        [theme.breakpoints.up("sm")]: {
            fontSize: "15px",
          },
    },

    nowyDzienBTN:{
        marginBottom: "15px",
    },
    btnEdycja:{
        fontSize: "12px",
    }
}));

function EfektyUczeniaSie() {

    const classes = useStyles();
    
    const [dziennik, setDziennik] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/getDziennik").then((res) => {
          setDziennik(res.data);
          
        });
      }, []);

  return (
    <div>
        Lista efektów do realizacji
        <div className={classes.containerMain}>
            
            <Grid container>
                
                <Grid item xs = {2} md = {2} style={{marginRight:"3px"}}>
                    <div>
                        Nazwa 
                    </div>
                </Grid>
                <Grid item xs = {3} md = {3}>
                    <div>
                        Opis
                    </div>
                </Grid>
                <Grid item xs = {3} md = {1}>
                    <div>
                        Uzasadnienie
                    </div>
                </Grid>
            </Grid>
        </div>
    </div>
  )
}

export default EfektyUczeniaSie