import React,{useState,useEffect} from 'react'
import axios from "axios"
import { makeStyles } from '@mui/styles'
import { Button, Grid, TextField,TableRow, TableCell, Table,
  TableBody,
  
  TableHead,IconButton, Typography } from '@mui/material';
import { url } from "../services/Url";
import ClearIcon from '@mui/icons-material/Clear';
import Helper from "../components/Helper";

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


function EfektyUczeniaSie() {
    const classes = useStyles();

    const [edit, setEdit] = useState(0);
    const [nazwaKierunku, setNazwaKierunku] = useState();

    const [sipsKierunkow, setSipsKierunkow] = useState([]);

    useEffect(() => {
      axios.get(`${url}getEfektyKierunki`).then((res) => {
        setSipsKierunkow(res.data);
        console.log(res.data)
      });
  
    }, []);


    const dodanieKierunku = () => {
        console.log(nazwaKierunku)
        axios
          .put(`${url}addKierunek`, {
            nazwaKierunku: nazwaKierunku,
          })
          .then((res) => {
            if (res.data.message === "Kierunek został pomyślnie dodany") {
                setSipsKierunkow([
                    ...sipsKierunkow,
                    {
                        id: res.data.id,
                        nazwa: nazwaKierunku,
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
            if (res.data.message === "Usunięto") {
                setSipsKierunkow(
                    sipsKierunkow.filter((val) => {
                        return val.id !== id;
                      })
                  );
            }
          })
    }

    const [nazwaSpecjalnosci, setNazwaSpecjalnosci] = useState();
    const [skrotSpecjalnosci, setSkrotSpecjalnosci] = useState();

    const dodanieSpecjalnosci = (id) => {
      console.log(nazwaSpecjalnosci)
      axios
        .put(`${url}dodanieSpecjalnosci`, {
          id: id,
          nazwaSpecjalnosci: nazwaSpecjalnosci,
        })
        .then((res) => {
            setSipsKierunkow(
              sipsKierunkow.map((val) => {
                return val.id === id
                  ? {
                      ...val,
                      listaSpecjalnoscis: nazwaSpecjalnosci
                        ? [
                            ...val.listaSpecjalnoscis,
                            {
                              id: res.data.id,
                              nazwa: nazwaSpecjalnosci,
                              opis: skrotSpecjalnosci,
                            },
                          ]
                        : [...val.listaSpecjalnoscis],
                    }
                  : val;
              })
            )
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
            if (res.data.message === "Efekt został pomyślnie dodany") {
                setSipsKierunkow(
                    sipsKierunkow.map((val) => {
                      return val.id === id
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
            if (res.data.message === "Usunięto") {
                setSipsKierunkow(
                sipsKierunkow.map((val) => {
                return val.id === id
                    ? {
                        ...val,
                        efektyLista: val.efektyLista.filter((efekt) => {
                        return efekt.id !== idEfekt;
                        }),
                    }
                    : val;
                })
            );
            }
          })
    }

    const infomacja = (
      <div>
        <div>
          Tutaj znajdziesz informację o przypisanych efektach uczenia się do konkternych Specjalności w Kierunkach.
        </div>
        <div>
          Przycisk Dodaj Kierunek dodaje nowy Kierunek i w którym dodajemy Specjalności a w nich efekty uczenia się.
        </div>
        <div>
          Przycisk EDYCJA przełącza nam na możliwość usuwania  Kierunków Specjalności oraz Efektów.
        </div>
        
      </div>
    );

    return (
    <Grid>
        <Grid container  xs={12} className={classes.center}  >
          <div/>
          <div className={classes.changePasswordForm}>

              <Typography 
              variant="h4" 
              color="initial" 
              style={{
                paddingBottom: '5%', 
                display:"flex", 
                alignItems: "center"
                }}> 
                  Dodawanie efektów uczenia się 
              <Helper info={infomacja} title="Pomoc Efekty Uczenia Się" napis={""}/>
              </Typography> 
              
              <Typography variant="h5" color="initial"> 
                  Dodaj Kierunek
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
          { sipsKierunkow?.length > 0 ? (
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

                      {console.log("val.listaSpecjalnosci?.length" + val.listaSpecjalnoscis?.length)}

                        <div>
                          <div>
                              <TextField
                                  label="Specjalności"
                                  id="specjalności"
                                  margin="normal"
                                  multiline
                                  onChange={(e) => {
                                    setNazwaSpecjalnosci(e.target.value);
                                  }}
                              />
                              <TextField
                                  label="Skrót"
                                  id="Ssrot"
                                  margin="normal"
                                  multiline
                                  onChange={(e) => {
                                    setSkrotSpecjalnosci(e.target.value);
                                  }}
                              />
                          </div> 
                          <Button 
                            variant="contained" 
                            onClick={() => {
                                dodanieSpecjalnosci(val.id);
                                }} 
                            style={{marginTop:'20px',minHeight:'50px',fontSize:'15px'}}
                          >
                              Zapisz
                          </Button>
                        </div>

                      {val.listaSpecjalnoscis?.length !== 0 ? (
                        <div>
                        {val.listaSpecjalnoscis?.map((valSpecjalnosc) => (
                          <div>
                            <div>
                              {valSpecjalnosc.nazwa}
                            </div>

                            Efekty uczenia się:

                            <Grid>
                              <Table>
                                <TableHead >
                                  <TableRow>
                                      <TableCell >
                                        Efekt
                                      </TableCell>
                                      <TableCell  >
                                        Opis
                                      </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                {val?.efektyLista?.map((efekt) => (
                                  <TableRow>
                                      <TableCell >
                                      {efekt.nazwa}
                                      </TableCell>
                                      <TableCell >
                                      {efekt.opis}
                                      </TableCell>
                                  </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Grid>

                          </div>
                        ))}
                        </div>
                      ):<div>
                          Brak Specjalności

                          
                        </div>
                      }
                      
                      {/* { sipsKierunkow.length > 0 ? (
                      <div>
                          <div>
                              <TextField
                                  label="Efekt"
                                  id="efekt"
                                  margin="normal"
                                  multiline
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
                      
                      ): <div>Brak kierunków</div>} */}
                  </div>
                  </div>

                    ):
                    <div id={val.id} style={{wordWrap: "break-word", minWidth: "200px", display: "flex",  alignItems: "center", alignContent: "space-around", justifyContent: "center"}}>
                      {/* <div style={{width:"400px"}}>
                     
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
                      <Grid>
                        <Table>
                          <TableHead >
                            <TableRow>
                                <TableCell >
                                  Efekt
                                </TableCell>
                                <TableCell  >
                                  Opis
                                </TableCell>
                                <TableCell >
                                  Usuń
                                </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {
                              val.efektyLista.map((efekt) => (
                                    <TableRow>
                                        <TableCell >
                                        {efekt.nazwa}
                                        </TableCell>
                                        <TableCell >
                                        {efekt.opis}
                                        </TableCell>
                                        <TableCell >
                                          <IconButton 
                                          style={{ color: "red"}}
                                          onClick={() => {
                                                  usuwanieEfektu(efekt.id, val.id);
                                              }}>
                                            <ClearIcon>
                                            </ClearIcon>
                                          </IconButton>
                                        </TableCell>
                                    </TableRow>
                              ))
                              
                          }
                          </TableBody>
                        </Table>
                      </Grid>
                      </div> */}
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

export default EfektyUczeniaSie