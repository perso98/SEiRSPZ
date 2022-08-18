import React,{ useState, useEffect} from 'react'
import axios from 'axios'

import { Container, Grid} from '@mui/material'
import AddFirma from "./AddFirma";
import AddOpiekun from "./AddOpiekun";
import AddStudent from "./AddStudent";
import Button from "@mui/material/Button";

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

const [firmaIdS, setFirmaSId] = useState(false);
    const handleAddSClose = () => {
        setAddSOpen(false);
    };
    const handleAddSOpen = (val) => {
        setFirmaSId(val)
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

    const addStudentFirma = (id, firmaId) => {
        axios.post("http://localhost:5000/api/addStudentFirma", {
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

      const delOpiekunFirma = (id, firmaId) => {
        axios.put("http://localhost:5000/api/delOpiekunFirma", {
            id: id,
            firmaId: firmaId
          })
          .then((res) => {
            setUser(
                user.map((val) => {
                  return val.id == id ? { ...val, firmaId: null } : val;
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
            addOpen={addSOpen}
            handleClose={handleAddSClose}
            addOpiekunFirma={addOpiekunFirma}
            delOpiekunFirma={delOpiekunFirma}
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
                    
                    
                    <div style={{display: "flex", gap: "0.4rem"}}>
                        Firma:
                        <div >
                            {firmaD.nazwa}
                        </div>
                    </div>
                    
                    <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                    >
                    <h6 style={{ textAlign: "center" }}>Opiekuni: </h6>
                    <Button
                        onClick={() => {handleAddOOpen(firmaD)}}
                        variant="contained"
                        color="warning"
                    >
                        Dodaj
                    </Button>
                    
                    </div>

                    {user.map((val) => (
                        <Grid>
                            {( val.isOpiekunZakl === 1 || val.isOpiekun === 1 )  && val.firmaId === firmaD.id ? (
                                dane.map((daneO) => (
                                    daneO.id === val.daneId ? (
                                        <div style={{marginBottom: "10px"}}>
                                                <div style={{display: "flex", gap: "0.4rem"}}>
                                                    Login:<div>{val.login}</div>
                                                </div>
                                                <div style={{display: "flex", gap: "0.4rem"}}>
                                                    Imie i naziwkso:<div>{daneO.imie}</div>
                                                    {daneO.nazwisko}
                                                </div>
                                        </div>
                                    ): null
                                ))
                            ): null}
                        </Grid>
                    ))}
                    <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                    >
                    <h6 style={{ textAlign: "center" }}>Studenci: </h6>
                    <Button
                        onClick={() => {handleAddSOpen(firmaD)}}
                        variant="contained"
                        color="warning"
                    >
                        Dodaj
                    </Button>
                    
                    </div>
                    
                    {user.map((val) => (
                        <Grid>
                            {val.isStudent === 1 && val.firmaId === firmaD.id ? (
                                dane.map((daneS) => (
                                    daneS.id === val.daneId ? (
                                        <div style={{marginBottom: "10px"}}>
                                                <div style={{display: "flex", gap: "0.4rem"}}>
                                                    Login:<div>{val.login}</div>
                                                </div>
                                                <div style={{display: "flex", gap: "0.4rem"}}>
                                                    Imie i naziwkso:<div>{daneS.imie}</div>
                                                    {daneS.nazwisko}
                                                </div>
                                                <div style={{display: "flex", gap: "0.4rem"}}>
                                                    Indeks:<div>{daneS.indeks}</div>
                                                </div>
                                        </div>
                                    ): null
                                ))
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