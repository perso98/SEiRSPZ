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
import { Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import EditDay from "../components/EditDay";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
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

function Dzienniczek() {
  const classes = useStyles();

//  const [checkDay, setCheckDay] = useState(null);

  const [dziennik, setDziennik] = useState([]);

  const [dziennikZalaczniki, setDziennikZalaczniki] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${url}getDziennik`).then((res) => {
      setDziennik(res.data);
    });

    axios.get(`${url}getZalacznik`).then((res) => {
      setDziennikZalaczniki(res.data);
      setLoading(false);
    });
  }, []);

  // const [dayObject, setDayObject] = useState({
  //   userId: "",
  //   dzien: "",
  //   data: "",
  //   iloscGodzin: "",
  //   opis: "",
  // });

  // Edycja  dnia

  const [editOpen, setEditOpen] = useState(false);

  const [editDay, setEditDay] = useState(null);

  const handleEditClose = () => {
    setEditOpen(false);
    setEditDay()
    setChangeDzien();
    setChangeData();
    setChangeIloscGodzin();
    setChangeOpis();
    setChangeZalacznik();
  };
  const handleEditOpen = (val) => {
    setEditOpen(true);
    setEditDay(val);
  };

  const [dayObject2, setDayObject2] = useState({
    userId: "",
    dzien: "",
    data: "",
    iloscGodzin: "",
    opis: "",
  });

  const [changeDzien, setChangeDzien] = useState();
  const [changeData, setChangeData] = useState();
  const [changeIloscGodzin, setChangeIloscGodzin] = useState();
  const [changeOpis, setChangeOpis] = useState();

  const onChangeDay = (e) => {
    const { value, id } = e.target;
    setDayObject2({ ...dayObject2, [id]: value });
  };

  const createEditDay = (id, dzien, data, iloscGodzin, opis) => {
    axios
      .post(`${url}createEditDay`, {
        id: id,
        changeOpis: changeOpis,
        changeDzien: changeDzien,
        changeData: changeData,
        changeIloscGodzin: changeIloscGodzin,
      })
      .then((res) => {
        if (res.data.message === "Zmiana przeszła pomyślnie...") {
          setDziennik(
            dziennik.map((val) =>
              val.id === id
                ? {
                    ...val,
                    opis: res.data.editOpis,
                    dzien: res.data.editDzien,
                    data: res.data.editData,
                    ilosc_godzin: res.data.editIlosc_godzin,
                  }
                : val
            )
          )
          .then(() => {
            setChangeDzien();
            setChangeData();
            setChangeIloscGodzin();
            setChangeOpis();
          });
        }
        alert(res.data.message)
      })
      
  };

  const deleteDay = (id) => {
    const acceptDelete = window.confirm(`Czy pewno chcesz usunąć ?`);
    if (acceptDelete)
      axios
        .delete(`${url}deleteDay/${id}`)
        .then((res) => {})
        .then((res) => {
          setDziennik(
            dziennik.filter((val) => {
              return val.id !== id;
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
      return null;
    } else {
      data.append("file", changeZalacznik);
    }

    axios
      .post(`${url}upload/${id}`, data, {})
      .then((response) => {
        toast.success("Załadowano pomyślnie");
        // setChangeZalacznik(response.data)
      })
      .then(() => {
        setDziennikZalaczniki([
          ...dziennikZalaczniki,
          {
            id: 1,
          },
        ]).then(() => {
          setChangeZalacznik();
        });
      })
      .catch((e) => {
        toast.error("Błąd");
      });
  };

  const deleteZalacznik = (id) => {
    axios
      .delete(`${url}deleteZalacznik/${id}`)
      .then((res) => {})
      .then((res) => {
        setDziennikZalaczniki(
          dziennikZalaczniki.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  // dodawanie dnia

  // const [addOpen, setAddOpen] = useState(false);

  // const handleAddClose = () => {
  //   setAddOpen(false);
  // };
  const handleAddOpen = () => {
    createDay2()
    // setAddOpen(true);
  };

  // const onChange = (e) => {
  //   const { value, id } = e.target;
  //   setDayObject({ ...dayObject, [id]: value });
  // };

 

  const createDay2 = () => {
    axios
      .post(`${url}createDay2`, {
      })
      .then((res) => {
        if (res.data.message === "Dzień został pomyślnie dodany") {
          setDziennik([
            ...dziennik,
            {
              id: res.data.id,
              userId: "",
              dzien:"",
              data:"",
              ilosc_godzin:"",
              opis:"",
              statusOpiekunaU: "Nie wysłano",
              statusOpiekunaZ: "Nie wysłano",
            },
          ]);
          const dayObject3 = ({
            id: res.data.id,
            userId: "",
            dzien:"",
            data:"",
            ilosc_godzin:"",
            opis:"",
            statusOpiekunaU: "Nie wysłano",
            statusOpiekunaZ: "Nie wysłano",
          });
          handleEditOpen(dayObject3)
        }
      })
  };

  // const createDay = () => {
  //   axios
  //     .post(`${url}createDay`, {
  //       dayObject: dayObject,
  //     })
  //     .then((res) => {
  //       if (res.data.message === "Dzień został pomyślnie dodany") {
  //         setDziennik([
  //           ...dziennik,
  //           {
  //             id: res.data.id,
  //             userId: dayObject.login,
  //             dzien: dayObject.dzien,
  //             data: dayObject.data,
  //             ilosc_godzin: dayObject.iloscGodzin,
  //             opis: dayObject.opis,
  //             statusOpiekunaU: "Oczekiwanie",
  //             statusOpiekunaZ: "Oczekiwanie",
  //           },
  //         ]);
  //         setDayObject({
  //           ...dayObject,
  //           userId: "",
  //           dzien: "",
  //           data: "",
  //           iloscGodzin: "",
  //           opis: "",
  //         });
  //       }

  //       alert(res.data.message);
  //     });
  // };

  const sendDay = (id) => {
    axios
      .post(`${url}sendDay`, {
        id: id,
      })
      .then((res) => {
        if (res.data.message === "Wysłano") {
          setDziennik(
            dziennik.map((val) =>
              val.id === id
                ? {
                    ...val,
                    statusOpiekunaU: val.statusOpiekunaU === "Zaakceptowano" ? (
                      "Zaakceptowano"
                    ) : "Oczekiwanie",
                    statusOpiekunaZ: val.statusOpiekunaZ === "Zaakceptowano" ? (
                      "Zaakceptowano"
                    ) : "Oczekiwanie"
                  }
                : val
            )
          )
        }
      })
  };

  const HeadCells = [
    { id: "dzien", label: "Dzień" },
    { id: "data", label: "Data" },
    { id: "opis", label: "Opis" },
    { id: "statusOU", label: "Status opiekuna uczelnianego" },
    { id: "statusOZ", label: "Status opiekuna zakładowego" },
    { id: "edycja", label: "Edycja" },
  ];


  //
  const maxCharacter = (string, int) => {
    return string.slice(0, int);
  };

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));

  const infomacja = (
    <div>
      <div>
        Przycisk "DODAJ NOWY DZIEŃ" dodaje nam dzień w którym wprowadzamy informację o dniu.
      </div>
      <div>
        Przycisk "ZMIEŃ" zapisuje informację danego dnia, lecz ich nie wysyła. 
      </div>
      <div>
        Przycisk "WYŚLIJ" wysyła zapisany dzień do oceny, zmienia się wtedy status na "Oczekiwanie" i Twój Opiekun może ocenić ten dzień.
      </div>
      <div>
        Przycisk "USUŃ" usuwa bezpowrotnie wszystkie informację o daym dniu oraz status jego akceptacji.
      </div>
      <div>
        Przycisk <EditIcon style={{ color: "#FF8C00" }}/> Przycisk edycji pozawla na edycję danego dnia. 
      </div>
      <div>
      Przycisk "EFEKTY UCZENIA SIĘ" przekierowuje nas do efektów. 
      </div>
    </div>
  );


  const count = () => {
    let za = 0
    let Od = 0
    let Oc = 0
    dziennik.map((val) => {
      if( val.statusOpiekunaU === "Zaakceptowano" ){
        za++
      }
      if( val.statusOpiekunaU === "Odrzucono" ){
        Od++
      }
      if( val.statusOpiekunaU === "Oczekiwanie" ){
        Oc++
      }
    })

    return <div>Dar {za} {Od} {Oc}</div>
  };


  return (
    <div className={classes.containerMain}>
      <Grid container>
        <Grid xs={12} md={12}>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div style={{ overflowX: "auto" }}>
              <div style={{ justifyContent: "space-between", display: "flex" , alignItems: "center"}}>
                <Button className={classes.links} style={{height: "52px" }} variant="contained" onClick={handleAddOpen}>
                  Dodaj nowy dzień
                </Button>
                {count()}
                <Helper info={infomacja} title="Dzienniczek" napis={""}/>
                <Button variant="contained">
                <Link to="/efekty" className={classes.links}>
                  <div className={classes.item}>
                    <Typography className={classes.text}>
                    Efekty Uczenia się
                    </Typography>
                  </div>
                </Link>
                </Button>
              </div>
                <Table className={classes.table}>
                  <TableHead className={classes.tableHead}>
                    <TableRow>
                      {HeadCells.map((head) => (
                        <TableCell style={{ textAlign: "center" }} key={head.id}>
                          {head.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading === true && <TableRow>Ładowanie...</TableRow>}
                    {dziennik.map((val) => (
                      <TableRow key={val.id}>
                        <TableCell
                          style={{ maxWidth: "100px", wordWrap: "break-word" }}
                        >
                          {val.dzien}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                        {val.data}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                        <div style={{ wordWrap: "break-word", minWidth: "120px", maxWidth: "180px" }}>
                          {val.opis.length < 26 ? (
                            <div>{val.opis}</div>
                          ) : (
                            <div>{maxCharacter(val.opis, 35)}...</div>
                          )}
                        </div>
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                        <div style={{ color: val.statusOpiekunaU === "Odrzucono" ? ("red"): val.statusOpiekunaU === "Zaakceptowano" ? ("green"):null }}>{val.statusOpiekunaU}</div>
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                        <div style={{ color: val.statusOpiekunaZ === "Odrzucono" ? ("red"): val.statusOpiekunaZ === "Zaakceptowano" ? ("green"):null }}>{val.statusOpiekunaZ}</div>
                        </TableCell>
                        <TableCell>
                          <IconButton
                          >
                            <EditIcon style={{ color: "#FF8C00" }} 
                            onClick={() => {
                              handleEditOpen(val);
                            }}/>
                          </IconButton>
                        
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

        </Grid>
        
      </Grid>

      
      <EditDay
        editOpen={editOpen}
        setChangeZalacznik={setChangeZalacznik}
        zalaczniki={dziennikZalaczniki}
        sendDay = {sendDay}
        deleteZalacznik={deleteZalacznik}
        addZalacznik={addZalacznik}
        setDziennikZalaczniki={setDziennikZalaczniki}
        handleEditClose={handleEditClose}
        editDay={editDay}
        deleteDay={deleteDay}
        onChangeDay={onChangeDay}
        createEditDay={createEditDay}
        setChangeOpis={setChangeOpis}
        setChangeDzien={setChangeDzien}
        setChangeData={setChangeData}
        setChangeIloscGodzin={setChangeIloscGodzin}
      />

      {/* <AddDayDialog
        addOpen={addOpen}
        handleAddClose={handleAddClose}
        createDay={createDay}
        onChange={onChange}
        dayObject={dayObject}
      /> */}
    </div>
  );
}

export default Dzienniczek;
