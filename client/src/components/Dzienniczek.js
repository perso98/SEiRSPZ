import React ,{ useState, useEffect } from "react";
import axios, * as others from "axios";
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
        margin: "15px",
        height: "100%",
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
    nowyDzienBTN:{
        marginBottom: "15px",
    }
}));

function Dzienniczek() {

    const [dziennik, setDziennik] = useState([]);
    const [efektUczenia, setEfektUczenia] = useState([]);
    
    const [open,setOpen] = useState(false)
    const [checkDay,setCheckDay] = useState(null)
    const handleClose = () =>{
        setOpen(false)
    }

    const handleOpen=(val)=>{
      setCheckDay(val)
      setOpen(true)
    }

    const classes = useStyles();
    
    const [addOpen, setAddOpen] = useState(false);

    const handleAddClose = () => {
        setAddOpen(false);
    };
    const handleAddOpen = () => {
        axios.get("http://localhost:5000/api/getEfektUczenia").then((res) => {
              setEfektUczenia(res.data);
            });
        setAddOpen(true);
    };
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("http://localhost:5000/api/getDziennik").then((res) => {
          setDziennik(res.data);
          
        });
      }, []);

    const [dayObject,setDayObject] = useState({
        userId:"",  
        dzien:"",
        data:"",
        iloscGodzin:"",
        opis:"",
        demoSimpleSelect:"",
        age:""
    })

    const onChange=(e)=>{
        const {value,id}=e.target
        setDayObject({...dayObject,[id]:value})
      }

    const createDay = () => {
        axios
          .post("http://localhost:5000/api/createDay", {
          dayObject:dayObject
          })
          .then((res) => {
            if (res.data.message == "Konto zostało pomyślnie utworzone") {
              setDziennik([
                ...dziennik,
                {
                  id:res.data.id,
                  userId: dayObject.login,
                  dzien: dayObject.dzien,
                  data:dayObject.data,
                  ilosc_godzin:dayObject.iloscGodzin,
                  opis:dayObject.opis,
                  efekt_uczenia:dayObject.age,

                },
              ]);
              setDayObject({...dayObject,
                userId:"",  
                dzien:"",
                data:"",
                iloscGodzin:"",
                opis:"",
                demoSimpleSelect:"",
              })
            }
     
            alert(res.data.message);
          });
      };

  return (
    
    <div className={classes.containerMain}>
        <div className={classes.nowyDzienBTN}>
        <Button  variant="contained" onClick={handleAddOpen}>
          Dodaj nowy dzień
        </Button>
        </div>
        
        <Grid >
                <Grid container>
                    <Grid item xs = {1}>
                        <div>
                            Dzień
                        </div>
                    </Grid>
                    <Grid item xs = {1}>
                        <div>
                            Data
                        </div>
                    </Grid>
                    <Grid item xs = {2}>
                        <div>
                            Status Opiekuna Uczelnianego
                        </div>
                    </Grid>
                    <Grid item xs = {2}>
                        <div>
                            Status Opiekuna Zakładowego
                        </div>
                    </Grid>
                    <Grid item xs = {1}>
                        <div>
                            Opis
                        </div>
                    </Grid>
                </Grid>

            {dziennik.map((val) => (
                <Grid container>
                    <Grid item xs = {1}>
                        <div>
                            {val.dzien}
                        </div>
                    </Grid>
                    <Grid item xs = {1}>
                        <div>
                            {val.data}
                        </div>
                    </Grid>
                    <Grid item xs = {2}>
                        <div>
                            {val.statusOpiekunaU}
                        </div>
                    </Grid>
                    <Grid item xs = {2}>
                        <div>
                            {val.statusOpiekunaZ}
                        </div>
                    </Grid>
                    <Grid item xs = {3}>
                        <div>
                            {val.opis}
                        </div>
                    </Grid>
                    <Grid item xs = {1}>
                        <div>
                        <Button 
                            onClick={() => {handleOpen(val)}}
                            variant="contained" color="warning">
                            Edutuj
                        </Button>
                        </div>
                    </Grid>
                </Grid>
            ))}
        </Grid>
        <EditDay open={open} handleClose={handleClose} checkDay={checkDay}/>
        <AddDayDialog
        addOpen={addOpen}
        handleAddClose={handleAddClose}
        createDay={createDay}
        onChange={onChange}
        dayObject={dayObject}
        efektUczenia = {efektUczenia}
        />
    </div>
  )
}

export default Dzienniczek