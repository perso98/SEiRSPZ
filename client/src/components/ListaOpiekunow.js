import React,{ useState, useEffect} from 'react'
import axios from 'axios'

import { Container, Grid} from '@mui/material'
import AddFirma from "./AddFirma";
import EditFirma from "./EditFirma";
import AddOpiekun from "./AddOpiekun";
import AddStudent from "./AddStudent";
import Button from "@mui/material/Button";
import { Typography, TextField, FormControl, FilledInput } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function ListaOpiekunow() {

    const [dane,setDane]=useState([])
    const [user,setUser]=useState([])
    const [firma,setFirma]=useState([])

    const [changeFirma, setChangeFirma] = useState();

    useEffect(()=>
    {
        axios.get("http://localhost:5000/api/getUser").then((res)=>{
            setUser(res.data)
        })

        axios.get("http://localhost:5000/api/getDane").then((res)=>{
            setDane(res.data)
        })

        axios.get("http://localhost:5000/api/getFirma").then((res)=>{
            setFirma(res.data)
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
        axios.post("http://localhost:5000/api/createFirma", {
          firmaObject:firmaObject
          })
          .then((res) => {
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
          });
      };
//Student

    const [addSOpen, setAddSOpen] = useState(false);

    const [firmaIdS, setFirmaSId] = useState([]);
    const [idOpiekuna, setIdOpiekuna] = useState();
    const [jakiOpiekun, setJakiOpiekun] = useState();
    

    const handleAddSClose = () => {
        setAddSOpen(false);
    };
    const handleAddSOpen = (firma, idOpiekuna, opiekunZorU) => {
        setFirmaSId(firma)
        setIdOpiekuna(idOpiekuna)
        setJakiOpiekun(opiekunZorU)
        setAddSOpen(true);
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

    const addStudentFirma = (id, firmaId, idOpiekuna, jakiOpiekun) => {
        axios.put("http://localhost:5000/api/addStudentFirma", {
          id: id,
          firmaId: firmaId,
          idOpiekuna: idOpiekuna,
          jakiOpiekun: jakiOpiekun,
        })
        .then((res) => {
            if(jakiOpiekun == 1){
                setUser(
                    user.map((val) => {
                        return val.id == id ? { ...val, firmaId: firmaId, id_opiekunZ: idOpiekuna } : val;
                    })
                );
            }
            if(jakiOpiekun == 0){
                setUser(
                    user.map((val) => {
                        return val.id == id ? { ...val, firmaId: firmaId, id_opiekunU: idOpiekuna } : val;
                    })
                );
            }
        });
      };


      const delStudentFirma = (id, jakiOpiekun) => {
        axios.put("http://localhost:5000/api/delStudentFirma", {
            id: id,
            jakiOpiekun: jakiOpiekun,
          })
          .then((res) => {
            if(jakiOpiekun == 1){
                setUser(
                    user.map((val) => {
                        return val.id == id ? { ...val, id_opiekunZ: null } : val;
                    })
                );
            }
            if(jakiOpiekun == 0){
                setUser(
                    user.map((val) => {
                        return val.id == id ? { ...val, id_opiekunU: null } : val;
                    })
                );
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
        axios.put("http://localhost:5000/api/addOpiekunFirma", {
            id: id,
            firmaId: firmaId
          })
          .then((res) => {
            setUser(
                user.map((val) => {
                  return val.id == id ? { ...val, firmaId: firmaId } : val;
                })
              );
          });
      };

      const delOpiekunFirma = (id, jakiOpiekun) => {
        axios.put("http://localhost:5000/api/delOpiekunFirma", {
            id: id,
            jakiOpiekun: jakiOpiekun
          })
          .then((res) => {
            setUser(
                user.map((val) => {
                  return val.id == id ? { ...val, firmaId: null } : val;
                })
              );
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
        axios.put("http://localhost:5000/api/updateFirma", {
            id: id,
            changeNazwa: changeNazwa,
          })
          .then((res) => {
            setFirma(
                firma.map((val) => {
                  return val.id == id ? { ...val, 
                    nazwa: res.data.editNazwa 
                } : val;
                })
              );
          });
      };

  return (
    <div>
        
        <Container style={{ paddingTop: "3rem", paddingBottom: "3rem", marginBottom: "50px"}}>
            <Button  variant="contained" onClick={handleAddOpen} style={{marginBottom: "20px"}}>
                Dodaj Zakład
            </Button>

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

            />
            <AddStudent
                idFirma={firmaIdS}
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
            />
            <AddFirma
                addOpen={addOpen}
                handleAddClose={handleAddClose}
                createFirma={createFirma}
                onChange={onChange}
                firmaObject={firmaObject}
            />
            <EditFirma
                open={firmaEditOpen}
                handleClose={handlefirmaEditClose}
                info={firmaEditInfo}
                operacja={updateFirma}
                onChange={onChangeEditFirma}
                setChange={setChangeNazwa}
            />
            <Grid container
                style={{
                justifyContent: "space-around",
                }}
            >
                {firma.map((firmaD) => (
                    <div
                    style={{
                        marginBottom:"30px",
                        backgroundImage: "linear-gradient(#073874, #042144)",
                        color: "white",
                        padding: "2rem",
                        display: "flex",
                        minWidth: "350px",
                        flexDirection: "column",
                        borderRadius: "25px",
                        boxShadow: " 0 0 5px black",
                    }}
                    >
                        <div style={{display: "flex", alignItems:"center", justifyContent: "flex-start"}}>
                            <div style={{display: "flex", marginRight:"5px"}}>
                            Firma: {firmaD.nazwa}
                            </div>
                            <div style={{display: "flex"}}>
                            <ModeEditIcon
                            fontSize="small"
                            onClick={()=> handlefirmaEditOpen(firmaD)}
                            />
                            </div>
                            
                        </div>
                        
                        <div
                        style={{ display: "flex", justifyContent: "space-between", marginBottom:"10px"}}
                        >
                            <div>
                            <h6>Opiekuni: </h6>
                            </div>
                            
                            <Button
                                onClick={() => {handleAddOOpen(firmaD)}}
                                variant="contained"
                                color="success"
                            >
                                Edycja Opiekunów
                            </Button>
                        
                        </div>

                        {user.map((val) => (
                            <Grid>
                                {( val.isOpiekunZakl === 1 || val.isOpiekun === 1 )  && val.firmaId === firmaD.id ? (
                                    <div>
                                        <div
                                        style={{ display: "flex", justifyContent: "space-between", flexDirection: "column-reverse" }}
                                        >
                                            { val.isOpiekunZakl === 1 ? (
                                                <div
                                                style={{ display: "flex", justifyContent: "space-between" }}
                                                >   
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        {/* <div>
                                                            Login: {val.login}
                                                        </div> */}
                                                        <div 
                                                        style={{fontSize:"11px"}}
                                                        >
                                                            (Opiekun zakładowy)
                                                        </div>
                                                    </Stack>
                                                    <Button
                                                    style={{ minWidth: '35px'}}
                                                    size="small"
                                                    onClick={() => {handleAddSOpen(firmaD, val.id, 1)}}
                                                    variant="contained"
                                                    color="success"
                                                    >
                                                    +/-
                                                    </Button>
                                                </div>
                                                ): 
                                                <div
                                                style={{ display: "flex", justifyContent: "space-between" }}
                                                >
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        {/* <div>
                                                            Login: {val.login}
                                                        </div> */}
                                                        <div 
                                                        style={{fontSize:"11px"}}
                                                        >
                                                            (Opiekun uczelniany)
                                                        </div>
                                                    </Stack>
                                                    <Button
                                                    style={{ minWidth: '35px'}}
                                                    size="small"
                                                    onClick={() => {handleAddSOpen(firmaD, val.id, 0)}}
                                                    variant="contained"
                                                    color="success"
                                                    >
                                                    +/-
                                                    </Button>
                                                </div>
                                            }
                                        
                                        </div>
                                            
                                        {dane.map((daneO) => (
                                            daneO.id === val.daneId ? (
                                                <div style={{marginBottom: "10px"}}>
                                                        
                                                        <div style={{display: "flex", gap: "0.4rem"}}>
                                                            {/* Imie i nazwisko: */}
                                                            <div>{daneO.imie}</div>
                                                            {daneO.nazwisko}
                                                        </div>
                                                </div>
                                            ): null
                                        ))
                                        }
                                        <h6 style={{ position: "flex" }}>Studenci: </h6>
                                        
                                        <div
                                        style={{ marginLeft: "15px", marginBottom:"15px"}}
                                        >
                                            {user.map((valStudent) => (
                                                <Grid>
                                                    {valStudent.isStudent === 1 && valStudent.firmaId === firmaD.id && ( valStudent.id_opiekunU === val.id || valStudent.id_opiekunZ === val.id) ? (
                                                        <div>
                                                            {/* <div style={{display: "flex", gap: "0.4rem"}}>
                                                                Login:<div>{valStudent.login}</div>
                                                            </div> */}
                                                        {dane.map((daneS) => (
                                                            daneS.id === valStudent.daneId ? (
                                                                <div style={{marginBottom: "10px"}}>
                                                                        
                                                                        <div style={{display: "flex", gap: "0.4rem"}}>
                                                                            {/* Imie i nazwisko: */}
                                                                            <div>{daneS.imie}</div>
                                                                            {daneS.nazwisko} <div>Indeks: {daneS.indeks}</div>
                                                                        </div>
                                                                        {/* <div style={{display: "flex", gap: "0.4rem"}}>
                                                                            Indeks:<div>{daneS.indeks}</div>
                                                                        </div> */}
                                                                </div>
                                                            ): null
                                                        ))}
                                                        </div>
                                                    ): null}
                                                </Grid>
                                            ))}
                                        </div>
                                    </div>
                                ): null}
                            </Grid>
                        ))}
                        
                        
                        
                    </div>
                ))}
            </Grid>
            <Button  variant="contained" onClick={handleAddOpen} style={{marginBottom: "40px"}}>
            Dodaj Zakład
            </Button>
        </Container>

       

    </div>

  )
}

export default ListaOpiekunow