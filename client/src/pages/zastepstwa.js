import React,{useState,useEffect, useContext} from 'react'
import axios from "axios"
import { makeStyles } from '@mui/styles'
import { Button, Grid } from '@mui/material';
import { url } from "../services/Url";
import SearchBar from "../components/SearchBarNoMargin";
import Zastepstwo from "../components/Zastepstwo";
import { ThemeContext } from "../context/ThemeContext";

import OpiekunU from "../pages/ZastepstwoOpiekunU";
import OpiekunUEfekty from "../pages/ZastepstwoEfektyOpiekunU";
import OpiekunUHistory from "../pages/ZastepstwoOpiekunUHistory";


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


function Zastepstwa() {
    const classes = useStyles();
    const [darkMode] = useContext(ThemeContext);

  //  const [edit, setEdit] = useState(0);
  //  const [nazwaKierunku, setNazwaKierunku] = useState();

    const [listaOpiekunow, setListaOpiekunow] = useState([]);
  //  const [listaZastepstw, setListaZastepstw] = useState([]);

   // const [loading, setLoading] = useState(0);

    useEffect(() => {
      axios.get(`${url}getListaOpiekunow`).then((res) => {
        if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
          window.location.reload(false)
        } else {
        setListaOpiekunow(res.data);
        console.log("getListaOpiekunow")
        console.log(res.data)
        }

      });
      axios.get(`${url}getListaZastepstw`).then((res) => {
        if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
          window.location.reload(false)
        } else {
    //    setListaZastepstw(res.data);
        console.log("getListaZastepstw")
        console.log(res.data)
        }
      });
    //  setLoading(1)
  
    }, []);

  //   const dodanieZastepstwa = (id) => {
      
  //     axios.put(`${url}dodanieZastepstwa/${id}`, {
  //       })

  //     setListaZastepstw([
  //       ...listaZastepstw,
  //       {
  //           userId: id,
  //       },
  //     ])

  // }

  
  const [searchLogin, setSearchLogin] = useState("");
//  const [itemOffset, setItemOffset] = useState(0);

  // console.log(dane)

  const recordsAfterFiltering = listaOpiekunow.filter((val) => {
      if (searchLogin === "") {
        return val;
      } else if (
        val.nazwisko.toLowerCase().includes(searchLogin.toLowerCase()) ||
        val.imie.toLowerCase().includes(searchLogin.toLowerCase()) 
      ) {
        return val;
      }
    });


    const [open, setOpen] = useState(false);
    const [infoUser, setInfoUser] = useState(null);

    const handleOpen = (val) => {
      setOpen(true);
      setInfoUser(val);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
    <Grid>
      
      <Zastepstwo
      open = {open}
      infoUser = {infoUser}
      handleClose = {handleClose}
      />
      <Grid item xs className={classes.content}>
        
                    <Grid container>
                    <Grid item xs style={{color: darkMode == "white" ? "black" : "white"}}>
                            <div>
                              <div style={{margin:"3rem", display:"flex", justifyContent: "center"}} >
                                    <SearchBar
                                    darkMode={darkMode}
                                    setSearchLogin={setSearchLogin}
                                  //  setItemOffset={setItemOffset}
                                    />
                              </div>
                              <div style={{display:"flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <div className={classes.przerwa} style={{marginLeft:"15px", marginBottom:"15px"}}><b>Lista Opiekunów</b></div>
                                {recordsAfterFiltering.map((val) => (
                                    <Grid style={{ width: "350px", marginLeft:"30px", marginBottom: "5px"}}>
                                      <div>
                                              <Grid container style={{ display: "flex", justifyContent: "space-between" }} >
                                              {val.imie}  {val.nazwisko} 
                                                  <Grid>
                                                  {/* <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => {
                                                      dodanieZastepstwa(val.user.id);
                                                    }}
                                                  >
                                                    Zastępstwo
                                                  </Button> */}
                                                  <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => {
                                                      handleOpen(val);
                                                    }}
                                                  >
                                                    Zastępstwo
                                                  </Button>
                                                  </Grid>
                                              </Grid>
                                      </div>
                                    </Grid>
                                ))}
                              </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <div>
                {infoUser !== null ? (
            <div>
                Zastępstwo: {infoUser.imie} {infoUser.nazwisko}
                Id: {infoUser.user.id}

                <OpiekunU 
            infoUser = { infoUser }
            />
            <OpiekunUHistory
            infoUser = { infoUser }
            />
            <OpiekunUEfekty
            infoUser = { infoUser }
            />
            </div>
        ): null}
            

            </div>
      
                

            {/* {listaZastepstw.map((val) => (
                <div>
                    <div>
                        {val.id}
                        <Button>Wejdź</Button>
                    </div>
                </div>
            ))} */}

    </Grid>
    
    </div>
    )
    
}

export default Zastepstwa