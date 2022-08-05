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

const useStyles = makeStyles(theme => ({
    containerMain:{
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
}));

function Dzienniczek() {

    const [dziennik, setDziennik] = useState([]);
    const [efektUczenia, setEfektUczenia] = useState([]);
    const [loading, setLoading] = useState(true);
    

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
          setLoading(false);
          
        });
      }, []);

    const [dayObject,setDayObject] = useState({
        id_student:"",  
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
                  id_student: dayObject.login,
                  dzien: dayObject.dzien,
                  data:dayObject.data,
                  ilosc_godzin:dayObject.iloscGodzin,
                  opis:dayObject.opis,
                  efekt_uczenia:dayObject.age,

                },
              ]);
              setDayObject({...dayObject,
                id_student:"",  
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
 
 
        <Button variant="contained" onClick={handleAddOpen}>
          Dodaj nowy dzień
        </Button>
    
        

        <Grid >
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
                            {val.zatwierdzenie}
                        </div>
                    </Grid>
                    <Grid item xs = {1}>
                        <div>
                            dar
                        </div>
                    </Grid>
                </Grid>
                
                

            ))}
        </Grid>
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