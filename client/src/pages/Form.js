import React,{useState,useEffect} from 'react'
import axios from "axios"
import { makeStyles } from '@mui/styles'
import { Button, Grid, TextField, Box, Alert,Collapse,IconButton, Typography } from '@mui/material';
import { url } from "../services/Url";
import ClearIcon from '@mui/icons-material/Clear';

const useStyles = makeStyles(theme => ({
    container:{
        marginBottom: theme.spacing(10)
    },
    center : {
        justifyContent:'space-around',
     
      },
      changePasswordForm : {
        display:'flex',
        flexDirection:'column',
        padding:'5%',
        minWidth:'600px',
        textAlign:'center',
        [theme.breakpoints.down('md')]:{
          minWidth:'400px',
        },
      },
      daneForm : {
        display:'flex',
        flexDirection:'column',
        paddingBottom:'5%',
        paddingLeft:'5%',
        paddingRight:'5%',
        minWidth:'600px',
        textAlign:'center',
        [theme.breakpoints.down('md')]:{
          minWidth:'400px',
        },
      },
}));


function Form() {
    const classes = useStyles();

    const [edit, setEdit] = useState(0);
    const [nazwaKierunku, setNazwaKierunku] = useState();

    const [sipsKierunkow, setSipsKierunkow] = useState([]);

    useEffect(() => {
      axios.get(`${url}getEfektyKierunki`).then((res) => {
        setSipsKierunkow(res.data);
      });
  
    }, []);


    const dodanieKierunku = () => {
        console.log(nazwaKierunku)
        axios
          .put(`${url}addKierunek`, {
            nazwaKierunku: nazwaKierunku,
          })
          .then((res) => {
            if (res.data.message == "Kierunek został pomyślnie dodany") {
                setSipsKierunkow([
                    ...sipsKierunkow,
                    {
                        id: res.data.id,
                        nazwa: nazwaKierunku,
                        efektyLista: []
                    },
                  ])
              .then(() => {
                setNazwaKierunku();
              });
            }
            alert(res.data.message)
          })
    }

    const usuwanieKierunku = (id) => {
      const acceptDelete = window.confirm(`Czy pewno chcesz usunąć ?`);
      if (acceptDelete)
        axios
          .delete(`${url}delKierunek/${id}`, {
          })
          .then((res) => {
            if (res.data.message == "Usunięto") {
                setSipsKierunkow(
                    sipsKierunkow.filter((val) => {
                        return val.id != id;
                      })
                  );
            }
          })
    }

    const [nazwaEfektu, setNazwaEfektu] = useState();
    const [opisEfektu, setOpisEfektu] = useState();
    

    const dodanieEfektu = (id) => {
        console.log(nazwaKierunku)
        axios
          .put(`${url}addEfekt`, {
            nazwaEfektu: nazwaEfektu,
            opisEfektu: opisEfektu,
            id: id
          })
          .then((res) => {
            if (res.data.message == "Efekt został pomyślnie dodany") {
                setSipsKierunkow(
                    sipsKierunkow.map((val) => {
                      return val.id == id
                        ? {
                            ...val,
                            efektyLista: nazwaEfektu
                              ? [
                                  ...val.efektyLista,
                                  {
                                    nazwa: nazwaEfektu,
                                    opis: opisEfektu,
                                  },
                                ]
                              : [...val.efektyLista],
                          }
                        : val;
                    })
                  )
              .then(() => {
                setNazwaEfektu();
                setOpisEfektu();
              });
            }
            alert(res.data.message)
          })
    }

    const usuwanieEfektu= (idEfekt, id) => {
      const acceptDelete = window.confirm(`Czy pewno chcesz usunąć ?`);
      if (acceptDelete)
        axios
          .delete(`${url}delEfekt/${idEfekt}`, {
          })
          .then((res) => {
            if (res.data.message == "Usunięto") {
                setSipsKierunkow(
                sipsKierunkow.map((val) => {
                return val.id == id
                    ? {
                        ...val,
                        efektyLista: val.efektyLista.filter((efekt) => {
                        return efekt.id != idEfekt;
                        }),
                    }
                    : val;
                })
            );
            }
          })
    }

    return (
    <Grid>
        <Grid container  xs={12} className={classes.center}  >
            <div/>

            <div className={classes.changePasswordForm}>

                <Typography variant="h4" color="initial" style={{paddingBottom: '5%'}}> 
                    Dodawanie efektów uczenia się
                </Typography> 
                <Typography variant="h5" color="initial"> 
                    Dodaj kierunek
                </Typography> 
                    <TextField
                    required
                    type="text"
                    label="Kierunek:"
                    margin='normal'
                    onChange={(e) => {
                        setNazwaKierunku(e.target.value);
                    }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        style={{  }}
                        onClick={() => {
                            dodanieKierunku();
                        }}
                    >
                        Dodaj 
                    </Button>
            </div>
            <div/>
        </Grid>
        <div style={{ marginLeft: "25px" }}>
          { edit === 0 ? (
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setEdit(1);
              }}
              >
            Edycja
            </Button>
            ):
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  setEdit(0);
                }}
                >
              Koniec edycji
              </Button>
          }
        </div>
                      
        <Grid >
          { sipsKierunkow.length > 0 ? (
            <Grid container >
              {sipsKierunkow.map((val) => (
                <Grid item xs={12} sm={12} md={4} style={{padding: "15px"}} >
                  
                  { edit === 0 ? (
                  <div id={val.id} style={{wordWrap: "break-word", minWidth: "200px", display: "flex",  alignItems: "center", alignContent: "space-around", justifyContent: "center"}}>
                    <div style={{width:"400px"}}>


                      <Typography color="initial" style={{fontSize: '26px'}}> 
                      <div style={{display: 'flex', justifyContent: "space-between"}}>
                        Kierunek:
                        
                      </div>
                          
                            <p style={{fontSize: '20px'}}>{val.nazwa}</p>
                      </Typography> 
                      
                      
                      Efekty uczenia się:
                      <div>
                      {
                          val.efektyLista.map((efekt) => (
                              <div  style={{display: 'flex', alignItems: "center", alignContent: "space-around", justifyContent: "flex-start"}}>
                                  <div>{efekt.nazwa}</div>
                                  <div style={{wordWrap: "break-word", minWidth: "200px",  paddingLeft: "12px", paddingRight: "12px" }} > {efekt.opis}</div>
                                  
                              </div>
                          ))
                          
                      }
                      </div>
                      { sipsKierunkow.length > 0 ? (
                      <div>
                          <div>
                              <TextField
                                  label="Efekt"
                                  id="efekt"
                                  margin="normal"
                                  onChange={(e) => {
                                      setNazwaEfektu(e.target.value);
                                  }}
                              />
                              <TextField
                                  label="Opis"
                                  id="opis"
                                  margin="normal"
                                  multiline
                                  onChange={(e) => {
                                      setOpisEfektu(e.target.value);
                                  }}
                              />
                          </div> 
                          <Button 
                                  variant="contained" 
                                  onClick={() => {
                                      dodanieEfektu(val.id, val.nazwa);
                                      }} 
                                  style={{marginTop:'20px',minHeight:'50px',fontSize:'15px'}}
                              >
                                  Zapisz
                              </Button>
                      </div>
                      
                      ): <div>Brak kierunków</div>}
                  </div></div>

                    ):
                    <div id={val.id} style={{wordWrap: "break-word", minWidth: "200px", display: "flex",  alignItems: "center", alignContent: "space-around", justifyContent: "center"}}>
                      <div style={{width:"400px"}}>
                     
                      <Typography color="initial" style={{fontSize: '26px'}}> 
                      <div style={{display: 'flex', justifyContent: "space-between"}}>
                        Kierunek:
                        <Button
                        variant="contained"
                        color="error"
                        style={{  }}
                        onClick={() => {
                            usuwanieKierunku(val.id);
                        }}
                        >
                            Usuń
                          </Button>
                      </div>
                          
                            <p style={{fontSize: '20px'}}>{val.nazwa}</p>
                      </Typography> 
                      
                      
                      Efekty uczenia się:
                      <div>
                      {
                          val.efektyLista.map((efekt) => (
                              <div  style={{display: 'flex', alignItems: "center", alignContent: "space-around", justifyContent: "space-between"}}>
                                  <div>{efekt.nazwa}</div>
                                  <div style={{ paddingLeft: "12px", paddingRight: "12px" }} > {efekt.opis}</div>
                                  <IconButton 
                                  style={{ color: "red"}}
                                  onClick={() => {
                                          usuwanieEfektu(efekt.id, val.id);
                                      }}>
                                  <ClearIcon>
                                  
                                  
                                  </ClearIcon>
                                  </IconButton>
                                  

                              </div>
                          ))
                          
                      }
                      </div>
                      { sipsKierunkow.length > 0 ? (
                      <div>
                          <div>
                              <TextField
                                  label="Efekt"
                                  id="efekt"
                                  margin="normal"
                                  onChange={(e) => {
                                      setNazwaEfektu(e.target.value);
                                  }}
                              />
                              <TextField
                                  label="Opis"
                                  id="opis"
                                  margin="normal"
                                  onChange={(e) => {
                                      setOpisEfektu(e.target.value);
                                  }}
                              />
                          </div> 
                          <Button 
                                  variant="contained" 
                                  onClick={() => {
                                      dodanieEfektu(val.id, val.nazwa);
                                      }} 
                                  style={{marginTop:'20px',minHeight:'50px',fontSize:'15px'}}
                              >
                                  Zapisz
                              </Button>
                      </div>
                      ): <div>Brak kierunków</div>}
                      </div>
                    </div>

                  } 
                  
                </Grid>
              ))}
            </Grid>
          ): <div>Brak kierunków</div>}
        </Grid>
    </Grid>
    )
    
}

export default Form