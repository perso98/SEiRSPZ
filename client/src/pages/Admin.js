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
  //  Tooltip,
} from "@material-ui/core";

import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAdminDialog from "../components/AddAdminDialog";
import EditAdminDialog from "../components/EditAdminDialog";
import { ToastContainer, toast } from "react-toastify";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { url } from "../services/Url";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Helper from "../components/Helper";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),

    "& thead th": {
      fontWeight: "600",
      color: "white",
    },
  },
  button: {
    [theme.breakpoints.down("s")]: {
      width: "39%",
      fontSize: "6px",
    },
  },
  tableHead: {
    background: "#08448c",
  },
  searchInp: {
    width: "80%",
  },
  toolbar: {
    marginTop: "1rem",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  NoData: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "600",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));
export default function Admin(props) {
  const classes = useStyles();
  const [changeLogin, setChangeLogin] = useState();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(true);
  const [yearSearch, setYearSearch] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${url}getStudents`).then((res) => {
      if (res.data.message) {
        props.setStatus();
        alert(res.data.message).then(() => {
          navigate("/login");
        });
      } else {
        setStudents(res.data);
        setLoading(false);
      }
    });
  }, []);

  const pages = [7, 15, 20];
  const [page, setPage] = useState(0);
  const [pageRows, setpageRows] = useState(pages[page]);
  const [searchLogin, setSearchLogin] = useState("");

  const HeadCells = [
    { id: "login", label: "E-mail" },
    { id: "isStudent", label: "Student" },
    { id: "isAdmin", label: "Admin" },
    { id: "isOpiekunZakl", label: "Opiekun Z." },
    { id: "isOpiekun", label: "Opiekun U." },
    { id: "isDyrektor", label: "Dyrektor" },
    { id: "isDziekanat", label: "Dziekanat" },
    { id: "year", label: "Rok utworzenia" },
    { id: "Actions", label: "Akcje" },
  ];

  const deleteUser = (id, login) => {
    const acceptDelete = window.confirm(
      `Czy na pewno chcesz usunąć użytkownika ${login} oraz wszystkie jego połączenia danych (dni,komentarze,efekty uczenia się itd)?`
    );
    if (acceptDelete)
      axios.delete(`${url}deleteUser/${id}`).then((res) => {
        if (res.data.message) {
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
        } else {
          toast.success(res.data.message2);
          setStudents(
            students.filter((val) => {
              return val.id !== id;
            })
          );
        }
      });
  };
  const [addOpen, setAddOpen] = useState(false);

  const handleAddClose = () => {
    setAddOpen(false);
  };
  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const [userObject, setUserObject] = useState({
    login: "",
    password: "",
    admin: 0,
    opiekunU: 0,
    opiekunZ: 0,
    student: 0,
    dziekanat: 0,
    dyrektor: 0,
  });
  const onChange = (e) => {
    const { value, id } = e.target;
    setUserObject({ ...userObject, [id]: value });
  };
  const onClick = (e, number) => {
    const { id } = e.currentTarget;
    setUserObject({ ...userObject, [id]: number });
  };
  const createAcc = () => {
    axios
      .post(`${url}createAccount2`, {
        userObject: userObject,
      })
      .then((res) => {
        if (res.data.message1) {
          props.setStatus();
          alert(res.data.message1).then(() => {
            navigate("/login");
          });
        } else {
          if (res.data.message2 === "Konto zostało pomyślnie utworzone") {
            setStudents([
              ...students,
              {
                id: res.data.id,
                login: userObject.login,
                password: userObject.password,
                isOpiekunZakl: userObject.opiekunZ,
                isAdmin: userObject.admin,
                isDyrektor: userObject.dyrektor,
                isOpiekun: userObject.opiekunU,
                isDziekanat: userObject.dziekanat,
                isStudent: userObject.student,
              },
            ]);
            setUserObject({ ...userObject, login: "", password: "" });
          }

          toast.success(res.data.message2);
        }
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setpageRows(parseInt(event.target.value, 10));
    setPage(0);
  };
  const recordsAfterFiltering = students.filter((val) => {
    if (searchLogin === "" && yearSearch === "") {
      return val;
    } else if (searchLogin !== "") {
      return val.login.toLowerCase().includes(searchLogin.toLowerCase());
    } else if (yearSearch !== "") {
      return val.createdAt.split("-")[0] === yearSearch;
    }
  });

  const recordsAfter = () => {
    return recordsAfterFiltering.slice(page * pageRows, (page + 1) * pageRows);
  };

  const changeConfirmation = (id, confirmation) => {
    axios
      .put(`${url}changeConfirmation`, { id: id, confirmation: confirmation })
      .then((res) => {
        if (res.data.session) window.location.reload(false);
        if (res.data.message) {
          toast.success(res.data.message);
        }
      });
  };
  const updateRole = (action, type, id) => {
    const windowConfirm = window.confirm(
      `Czy na pewno chcesz zmienić użytkownikowi rolę ${action}?`
    );

    if (windowConfirm)
      axios
        .put(`${url}changeRole`, {
          action: action,
          type: type,
          id: id,
        })
        .then((res) => {
          if (res.data.message) {
            props.setStatus();
            alert(res.data.message).then(() => {
              navigate("/login");
            });
          } else {
            toast.success("Rola zmieniona");
            setStudents(
              students.map((val) => {
                return val.id === id ? { ...val, [action]: type } : val;
              })
            );
          }
        });
  };

  const deleteYear = (yearSearch) => {
    const acceptDelete = window.confirm(
      `Czy na pewno chcesz usunąć użytkowników z roku ${yearSearch} oraz wszystkich ich połączeniach z bazą danych?`
    );
    if (acceptDelete)
      axios.delete(`${url}deleteYear/${yearSearch}`).then((res) => {
        if (res.data.message) {
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
        } else {
          if (res.data.message2 === "Usunięto")
            setStudents(
              students.filter((val) => {
                return (
                  (val.createdAt.split("-")[0] !== yearSearch &&
                    val.isAdmin === 1) ||
                  val.isDziekanat === 1 ||
                  val.isOpiekun === 1 ||
                  val.isOpiekunZakl === 1 ||
                  val.isDyrektor === 1
                );
              })
            );
          else alert(res.data.message2);
        }
      });
  };

  const giveButton = (action, id) => {
    return (
      <IconButton
        onClick={() => {
          updateRole(action, 0, id);
        }}
      >
        <CheckCircleOutlineIcon style={{ color: "green" }} />
      </IconButton>
    );
  };

  const takeButton = (action, id) => {
    return (
      <IconButton
        onClick={() => {
          updateRole(action, 1, id);
        }}
      >
        <HighlightOffIcon style={{ color: "red" }} />
      </IconButton>
    );
  };
  const handleEditClose = () => {
    setChangeLogin();
    setEditOpen(false);
  };
  const [editStudent, setEditStudent] = useState(null);
  const handleOpen = (student) => {
    setEditStudent(student);
    setEditOpen(true);
  };

  const changeUserInfo = (id) => {
    axios
      .put(`${url}changeUserInfo`, {
        id: id,
        changeLogin: changeLogin,
      })
      .then((res) => {
        if (res.data.message) {
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
        } else {
          if (changeLogin.length > 0)
            setStudents(
              students.map((val) => {
                return val.id === id ? { ...val, login: changeLogin } : val;
              })
            );
        }
      });
  };
  const functionToggleSearch = () => {
    if (toggleSearch === true) {
      setToggleSearch(false);
      setSearchLogin("");
    } else {
      setToggleSearch(true);
      setYearSearch("");
    }
  };
  const info = (
    <div>
      Po lewej od przycisku <HelpOutlineOutlined />, możesz wyszukać
      użytkowników po e-mailu. <br />
      Jeśli chcesz wyszukać po roku utworzenia, wystarczy zmienić opcje
      szukania, za które odpowiada przycisk "ZMIEŃ OPCJE SZUKANIA". <br />{" "}
      Jeżeli twoim celem jest archiwizacja jakiegoś roku wystarczy wpisać rok a
      następnie nacisnąć przycisk "USUŃ WSZYSTKICH Z ROKU *"
      <br /> *UWAGA TA OPCJA USUWA UŻYTKOWNIKÓW, KTÓRZY NIE MAJĄ INNEJ ROLI NIŻ
      STUDENT* (Możesz usunąc tylko lata wcześniejsze o 3 od dzisiejszego roku).{" "}
      <br />
      Po prawej od przycisku <HelpOutlineOutlined /> możesz dodać nowego
      użytkownika wraz z nadaniem mu ról.
      <br />
      <HighlightOffIcon /> Ta ikona zwiastuje iż nie ma tej roli, <br />
      <CheckCircleOutlineIcon /> natomiast ta, że ją ma. <br />
      Możesz także zmienić role poniżej w tabelce już utworzonych użytkowników,
      aby tego dokonać, należy podwójnie kliknąć na ikonkę <HighlightOffIcon />{" "}
      (aby nadać rolę) lub <CheckCircleOutlineIcon />
      (aby odebrać rolę). <br />
      <br /> Rola Student = student ma tylko możliwość do prowadzenia
      dzienniczka praktyk oraz uczenia się.
      <br /> Rola Admin = admin ma możliwość dostępu do panelu admina (czyli tej
      strony).
      <br /> Rola Opiekun U. = opiekun uczelniany ma możliwość oceniania
      dzienniczka przypisanych studentów oraz ich efektów uczenia się.
      <br /> Rola Opiekun Z. = opiekun zakładowy ma możliwość oceniania
      dzienniczka przypisanych studentów.
      <br />
      Rola Dyrektor = dyrektor ma możliwość udzielenia zastępsta za opiekuna
      uczelnianego.
      <br />
      Rola Dziekanat = dziekanat ma możliwość przypisawania studentów do
      opiekunów w zakładach.
      <br />
      <br />
      Akcje w tabelce pozwalają na edycję użytkownika <EditIcon /> <br />
      oraz za usunięcie jego <DeleteIcon /> (jeżeli ten przycisk jest czerwony,
      to możesz usunąc użytkownika, w innym razie musisz odebrać mu role).{" "}
      <br />
      *UWAGA TA OPCJA USUWA UŻYTKOWNIKÓW, KTÓRZY NIE MAJĄ INNEJ ROLI NIŻ
      STUDENT*
    </div>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "2rem",
          background: props.darkMode == "white" ? "white" : "#242424",
        }}
      >
        <div />
        <div style={{ overflowX: "auto" }}>
          <Toolbar className={classes.toolbar}>
            {toggleSearch === true ? (
              <TextField
                className={classes.searchInp}
                label="Szukaj po e-mailu"
                variant="outlined"
                value={searchLogin}
                inputProps={{
                  style: {
                    color: props.darkMode == "white" ? "black" : "white",
                    classes: {
                      notchedOutline:
                        props.darkMode == "white"
                          ? null
                          : classes.notchedOutline,
                    },
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: props.darkMode == "white" ? "black" : "white",
                  },
                }}
                InputProps={{
                  classes: {
                    notchedOutline:
                      props.darkMode == "white" ? null : classes.notchedOutline,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{
                          color: props.darkMode == "white" ? "black" : "white",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setSearchLogin(e.target.value);
                  setPage(0);
                }}
              />
            ) : (
              <TextField
                className={classes.searchInp}
                type="number"
                value={yearSearch}
                label="Szukaj po roku utworzenia"
                variant="outlined"
                inputProps={{
                  style: {
                    color: props.darkMode == "white" ? "black" : "white",
                    classes: {
                      notchedOutline:
                        props.darkMode == "white"
                          ? null
                          : classes.notchedOutline,
                    },
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: props.darkMode == "white" ? "black" : "white",
                  },
                }}
                InputProps={{
                  classes: {
                    notchedOutline:
                      props.darkMode == "white" ? null : classes.notchedOutline,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{
                          color: props.darkMode == "white" ? "black" : "white",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setYearSearch(e.target.value);
                  setPage(0);
                }}
              />
            )}
            <Helper info={info} title="Pomoc admin" darkMode={props.darkMode} />
            <Button
              variant="contained"
              onClick={handleAddOpen}
              className={classes.button}
            >
              Dodaj użytkownika
            </Button>
          </Toolbar>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              onClick={() => {
                functionToggleSearch();
              }}
              style={{ margin: "1.5rem" }}
            >
              {" "}
              Zmień opcje szukania
            </Button>
            {yearSearch > 2000 &&
            yearSearch < 3000 &&
            yearSearch < new Date().getFullYear() - 3 &&
            recordsAfterFiltering.length > 0 ? (
              <Button
                variant="contained"
                color="error"
                style={{ margin: "1.5rem" }}
                onClick={() => {
                  deleteYear(yearSearch);
                }}
              >
                Usuń wszystkich z roku {yearSearch}
              </Button>
            ) : null}
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
              {loading === true && (
                <TableRow
                  style={{
                    color: props.darkMode == "white" ? "black" : "white",
                  }}
                >
                  Ładowanie...
                </TableRow>
              )}
              {recordsAfterFiltering.length === 0 && loading === false && (
                <TableRow
                  className={classes.NoData}
                  style={{
                    margin: "1rem",
                    color: props.darkMode === "white" ? "black" : "white",
                  }}
                >
                  Brak danych...
                </TableRow>
              )}

              {recordsAfter().map((val) => (
                <TableRow key={val.id}>
                  <TableCell
                    style={{
                      maxWidth: "100px",
                      wordWrap: "break-word",

                      color: props.darkMode == "white" ? "black" : "white",
                    }}
                  >
                    {val.login}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {val.isStudent === 0
                      ? takeButton("isStudent", val.id)
                      : giveButton("isStudent", val.id)}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {val.isAdmin === 0
                      ? takeButton("isAdmin", val.id)
                      : giveButton("isAdmin", val.id)}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {val.isOpiekunZakl === 0
                      ? takeButton("isOpiekunZakl", val.id)
                      : giveButton("isOpiekunZakl", val.id)}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {val.isOpiekun === 0
                      ? takeButton("isOpiekun", val.id)
                      : giveButton("isOpiekun", val.id)}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {val.isDyrektor === 0
                      ? takeButton("isDyrektor", val.id)
                      : giveButton("isDyrektor", val.id)}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {val.isDziekanat === 0
                      ? takeButton("isDziekanat", val.id)
                      : giveButton("isDziekanat", val.id)}
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: props.darkMode == "white" ? "black" : "white",
                    }}
                  >
                    {val.createdAt.split("-")[0]}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleOpen(val);
                      }}
                    >
                      <EditIcon style={{ color: "#FF8C00" }} />
                    </IconButton>
                    <IconButton>
                      {val.isOpiekun ||
                      val.isOpiekunZakl ||
                      val.isAdmin ||
                      val.isDziekanat ||
                      val.isDyrektor ? (
                        <DeleteIcon style={{ color: "gray" }} disabled="true" />
                      ) : (
                        <DeleteIcon
                          style={{ color: "#A52A2A" }}
                          onClick={() => {
                            deleteUser(val.id, val.login);
                          }}
                        />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TablePagination
              style={{
                color: props.darkMode == "white" ? "black" : "white",
                overflowX: "auto",
              }}
              component="div"
              page={page}
              rowsPerPageOptions={pages}
              rowsPerPage={pageRows}
              count={recordsAfterFiltering.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </div>
        <div />
      </div>
      <AddAdminDialog
        addOpen={addOpen}
        handleAddClose={handleAddClose}
        onChange={onChange}
        userObject={userObject}
        createAcc={createAcc}
        onClick={onClick}
        darkMode={props.darkMode}
      />
      <EditAdminDialog
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        editStudent={editStudent}
        changeUserInfo={changeUserInfo}
        setChangeLogin={setChangeLogin}
        darkMode={props.darkMode}
        changeConfirmation={changeConfirmation}
      />

      <ToastContainer autoClose={1000} />
    </>
  );
}
