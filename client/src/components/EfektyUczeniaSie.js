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
import EfektUzasadnienie from "./EfektUzasadnienie";


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
    
    const [listaEfektyow, setlistaEfektyow] = useState([]);
    const [idUser, setIdUser] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/getEfektUczenia").then((res) => {
            setlistaEfektyow(res.data);
          
        });
        axios.get("http://localhost:5000/api/IdUser").then((res) => {
            setIdUser(res.data);
          
        });
      }, []);


    const [efektId, setEfektId] = useState();

    const [efekt, setEfekt] = useState([]);

    const[komentarz, setKomentarz] = useState([]);

    const hoverClose = () => {
        setEfektId()
    };
    const hoverOpen = (val) => {
        setEfektId(val.id)
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
        setKomentarz()
    };
    const handleOpen = (val) => {
        setOpen(true)
        setEfekt(val)
    };

    const createUzasadnienieEfektu = (id) => {
    axios.put("http://localhost:5000/api/createUzasadnienieEfektu", {
        id: id,
        komentarz: komentarz,
        })
    };

    const updateUzasadnienieEfektu = (id) => {
        axios.put("http://localhost:5000/api/updateUzasadnienieEfektu", {
            id: id,
            komentarz: komentarz,
            })
        };

        

  return (
    <div>
        <EfektUzasadnienie
                open={open}
                handleClose={handleClose}
                idUser={idUser}
                info={efekt}
                operacja={createUzasadnienieEfektu}
                update={updateUzasadnienieEfektu}
                set={setKomentarz}
            />
        Lista efektów do realizacji
        <div className={classes.containerMain}>
            
            <Grid container style={{marginBottom:"10px"}}>
                <Grid item xs = {4} md = {8}>
                    <div>
                        Nazwa efektu
                    </div>
                </Grid>
                <Grid item xs = {1} md = {1}>
                    <div>
                        Uzasadnienie
                    </div>
                </Grid>
            </Grid>

            {listaEfektyow.map((val) => (
                    <Grid container onMouseLeave={() => hoverClose()}>
                        <Grid item xs = {4} md = {8} style={{marginBottom:"15px"}}>
                            <div 
                                onMouseEnter={() => hoverOpen(val)}
                            >
                            {val.nazwa}
                            
                            {efektId === val.id ? (
                                <div >
                                    {val.opis}
                                </div>
                            ): null}
                            </div>
                        </Grid>
                        
                        <Grid item xs = {2} md = {1}>
                            <div>
                            <Button className={classes.btnEdycja} 
                                variant="contained" 
                                onClick={() => { handleOpen(val)}}
                            >
                                Uzasadnij
                            </Button>
                            </div>
                        </Grid>
                    </Grid>
            ))}



        </div>
    </div>
  )
}

export default EfektyUczeniaSie