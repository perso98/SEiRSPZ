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
import AddDayDialog from "../components/AddDayDialog";
import EditDay from "../components/EditDay";
import EfektyUczeniaSie from "../components/EfektyUczeniaSie";

import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function Dzienniczek() {

    const classes = useStyles();
    
    const [checkDay,setCheckDay] = useState(null)

    const [dziennik, setDziennik] = useState([]);

    const [dziennikZalaczniki, setDziennikZalaczniki] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/getDziennik").then((res) => {
          setDziennik(res.data);
          console.log(res.data)
        });

        axios.get("http://localhost:5000/api/getZalacznik").then((res) => {
            setDziennikZalaczniki(res.data);
          console.log(res.data)
        });
      }, []);

    const [dayObject,setDayObject] = useState({
    userId:"",  
    dzien:"",
    data:"",
    iloscGodzin:"",
    opis:"",
    })

// Edycja  dnia

const [editOpen, setEditOpen] = useState(false);

const [editDay, setEditDay] = useState(null);

const handleEditClose = () => {
    setEditOpen(false);
    setChangeDzien()
    setChangeData()
    setChangeIloscGodzin()
    setChangeOpis()
    setChangeZalacznik()
};
const handleEditOpen = (val) => {
    setEditOpen(true);
    setEditDay(val);
};

const [dayObject2,setDayObject2] = useState({
    userId:"",  
    dzien:"",
    data:"",
    iloscGodzin:"",
    opis:"",
    })

const [changeDzien, setChangeDzien] = useState();
const [changeData, setChangeData] = useState();
const [changeIloscGodzin, setChangeIloscGodzin] = useState();
const [changeOpis, setChangeOpis] = useState();

const onChangeDay=(e)=>{
    const {value,id}=e.target
    setDayObject2({...dayObject2,[id]:value})
  }

const createEditDay = (id, dzien, data, iloscGodzin, opis ) => {
    axios
      .post("http://localhost:5000/api/createEditDay", {
      id: id,
      changeOpis: changeOpis,
      changeDzien: changeDzien, 
      changeData: changeData,  
      changeIloscGodzin: changeIloscGodzin,
      })
      .then((res) => {
        setDziennik(
            dziennik.map((val) => (
                val.id == id ? { 
                    ...val, 
                    opis: res.data.editOpis, 
                    dzien: res.data.editDzien, 
                    data: res.data.editData,  
                    ilosc_godzin: res.data.editIlosc_godzin,
                } : val
            ))
        )
        setDziennik([
            ...dziennik,
            {
              id:res.data.id,
              userId: dayObject.login,
              dzien: dayObject.dzien,
              data:dayObject.data,
              ilosc_godzin:dayObject.iloscGodzin,
              opis:dayObject.opis,
              statusOpiekunaU:"Oczekiwanie",
              statusOpiekunaZ:"Oczekiwanie",
            },
          ]);
        
      })
      .then(() => { 
        setChangeDzien()
        setChangeData()
        setChangeIloscGodzin()
        setChangeOpis()
      })

  };

  const deleteDay = (id) => {
    const acceptDelete = window.confirm(`Czy pewno chcesz usunąć ?`);
    if (acceptDelete)
    axios.delete(`http://localhost:5000/api/deleteDay/${id}`).then((res) => {
      })
      .then((res) => {
        setDziennik(
            dziennik.filter((val) => {
              return val.id != id;
            })
          );
        setEditOpen(false);

      });
      
  };

const [changeZalacznik, setChangeZalacznik] = useState([]);


    const addZalacznik = (e, id) => {
        e.preventDefault();
        const data = new FormData();

        if (!changeZalacznik.length) {
            return null
        }
        else{
            data.append('file', changeZalacznik);
        }
        
        console.log(data)
        axios.post(`http://localhost:5000/api/upload/${id}`, data,{
        })
            .then((response) => {
                console.log("upload/${idDay}" + changeZalacznik)
                toast.success('Załadowano pomyślnie');
                // setChangeZalacznik(response.data)
                console.log("upload/${idDay}" + response.data)
            })
            .then(() => {
                setDziennikZalaczniki([
                    ...dziennikZalaczniki,
                    {
                      id:1,

                    },
                  ]).then(() => { 
                setChangeZalacznik()
              })
            })
            .catch((e) => {
                console.log("Błąd")
                toast.error('Błąd')
            })
    };

  const deleteZalacznik = (id) => {
    axios.delete(`http://localhost:5000/api/deleteZalacznik/${id}`).then((res) => {
      })
      .then((res) => {
        setDziennikZalaczniki(
            dziennikZalaczniki.filter((val) => {
              return val.id != id;
            })
          );
      });
      
  };

// dodawanie dnia

    const [addOpen, setAddOpen] = useState(false);

    const handleAddClose = () => {
        setAddOpen(false);
    };
    const handleAddOpen = () => {
        setAddOpen(true);
    };

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
            if (res.data.message == "Dzień został pomyślnie dodany") {
              setDziennik([
                ...dziennik,
                {
                  id:res.data.id,
                  userId: dayObject.login,
                  dzien: dayObject.dzien,
                  data:dayObject.data,
                  ilosc_godzin:dayObject.iloscGodzin,
                  opis:dayObject.opis,
                  statusOpiekunaU:"Oczekiwanie",
                  statusOpiekunaZ:"Oczekiwanie",
                },
              ]);
              setDayObject({...dayObject,
                userId:"",  
                dzien:"",
                data:"",
                iloscGodzin:"",
                opis:"",
              })
            }
     
            alert(res.data.message);
          });
      };
//
    const maxCharacter = (string, int) => {
        return(string.slice(0,int))
    }


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));


  return (
    
    <div className={classes.containerMain}>
        <div className={classes.nowyDzienBTN}>
        <Button  variant="contained" onClick={handleAddOpen}>
          Dodaj nowy dzień
        </Button>
        </div>

        <Grid container>
            <Grid xs={12}  md={8}>
                <Item></Item>
            </Grid>
            <Grid xs={12}  md={4}>
                <Item></Item>
            </Grid>
        </Grid>

        <Grid container>
            <Grid xs={12}  md={8}>
                <Grid container>
                    <Grid item xs = {1} md = {1} style={{marginRight:"3px"}}>
                        <div>
                            Dzień
                        </div>
                    </Grid>
                    <Grid item xs = {2} md = {2}>
                        <div>
                            Data
                        </div>
                    </Grid>
                    <Grid item xs = {3} md = {2}>
                        <div>
                            Status Opiekuna Uczelnianego
                        </div>
                    </Grid>
                    <Grid item xs = {3} md = {2}>
                        <div>
                            Status Opiekuna Zakładowego
                        </div>
                    </Grid>
                    <Grid item>
                        <div>
                            Opis
                        </div>
                    </Grid>
                    <Grid item xs = {1} md = {1}>
                        <div>
                        
                        </div>
                    </Grid>
                </Grid>

                {dziennik.map((val) => (
                    <Grid container >
                        <Grid item xs = {1} md = {1} style={{marginRight:"3px"}}>
                            <div>
                                {val.dzien}
                            </div>
                        </Grid>
                        <Grid item xs = {2} md = {2}>
                            <div>
                                {val.data}
                            </div>
                        </Grid>
                        <Grid item xs = {3} md = {2}>
                            <div>
                                {val.statusOpiekunaU}
                            </div>
                        </Grid>
                        <Grid item xs = {3} md = {2}>
                            <div>
                                {val.statusOpiekunaZ}
                            </div>
                        </Grid>
                        <Grid item xs = {2} md = {2}>
                            <div>
                                { val.opis.length < 26  ? (
                                    <div>
                                    {val.opis}
                                    </div>
                                ): <div>
                                    {maxCharacter(val.opis,25)}...
                                    </div>}
                                
                            </div>
                        </Grid>
                        <Grid item xs = {2} md = {1}>
                            <div>
                            <Button className={classes.btnEdycja}
                                onClick={() => {handleEditOpen(val)}}
                                variant="contained" 
                                color="warning">
                                Edutuj
                            </Button>
                            </div>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid xs={12}  md={4} style={{alignItems: "flex-start"}}>
                    <EfektyUczeniaSie
                    />
            </Grid>
        </Grid>

        <EditDay 
        editOpen={editOpen} 
        setChangeZalacznik={setChangeZalacznik}
        zalaczniki= {dziennikZalaczniki}
        deleteZalacznik = {deleteZalacznik}
        addZalacznik = {addZalacznik}
        setDziennikZalaczniki = {setDziennikZalaczniki}

        handleEditClose={handleEditClose} 
        editDay={editDay}
        deleteDay={deleteDay}
        onChangeDay={onChangeDay}
        createEditDay={createEditDay}
        setChangeOpis={setChangeOpis}
        setChangeDzien={setChangeDzien}
        setChangeData={setChangeData}
        setChangeIloscGodzin={setChangeIloscGodzin}
        dayObject={dayObject}
        />

        <AddDayDialog
        addOpen={addOpen}
        handleAddClose={handleAddClose}
        createDay={createDay}
        onChange={onChange}
        dayObject={dayObject}
        />
    </div>
  )
}

export default Dzienniczek