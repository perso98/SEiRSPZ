import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { url } from "../services/Url";
import { Link } from "react-router-dom";
import { Typography, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import EfektUzasadnienie from "../components/EfektUzasadnienie";
import "react-toastify/dist/ReactToastify.css";
import Helper from "../components/Helper";

const useStyles = makeStyles((theme) => ({
  containerMain: {
    fontSize: "12px",
    margin: "15px",
    height: "100%",
    marginBottom: "100px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "15px",
    },
  },

  nowyDzienBTN: {
    marginBottom: "15px",
  },
  btnEdycja: {
    fontSize: "12px",
  },
  table: {
    marginTop: theme.spacing(2),

    "& thead th": {
      fontWeight: "600",
      color: "white",
    },
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      width: "39%",
    },
  },
  tableHead: {
    background: "#08448c",
  },
  searchInp: {
    width: "80%",
    marginRight: "1rem",
  },
  toolbar: {
    marginTop: "2%",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  NoData: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "600",
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(1),
      cursor: "pointer",
    },
  },
  links: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      color: "yellow",
      textDecoration: "none",
    },
  },
}));

function EfektyUzasadnienie() {
  const classes = useStyles();

  const [listaEfektyow, setListaEfektyow] = useState([]);
  const [idUser, setIdUser] = useState([]);

  // const [listEfektyStudent, setListEfektyStudent] = useState([]);

  const [loading, setLoading] = useState(true);


    useEffect(() => {
      axios.get(`${url}getEfektUczenia`).then((res) => {
        setListaEfektyow(res.data);
    })
      axios.get(`${url}IdUser`).then((res) => {
        setIdUser(res.data);
    });
    setLoading(false)
    }, []);



  // const [efektId, setEfektId] = useState();

  const [efekt, setEfekt] = useState([]);

  const[komentarz, setKomentarz] = useState([]);
  const[infoEfekt, setInfoEfekt] = useState([]);
  // const hoverClose = () => {
  //     setEfektId()
  // };
  // const hoverOpen = (val) => {
  //     setEfektId(val.id)
  // };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
      setOpen(false)
      setKomentarz()
  };
  const handleOpen = (val) => {
      axios.get(`${url}listEfektyStudent/${val.id}`,{
      }).then((res) => {
        setKomentarz(res.data.komentarz);
        setInfoEfekt(res.data);
        console.log(res.data)
    });
      setOpen(true)
      setEfekt(val)
  };

  const updateUzasadnienieEfektu = () => {
    console.log("Komentarz  id" + infoEfekt.id)
    axios.put(`${url}updateUzasadnienieEfektu`, {
      id: infoEfekt.id,
      komentarz: komentarz,
      })
  };
  const infomacja = (
    <div>
      <div>
        W tym panleu widzisz wszystkie swoje efekty uczenia się, jeśli ich nie widzisz to musisz wybrać swój Kierunek oraz Specjalność w panelu "Konto".
      </div>
      <div>
        Każdy efekt opisuje czego dotyczy oraz informuje w jaki sposób można go spełnić.
      </div>
      <div>
        Efekty uczenia się to Twój sposób zaliczenia praktyk, musisz w nich uzasadnić w jaki sposób podczas praktyk osiągnołeś/ełaś dany efekt.
      </div>
    </div>
  );

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      }}>
      <div/>
      <Grid>
        <div className={classes.containerMain}>
            <EfektUzasadnienie
                open={open}
                handleClose={handleClose}
                idUser={idUser}
                info={efekt}
                operacja={updateUzasadnienieEfektu}
                set={setKomentarz}
                komentarze={komentarz}
            />
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              }}
              className={classes.nowyDzienBTN}>
                <Button variant="contained">
                <Link to="/dzienniczek" className={classes.links}>
                <div className={classes.item}>
                    <Typography className={classes.text}>
                    Dzienniczek
                    </Typography>
                </div>
                </Link>
                </Button>
                <Helper info={infomacja} title="Pomoc Efekty Uczenia się" napis={""}/>
            </div>
            <Table className={classes.table}>
                  <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell style={{ textAlign: "center" }} >
                          Lista efektów do realizacji
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }} >
                          Uzasadnienie
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {loading === false ?(
                      listaEfektyow.message === "Wybierz specjalność" ?(
                        <div>Wybierz specjalność w panelu Konto aby pojawiły się efekty uczenia się</div>
                      ): 
                        listaEfektyow.map((val) => (
                            <TableRow >
                              <TableCell style={{ wordWrap: "break-word", maxWidth: "500px", textAlign: "center" }}>
                                {val.opis}
                              </TableCell>
    
                              <TableCell style={{ textAlign: "center" }}>
                              <Button className={classes.btnEdycja} 
                                        variant="contained" 
                                        onClick={() => { handleOpen(val)}}
                                    >
                                        Uzasadnij
                                    </Button>
                              </TableCell>
                            </TableRow>
                          ))
                  ): <div>Ładowanie...</div>
                  }
                  </TableBody>
                </Table>
            </div>
      </Grid>
      <div/>
    </div>
  );
}

export default EfektyUzasadnienie;
