import React,{ useState, useEffect, useContext} from 'react'
import axios from 'axios'

import {makeStyles,} from "@material-ui/core";

import { Container, formControlLabelClasses, Grid} from '@mui/material'
import AddFirma from "./AddFirma";
import EditFirma from "./EditFirma";
import AddOpiekun from "./AddOpiekun";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import Button from "@mui/material/Button";
import { Typography, TextField, FormControl, FilledInput } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { url } from "../services/Url";
import Helper from "../components/Helper";
import { ThemeContext } from "../context/ThemeContext";
import SelectedFirma from "../pages/SelectedFirma";
import { Link } from "react-router-dom";
import SearchBar2 from "./SearchBarNoMargin";
import SearchBar from "./SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles'

const useStyles = makeStyles((theme) => ({
  linkHover: {
      // marginBottom:"30px",
      textDecoration: "none",
      backgroundImage: "linear-gradient(#073874, #042144)",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      borderRadius: "25px",
      boxShadow: " 0 0 5px black",
    color: "white",
    "&:hover": {
      color: "white",
      textDecoration: "none",
      boxShadow: " 0 0 25px yellow",
    },
  },

  

}));


function ListaOpiekunow() {

  // const useStyles2 = makeStyles((theme) => ({
  //   obramowanieDarkMode: {
  //     color: darkMode == "white" ? "black" : "white !important",
  //       '.MuiOutlinedInput-notchedOutline': {
  //         borderColor:  darkMode == "white" ? "none" : "white",
  //         color: darkMode == "white" ? "black" : "white",
  //       },
  //       '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
  //         borderColor:  darkMode == "white" ? "black" : "white",
  //         color: darkMode == "white" ? "black" : "white",
  //       },
  //       '&:hover .MuiOutlinedInput-notchedOutline': {
  //         borderColor: darkMode == "white" ? "black" : "white",
  //         color: darkMode == "white" ? "black" : "white",
  //       },
  //       '.MuiSvgIcon-root ': {
  //         fill:  darkMode == "white" ? "black" : "white",
  //       }
  //   },
  //   notchedOutline: {
  //     borderWidth: "1px",
  //     borderColor: "white !important",
  //   },
  
  // }));
  

    const [darkMode] = useContext(ThemeContext);
    const classes = useStyles();
    // const classes2 = useStyles2();


    const [dane,setDane]=useState([])
    const [user,setUser]=useState([])
    const [firma,setFirma]=useState([])

    const [daneFiltracji, setDaneFiltracji] = useState([]);
    const [changeFirma, setChangeFirma] = useState();

    useEffect(()=>
    {
        axios.get(`${url}getUser`).then((res)=>{
          if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
            window.location.reload(false)
          } else {
            setUser(res.data)
          }
        })

        axios.get(`${url}getDane`).then((res)=>{
          if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
            window.location.reload(false)
          } else {
            setDane(res.data)
            console.log(res.data)
            setDaneFiltracji(res.data)
          }
        })

        axios.get(`${url}getFirma`).then((res)=>{
          if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
            window.location.reload(false)
          } else {
            setFirma(res.data)
          }
        })
    },[]
    )

//firma
    const [addOpen, setAddOpen] = useState(false);

    const handleAddClose = () => {
        setAddOpen(false);
    };
    const handleAddOpen = () => {
        setAddOpen(true);
    };

    const [firmaObject,setFirmaObject] = useState({
        nazwa:"",
        opis:"",
    })

    const onChange=(e)=>{
        const {value,id}=e.target
        setFirmaObject({...firmaObject,[id]:value})
      }

    const createFirma = () => {
        axios.post(`${url}createFirma`, {
          firmaObject:firmaObject
          })
          .then((res) => {
            if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
              window.location.reload(false)
            } else {
            if (res.data.message === "Zakład został dodany") {
              setFirma([
                ...firma,
                {
                  id:res.data.id,
                  nazwa: firmaObject.nazwa,
                  opis: firmaObject.opis,
                },
              ]);
              setFirmaObject({...firmaObject,
                nazwa:"",  
                opis:"",
              })
            }
     
            alert(res.data.message);
          }
          });
      };
//Student

    const [addSOpen, setAddSOpen] = useState(false);
    const [firmaIdS, setFirmaSId] = useState([]);
    const [idOpiekuna, setIdOpiekuna] = useState();
    const [jakiOpiekun, setJakiOpiekun] = useState();
    const [infoOpiekun, setInfoOpiekun] = useState();


    const [surnameSearch, setSurnameSearch] = useState("");



    const handleAddSClose = () => {
        setAddSOpen(false);
    };
    const handleAddSOpen = (firma, idOpiekuna, opiekunZorU, infoOpiekun) => {
        setFirmaSId(firma)
        setIdOpiekuna(idOpiekuna)
        setJakiOpiekun(opiekunZorU)
        setAddSOpen(true);
        setInfoOpiekun(infoOpiekun)
    };

    const [student, setStudent] = useState([]);

    const [studentObject,setStudentObject] = useState({
        userId:"",  
        dzien:"",
    })

    const onChangeAddStudent=(e)=>{
        const {value,id}=e.target
        setStudentObject({...studentObject,[id]:value})
      }

    const addStudentFirma = (userId, firmaId, id, idOpiekuna, jakiOpiekun) => {
        axios.put(`${url}addStudentFirma`, {
          id: userId,
          firmaId: firmaId,
          idOpiekuna: idOpiekuna,
          jakiOpiekun: jakiOpiekun,
        })
        .then((res) => {
          if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
            window.location.reload(false)
          } else {
            if(jakiOpiekun == 1){
                setUser(
                    user.map((val) => {
                        return val.id == userId ? { ...val, firmaId: firmaId, id_opiekunZ: idOpiekuna } : val;
                    })
                );
                setDane(
                  dane.map((val) => {
                    return val.user.id == id ? { ...val, user: { ...val.user, firmaId: firmaId, id_opiekunZ: idOpiekuna } } : val;
                  })
              );
                // setDane(
                //     dane.map((val) => {
                //         return val.id == id ? { 
                //             ...val, 
                //             user:user.map((valUser) => {
                //                 return valUser.id == userId ? { ...valUser, firmaId: firmaId, id_opiekunZ: idOpiekuna } : valUser;
                //             })
                //         } : val;
                //     })
                // );
                // console.log(dane)
            }
            if(jakiOpiekun == 0){
                setUser(
                    user.map((val) => {
                        return val.id == userId ? { ...val, firmaId: firmaId, id_opiekunU: idOpiekuna } : val;
                    })
                );
                setDane(
                  dane.map((val) => {
                    return val.user.id == id ? { ...val, user: { ...val.user, firmaId: firmaId, id_opiekunU: idOpiekuna } } : val;
                  })
              );
                // setDane(
                //     dane.map((val) => {
                //         return val.id == id ? { 
                //             ...val, 
                //             user:user.map((valUser) => (
                //                 valUser.id == userId ? { ...valUser, firmaId: firmaId, id_opiekunU: idOpiekuna } : null
                //             ))
                //         } : val;
                //     })
                // );
                // console.log(dane)
            }
          }
        });
      };


      const delStudentFirma = (id, userId, jakiOpiekun) => {
        axios.put(`${url}delStudentFirma`, {
            id: id,
            jakiOpiekun: jakiOpiekun,
          })
          .then((res) => {
            if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
              window.location.reload(false)
            } else {
            if(jakiOpiekun == 1){
                setUser(
                    user.map((val) => {
                        return val.id == id ? { ...val, id_opiekunZ: null } : val;
                    })
                );
                setDane(
                  dane.map((val) => {
                    return val.user.id == id ? { ...val, user: { ...val.user, id_opiekunZ: null } } : val;
                  })
              );
                // setDane(
                //     dane.map((val) => {
                //         return val.id == id ? { 
                //             ...val, 
                //             user:user?[
                //                 ...val.user,
                //                 {
                //                     id_opiekunZ: null,
                //                 },
                //             ]:
                //             [...val.user]
                //         } : val;
                //     })
                // );
            }
            if(jakiOpiekun == 0){
                setUser(
                    user.map((val) => {
                        return val.id == id ? { ...val, id_opiekunU: null } : val;
                    })
                );
                setDane(
                  dane.map((val) => {
                    return val.user.id == id ? { ...val, user: { ...val.user, id_opiekunU: null } } : val;
                  })
              );
                // setDane(
                //     dane.map((val) => {
                //         return val.id == id ? { 
                //             ...val, 
                //             user:user?[
                //                 ...val.user,
                //                 {
                //                     id_opiekunU: null,
                //                 },
                //             ]:
                //             [...val.user]
                //         } : val;
                //     })
                // );
            }
          }
          });
      };


     //Opiekun 

    
    const [addOOpen, setAddOOpen] = useState(false);

    const [firmaIdO, setFirmaOId] = useState(false);

    const handleAddOClose = () => {
        setAddOOpen(false);
    };
    const handleAddOOpen = (val) => {
        setFirmaOId(val)
        setAddOOpen(true);
    };
    const [addOpiekun, setAddOpiekun] = useState([]);

    const [opiekunObject,setOpiekunObject] = useState({
        id:"",  
        firmaId:"",
    })

    const onChangeAddOpiekun=(e)=>{
        const {value,id}=e.target
        setOpiekunObject({...opiekunObject,[id]:value})
      }

    const addOpiekunFirma = (id, firmaId) => {
      console.log(" id Opiekuna " + id)
      console.log(" id firmaId " + firmaId)
        axios.put(`${url}addOpiekunFirma`, {
            id: id,
            firmaId: firmaId
          })
          .then((res) => {
            if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
              window.location.reload(false)
            } else {
            setUser(
                user.map((val) => {
                  return val.id == id ? { ...val, firmaId: firmaId } : val;
                })
              );
            setDane(
                dane.map((val) => {
                  return val.user.id == id ? { ...val, user: { ...val.user, firmaId: firmaId } } : val;
                })
            );
              }
          });
          console.log(" dane " + dane)
      };

      const delOpiekunFirma = (id, isOpiekun, isOpiekunZakl) => {
        axios.put(`${url}delOpiekunFirma`, {
            id: id,
            isOpiekun: isOpiekun,
            isOpiekunZakl: isOpiekunZakl,
          })
          .then((res) => {
            if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
              window.location.reload(false)
            } else {
            setUser(
                user.map((val) => {
                  return val.id == id ? { ...val, firmaId: null } : val;
                })
              );
            setDane(
              dane.map((val) => {
                return val.user.id == id ? { ...val, user: { ...val.user, firmaId: null } } : val;
              })
            );
            }
          });
      };

      //Firma Edit
   

    const [changeNazwa, setChangeNazwa] = useState();
    const [firmaEditOpen, setfirmaEditOpen] = useState(false);
    const [firmaEditInfo, setfirmaEditInfo] = useState([]);

    const handlefirmaEditClose = () => {
        setfirmaEditOpen(false);
        setChangeNazwa();
    };
    const handlefirmaEditOpen = (val) => {
        setfirmaEditInfo(val)
        setfirmaEditOpen(true);
    };
    
    const onChangeEditFirma=(e)=>{
        const {value,id}=e.target
        setFirma({...firma,[id]:value})
      }
    

    const updateFirma = (id) => {
        axios.put(`${url}updateFirma`, {
            id: id,
            changeNazwa: changeNazwa,
          })
          .then((res) => {
            if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
              window.location.reload(false)
            } else {
            setFirma(
                firma.map((val) => {
                  return val.id == id ? { ...val, 
                    nazwa: res.data.editNazwa 
                } : val;
                })
              );
            }
          });
      };

      //EdutStudent

      const [studentEditOpen, setStudentEditOpen] = useState(false);
      const [studentEditInfo, setStudentEditInfo] = useState([]);
      const [changeNP, setChangeNP] = useState("");
      const [changeCTP, setChangeCTP] = useState("");
      const [changePO, setChangePO] = useState("");
      const [changePD, setChangePD] = useState("");
      const [changeDP, setChangeDP] = useState("");
      

      const handleStudentEditClose = () => {
        setStudentEditOpen(false);
        setChangeNazwa();
      };
      const handleStudentEditOpen = (val) => {
        setStudentEditInfo(val)
        setStudentEditOpen(true);
      };

      const updateStudent = (id) => {
        axios.put(`${url}updateStudentPorozumienie`, {
            id: id,
            changeNP: changeNP,
            changeCTP: changeCTP,
            changePO: changePO,
            changePD: changePD,
            changeDP: changeDP,

          })
          .then((res) => {
            if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
              window.location.reload(false)
            } else {
            setFirma(
                firma.map((val) => {
                  return val.id == id ? { ...val, 
                    nazwa: res.data.editNazwa 
                } : val;
                })
              );
            }
          });
      };

      const infomacja = (
        <div>
          <div>
            Przycisk "DODAJ ZAKŁAD" dodaje nam nowy zakład
          </div>
          <div>
            Przycisk "ZMIEŃ" zapisuje informację danego dnia, lecz ich nie wysyła. 
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      );

      const [searchLogin, setSearchLogin] = useState("");
      const [firmaSearch, setFirmaSearch] = useState("");
      const [toggleSearch, setToggleSearch] = useState(1);
      const [itemOffset, setItemOffset] = useState(0);
  
      // console.log(dane)


      let recordsAfterFiltering = firma.filter((val) => {
          return val;
      });

      if(toggleSearch === 1){
        recordsAfterFiltering = firma.filter((val) => {
          if (firmaSearch === "") {
            return val;
          } else if (
            val?.nazwa.toLowerCase().includes(firmaSearch.toLowerCase())
          ) {
            return val;
          }
        });
      }
      
      if(toggleSearch === 0){
        recordsAfterFiltering = dane.filter((val) => {
          if (searchLogin === "") {
            return null;
          } else if (
            val?.user?.login.toLowerCase().includes(searchLogin.toLowerCase())
            ||
            val?.nazwisko.toLowerCase().includes(searchLogin.toLowerCase())
            ||
            (val?.imie.toLowerCase() + " " + val?.nazwisko.toLowerCase()).includes(searchLogin.toLowerCase())
            ||
            (val?.nazwisko.toLowerCase() + " " + val?.imie.toLowerCase()).includes(searchLogin.toLowerCase())
          ) {
            return val;
          }
        });
      }

      const [firmaInfo, setfirmaInfo] = useState([]);

      const handlefirmaOpen = (val) => {
          setfirmaInfo(val)
      };


      const filtracjaPoFirmie = (
        <div>
          <Grid 
          container 
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={3}>
            {recordsAfterFiltering.map((firmaD) => (
              <Grid item xs="auto"
              key={firmaD.id}
              style={{minWidth:"350px"}}>
                <Link
                className={classes.linkHover}
                // to="/selectedFirma/"
                onClick={()=> handlefirmaOpen(firmaD)}
                >
                    <div style={{display: "flex", alignItems:"center", justifyContent: "flex-start"}}>
                        <div style={{display: "flex", fontSize: "20px"}}>
                        Firma: {firmaD.nazwa}
                        </div>
                    </div>
                    <div
                    style={{ display: "flex", justifyContent: "space-between"}}
                    >
                        <div>
                        <h6 style={{ marginTop:"10px"}}>Opiekuni: </h6>
                        </div>
                    </div>
                    {dane.map((val) => (
                        <Grid
                        key={val.id}
                        >
                            {( val.user?.isOpiekunZakl === 1 || val.user?.isOpiekun === 1 )  && val.user?.firmaId === firmaD.id ? (
                                <div>
                                    <div
                                    style={{ display: "flex", justifyContent: "space-between", flexDirection: "column-reverse" }}
                                    >
                                        { val.user?.isOpiekunZakl === 1 ? (
                                            <div>
                                                <div
                                                style={{ display: "flex", justifyContent: "space-between", paddingLeft: "10px"}}
                                                >   
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <div>
                                                            {val.imie} {val.nazwisko}
                                                        </div>
                                                        <div 
                                                        style={{fontSize:"11px"}}
                                                        >
                                                            (Opiekun zakładowy)
                                                        </div>
                                                    </Stack>
                                                    
                                                </div>
                                            </div>
                                            ): 
                                            <div>
                                                <div
                                                style={{ display: "flex", justifyContent: "space-between", paddingLeft: "10px" }}
                                                >
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <div>
                                                            {val.imie} {val.nazwisko}
                                                        </div>
                                                        <div 
                                                        style={{fontSize:"11px"}}
                                                        >
                                                            (Opiekun uczelniany)
                                                        </div>
                                                    </Stack>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            ): null}
                        </Grid>
                    ))}
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      );

      const filtracjaPoOsobie = (
        <div>
            <Grid 
            container 
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={3}>
              {recordsAfterFiltering.map((valFirma) => (
                <Grid item xs="auto"
                key={valFirma.id}
                style={{minWidth:"350px"}}>
                  <Link
                  className={classes.linkHover}
                  // to="/selectedFirma/"
                  onClick={()=> handlefirmaOpen(valFirma)}
                  >
                      <Grid>
                      <div style={{display: "flex", alignItems:"center", justifyContent: "flex-start"}}>
                          <div style={{display: "flex", marginRight:"5px", fontSize: "20px"}}>
                              <div>

                              {valFirma?.user?.firma !== null ? (
                                  <div>Firma: {valFirma?.user?.firma?.nazwa}</div>
                              ): <div>Firma: Brak</div>
                              }

                              </div>
                          </div>
                      </div>

                      {searchLogin !== "" ? (
                              <div>
                              <div style={{fontSize: "11px", marginTop: "1rem"}}>
                                {valFirma?.user?.isStudent === 1 ?(
                                  <div>(Student)</div>
                                ):null} 
                                {valFirma?.user?.isOpiekun === 1 ?(
                                  <div>(Opiekun uczelniany)</div>
                                ):null} 
                                {valFirma?.user?.isOpiekunZakl === 1 ?(
                                  <div>(Opiekun zakładowy)</div>
                                ):null} 
                              </div>
                              {valFirma?.imie} {valFirma?.nazwisko}  {valFirma?.user?.login}
                                
                              </div>
                          ): null
                          }
                      </Grid>
                  </Link>
                  </Grid>
              ))
              }
            </Grid>
        </div>
      )

      const poFiltracji = (
        <div>
            {searchLogin !== "" ? (
                <div>
                {filtracjaPoOsobie}
                </div>
            ): toggleSearch === 0 ? (
              <div style={{textAlign: "center"}}>Wpisz Nazwisko, Imie, lub Indeks aby wyszukać</div>
            ):
            firmaSearch !== "" || firmaSearch === "" ? (
              <div>
                  {filtracjaPoFirmie}
              </div>
            ): null
            }
        </div>
      )

      const wyszukiwarka = 
      <div
              style={{
                marginBottom: "2rem",
                display:"flex",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                textAlign: "center",
              }}
            >

            {toggleSearch === 0 ? (
              <TextField
                label="Szukaj po osobie"
                variant="outlined"
                value={searchLogin}
                inputProps={{
                  style: {
                    color: darkMode == "white" ? "black" : "white",
                    classes: {
                      notchedOutline:
                        darkMode == "white" ? null : classes.notchedOutline,
                    },
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: darkMode == "white" ? "black" : "white",
                  },
                }}
                InputProps={{
                  classes: {
                    notchedOutline:
                      darkMode == "white" ? null : classes.notchedOutline,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{
                          color: darkMode == "white" ? "black" : "white",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setSearchLogin(e.target.value);
                }}
              />
            ) : (
              <TextField
                type="text"
                value={firmaSearch}
                label="Szukaj po nazwie firmy"
                variant="outlined"
                inputProps={{
                  style: {
                    color: darkMode == "white" ? "black" : "white",
                    classes: {
                      notchedOutline:
                        darkMode == "white" ? null : classes.notchedOutline,
                    },
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: darkMode == "white" ? "black" : "white",
                  },
                }}
                InputProps={{
                  classes: {
                    notchedOutline:
                      darkMode == "white" ? null : classes.notchedOutline,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{
                          color: darkMode == "white" ? "black" : "white",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setFirmaSearch(e.target.value);
                  console.log(" dane " + dane);
                  console.log(" user " + user);
                }}
              />
            )}
                {/* <SearchBar
                   
                    darkMode={darkMode}
                    setSearchLogin={setSearchLogin}
                    setItemOffset={setItemOffset}
                /> */}
            <Button
              variant="contained"
              onClick={() => {
                functionToggleSearch();
              }}
              style={{ margin: "1.5rem" }}
            >{" "}
              Zmień opcje szukania
            </Button>
            
            </div>

      const navbarButtonHelper =
        <div style={{ 
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          }}>
          <Button  variant="contained" onClick={handleAddOpen} style={{marginBottom: "10px"}}>
              Dodaj Zakład
          </Button>
          <Helper info={infomacja} title="Zarządanie Zakładami" napis={""} darkMode = {darkMode}/>
        </div>


      const functionToggleSearch = () => {
        if (toggleSearch === 0) {
          setToggleSearch(1);
          setSearchLogin("");
        } else if (toggleSearch === 1) {
          setToggleSearch(0);
          setFirmaSearch("");
        }
      };
      

  return (
    <div>
        <Container style={{ paddingTop: "3rem", paddingBottom: "3rem", marginBottom: "50px"}}>
          {firmaInfo?.length === 0 ? (
            <div>
                {navbarButtonHelper}
            </div>
          ): 
            null
          }
            <AddOpiekun
                idFirma={firmaIdO}
                user={user}
                dane={dane}
                addOpen={addOOpen}
                jakiOpiekun={jakiOpiekun}
                handleClose={handleAddOClose}
                addOpiekunFirma={addOpiekunFirma}
                delOpiekunFirma={delOpiekunFirma}
                onChange={onChangeAddOpiekun}
                object={opiekunObject}
                setChangeFirma={setChangeFirma}
                darkMode={darkMode}
            />
            <AddStudent
                idFirma={firmaIdS}
                infoOpiekun= {infoOpiekun}
                user={user}
                dane={dane}
                idOpiekuna={idOpiekuna}
                jakiOpiekun={jakiOpiekun}
                addOpen={addSOpen}
                handleClose={handleAddSClose}
                addStudentFirma={addStudentFirma}
                delStudentFirma={delStudentFirma}
                onChange={onChangeAddStudent}
                object={studentObject}
                setChangeFirma={setChangeFirma}
                darkMode={darkMode}
            />
            <AddFirma
                addOpen={addOpen}
                handleAddClose={handleAddClose}
                createFirma={createFirma}
                onChange={onChange}
                firmaObject={firmaObject}
                darkMode={darkMode}
            />
            <EditFirma
                open={firmaEditOpen}
                handleClose={handlefirmaEditClose}
                info={firmaEditInfo}
                operacja={updateFirma}
                onChange={onChangeEditFirma}
                setChange={setChangeNazwa}
                darkMode={darkMode}
            />
            <EditStudent
                open={studentEditOpen}
                handleClose={handleStudentEditClose}
                info={studentEditInfo}
                operacja={updateStudent}
                setChange={setChangeNazwa}
                setChangeNP =  {setChangeNP}
                setChangeCTP = {setChangeCTP}
                setChangePO =  {setChangePO}
                setChangePD =  {setChangePD}
                setChangeDP =  {setChangeDP}
                darkMode={darkMode}
            />

            {/* <SelectedFirma
                firma = { firmaEditInfo }
            /> */}

                  {firmaInfo?.length === 0 ? (
                    <div>
                        {wyszukiwarka}
                        {poFiltracji}
                    </div>
                  ): 
                    <div>
                        <SelectedFirma
                        firma = { firmaInfo }
                        back = { setfirmaInfo }
                        dane = { dane }
                        user = { user}
                        handlefirmaEditOpen = { handlefirmaEditOpen }
                        handleAddOOpen = { handleAddOOpen }
                        handleStudentEditOpen = { handleStudentEditOpen }
                        handleAddSOpen = { handleAddSOpen }
                        />
                    </div>
                  }

              
        </Container>

       

    </div>

  )
}

export default ListaOpiekunow