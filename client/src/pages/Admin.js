import axios, * as others from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  TextField,
  Button,
  //  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import React, { useState, useEffect, useContext } from "react";
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
import { url } from "../services/Url";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Helper from "../components/Helper";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";
import { ThemeContext } from "../context/ThemeContext";
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
  const [yearFilter, setYearFilter] = useState("Wszystkie");
  const [confirmed, setConfirmed] = useState(false);
  const [notConfirmed, setNotConfirmed] = useState(false);
  const [all, setAll] = useState(true);
  const [changeLogin, setChangeLogin] = useState();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(0);
  const [yearSearch, setYearSearch] = useState("");
  const [surnameSearch, setSurnameSearch] = useState("");
  const [firmaSearch, setFirmaSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("Wszyscy");
  const [changePassword, setChangePassword] = useState("");
  const [changePassword2, setChangePassword2] = useState("");
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
  const [darkMode] = useContext(ThemeContext);
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
    imie: "",
    nazwisko: "",
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
          if (res.data.id) {
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
                dane: { imie: userObject.imie, nazwisko: userObject.nazwisko },
                createdAt: res.data.createdAt,
                confirmation: 1,
              },
            ]);
            setUserObject({
              ...userObject,
              login: "",
              password: "",
              imie: "",
              nazwisko: "",
            });
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
  const yearArray = [];
  const recordsAfterFiltering = students.filter((val) => {
    if (!yearArray.includes(val.createdAt.split("-")[0]))
      yearArray.push(val.createdAt.split("-")[0]);
    if (all) {
      if (searchLogin === "" && surnameSearch === "" && firmaSearch === "") {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy" ? val[roleSearch] == 1 : val;
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 && val.createdAt.split("-")[0] === yearFilter
            : val && val.createdAt.split("-")[0] === yearFilter;
      } else if (searchLogin !== "") {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase())
            : val &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase());
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter
            : val &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter;
      } else if (surnameSearch !== "") {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val?.dane?.nazwisko
                  ?.toLowerCase()
                  .includes(surnameSearch?.toLowerCase())
            : val?.dane?.nazwisko
                ?.toLowerCase()
                ?.includes(surnameSearch?.toLowerCase());
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val?.dane?.nazwisko
                  ?.toLowerCase()
                  .includes(surnameSearch?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter
            : val?.dane?.nazwisko
                ?.toLowerCase()
                ?.includes(surnameSearch?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter;
      } else if (firmaSearch !== "") {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1
            : val.firma?.nazwa
                .toLowerCase()
                .includes(firmaSearch.toLowerCase());
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 && val.createdAt.split("-")[0] === yearFilter
            : val.firma?.nazwa
                .toLowerCase()
                .includes(firmaSearch.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter;
      }
    }
    if (confirmed) {
      if (
        searchLogin === "" &&
        val.confirmation == 1 &&
        surnameSearch === "" &&
        firmaSearch === ""
      ) {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy" ? val[roleSearch] == 1 : val;
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 && val.createdAt.split("-")[0] === yearFilter
            : val && val.createdAt.split("-")[0] === yearFilter;
      } else if (searchLogin !== "" && val.confirmation == 1) {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase())
            : val &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase());
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter
            : val &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter;
      } else if (surnameSearch !== "" && val.confirmation == 1) {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val?.dane?.nazwisko
                  ?.toLowerCase()
                  .includes(surnameSearch?.toLowerCase())
            : val?.dane?.nazwisko
                ?.toLowerCase()
                ?.includes(surnameSearch?.toLowerCase());
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val?.dane?.nazwisko
                  ?.toLowerCase()
                  .includes(surnameSearch?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter
            : val?.dane?.nazwisko
                ?.toLowerCase()
                ?.includes(surnameSearch?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter;
      } else if (firmaSearch !== "" && val.confirmation == 1) {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1
            : val.firma?.nazwa
                .toLowerCase()
                .includes(firmaSearch.toLowerCase());
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 && val.createdAt.split("-")[0] === yearFilter
            : val.firma?.nazwa
                .toLowerCase()
                .includes(firmaSearch.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter;
      }
    }
    if (notConfirmed) {
      if (
        searchLogin === "" &&
        val.confirmation == 0 &&
        surnameSearch === "" &&
        firmaSearch === ""
      ) {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy" ? val[roleSearch] == 1 : val;
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 && val.createdAt.split("-")[0] === yearFilter
            : val && val.createdAt.split("-")[0] === yearFilter;
      } else if (searchLogin !== "" && val.confirmation == 0) {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase())
            : val &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase());
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter
            : val &&
                val.login.toLowerCase().includes(searchLogin?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter;
      } else if (surnameSearch !== "" && val.confirmation == 0) {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val?.dane?.nazwisko
                  ?.toLowerCase()
                  .includes(surnameSearch?.toLowerCase())
            : val?.dane?.nazwisko
                ?.toLowerCase()
                ?.includes(surnameSearch?.toLowerCase());
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 &&
                val?.dane?.nazwisko
                  ?.toLowerCase()
                  .includes(surnameSearch?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter
            : val?.dane?.nazwisko
                ?.toLowerCase()
                ?.includes(surnameSearch?.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter;
      } else if (firmaSearch !== "" && val.confirmation == 0) {
        if (yearFilter === "Wszystkie")
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1
            : val.firma?.nazwa
                .toLowerCase()
                .includes(firmaSearch.toLowerCase());
        else
          return roleSearch !== "Wszyscy"
            ? val[roleSearch] == 1 && val.createdAt.split("-")[0] === yearFilter
            : val.firma?.nazwa
                .toLowerCase()
                .includes(firmaSearch.toLowerCase()) &&
                val.createdAt.split("-")[0] === yearFilter;
      }
    }
  });

  const recordsAfter = () => {
    return recordsAfterFiltering.slice(page * pageRows, (page + 1) * pageRows);
  };
  const changePasswordAdmin = (id, password) => {
    axios
      .put(`${url}changePasswordAdmin`, { id: id, password: password })
      .then((res) => {
        if (res.data.session) window.location.reload(false);
        if (res.data.message) {
          toast.success(res.data.message);
        }
      });
  };
  const changeConfirmation = (id, confirmation) => {
    axios
      .put(`${url}changeConfirmation`, { id: id, confirmation: confirmation })
      .then((res) => {
        if (res.data.session) window.location.reload(false);
        if (res.data.message) {
          setStudents(
            students.map((val) => {
              return val.id === id
                ? { ...val, confirmation: confirmation }
                : val;
            })
          );
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
        <HighlightOffIcon style={{ color: "#ff4d4d" }} />
      </IconButton>
    );
  };
  const handleEditClose = () => {
    setChangeLogin();
    setChangePassword();
    setChangePassword2();
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
        if (res.data.message2) {
          props.setStatus();
          alert(res.data.message2).then(() => {
            navigate("/login");
          });
        } else {
          if (changeLogin.length > 0) {
            setStudents(
              students.map((val) => {
                return val.id === id ? { ...val, login: changeLogin } : val;
              })
            );
            toast.success(res.data.message1);
          }
        }
      });
  };
  const functionToggleSearch = () => {
    if (toggleSearch === 0) {
      setToggleSearch(1);
      setSearchLogin("");
    } else if (toggleSearch === 1) {
      setToggleSearch(2);
      setSurnameSearch("");
    } else if (toggleSearch === 2) {
      setToggleSearch(0);
      setFirmaSearch("");
    }
  };

  const info = (
    <div>
      Po lewej od przycisku <HelpOutlineOutlined />, możesz wyszukać
      użytkowników po e-mailu. <br />
      Jeśli chcesz wyszukać po nazwisku lub nazwie firmy, wystarczy zmienić
      opcje szukania, za które odpowiada przycisk "ZMIEŃ OPCJE SZUKANIA". Możesz
      również przefiltrować użytkowników poprzez ich role jak i rok utworzenia
      konta używając z pól wybieranych o nazwie "Rola" i "Rok" Jeśli chcesz
      sprawdzić zweryfikowane konta możesz skorzystać z przycisku
      "Zatwierdzone", jeśli chcesz sprawdzić konta, które nie są zweryfikowane
      skorzystaj z przycisku "Niezatwierdzone".
      <br /> Jeżeli twoim celem jest archiwizacja jakiegoś roku wystarczy wybrać
      rok korzystająć z pola wybieranego o nazwie "Rok", a następnie nacisnąć
      przycisk "USUŃ WSZYSTKICH Z ROKU *"
      <br /> *UWAGA TA OPCJA USUWA UŻYTKOWNIKÓW, KTÓRZY NIE MAJĄ INNEJ ROLI NIŻ
      STUDENT* (Możesz usunąc tylko lata wcześniejsze o 3 od dzisiejszego roku).{" "}
      <br />
      Po prawej od przycisku <HelpOutlineOutlined /> możesz dodać nowego
      użytkownika wraz z nadaniem mu ról.
      <br />
      <HighlightOffIcon /> Ta ikona zwiastuje iż nie ma tej roli, <br />
      <CheckCircleOutlineIcon /> natomiast ta, że ją ma. <br />
      Możesz także zmienić role poniżej w tabelce już utworzonych użytkowników,
      aby tego dokonać, należy kliknąć na ikonkę <HighlightOffIcon /> (aby nadać
      rolę) lub <CheckCircleOutlineIcon />
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
      to możesz usunąc użytkownika, w innym razie musisz odebrać mu role
      wszystkie oprócz student). <br />
      *UWAGA TA OPCJA USUWA UŻYTKOWNIKÓW, KTÓRZY NIE MAJĄ INNEJ ROLI NIŻ
      STUDENT*
    </div>
  );
  const handleYearChange = (event) => {
    setYearFilter(event.target.value);
    setPage(0);
  };
  const handleRoleChange = (event) => {
    setRoleSearch(event.target.value);
    setPage(0);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "2rem",
          background: darkMode == "white" ? "white" : "#242424",
        }}
      >
        <div />
        <div style={{ overflowX: "auto" }}>
          <Toolbar className={classes.toolbar}>
            {toggleSearch === 0 ? (
              <TextField
                className={classes.searchInp}
                label="Szukaj po e-mailu"
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
                  setPage(0);
                }}
              />
            ) : toggleSearch === 1 ? (
              <TextField
                className={classes.searchInp}
                type="text"
                value={surnameSearch}
                label="Szukaj po nazwisku"
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
                  setSurnameSearch(e.target.value);
                  setPage(0);
                }}
              />
            ) : (
              <TextField
                className={classes.searchInp}
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
                  setPage(0);
                }}
              />
            )}

            <Helper info={info} title="Pomoc admin" darkMode={darkMode} />
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
              style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}
            >
              {" "}
              Zmień opcje szukania
            </Button>
            {yearFilter > 2000 &&
            yearFilter < 3000 &&
            yearFilter < new Date().getFullYear() - 3 &&
            recordsAfterFiltering.length > 0 ? (
              <Button
                variant="contained"
                color="error"
                style={{ margin: "1.5rem" }}
                onClick={() => {
                  deleteYear(yearFilter);
                }}
              >
                Usuń wszystkich z roku {yearFilter}
              </Button>
            ) : null}
          </div>
          <div
            style={{
              alignContent: "center",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            {" "}
            <FormControl
              style={{
                width: "200px",
                height: "60px",
                marginRight: "1.5rem",
              }}
            >
              <InputLabel
                sx={{ color: darkMode === "white" ? null : "white !important" }}
              >
                Rola
              </InputLabel>
              <Select
                sx={{
                  color: darkMode === "white" ? null : "white !important",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      darkMode === "white" ? null : "white !important",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      darkMode === "white" ? null : "white !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      darkMode === "white" ? null : "white !important",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: darkMode === "white" ? null : "white !important",
                  },
                }}
                value={roleSearch}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value={"Wszyscy"}>Wszyscy</MenuItem>
                <MenuItem value={"isStudent"}>Student</MenuItem>
                <MenuItem value={"isOpiekun"}>Opiekun Uczelniany</MenuItem>
                <MenuItem value={"isOpiekunZakl"}>Opiekun Zakładowy</MenuItem>
                <MenuItem value={"isDyrektor"}>Dyrektor</MenuItem>
                <MenuItem value={"isDziekanat"}>Dziekanat</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ width: "200px", height: "60px" }}>
              <InputLabel
                sx={{ color: darkMode === "white" ? null : "white !important" }}
              >
                Rok
              </InputLabel>
              <Select
                sx={{
                  color: darkMode === "white" ? null : "white !important",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      darkMode === "white" ? null : "white !important",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      darkMode === "white" ? null : "white !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      darkMode === "white" ? null : "white !important",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: darkMode === "white" ? null : "white !important",
                  },
                }}
                value={yearFilter}
                label="Rok"
                onChange={handleYearChange}
              >
                <MenuItem value={"Wszystkie"}>Wszystkie</MenuItem>
                {yearArray.map((val) => (
                  <MenuItem value={val}>{val}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            {confirmed ? (
              <Button
                variant="outlined"
                disabled
                style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
              >
                Zatwierdzone
              </Button>
            ) : (
              <Button
                style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
                color="success"
                variant="contained"
                onClick={() => {
                  setConfirmed(true);
                  setAll(false);
                  setNotConfirmed(false);

                  setPage(0);
                }}
              >
                Zatwierdzone
              </Button>
            )}
            {all ? (
              <Button
                variant="outlined"
                disabled
                style={{ marginRight: "0.5rem" }}
              >
                Wszystkie
              </Button>
            ) : (
              <Button
                style={{ marginRight: "0.5rem" }}
                variant="contained"
                onClick={() => {
                  setAll(true);
                  setConfirmed(false);
                  setNotConfirmed(false);
                  setPage(0);
                }}
              >
                Wszystkie
              </Button>
            )}
            {notConfirmed ? (
              <Button
                variant="outlined"
                disabled
                style={{ marginRight: "0.5rem" }}
              >
                Niezatwierdzone
              </Button>
            ) : (
              <Button
                style={{ marginRight: "0.5rem" }}
                color="error"
                variant="contained"
                onClick={() => {
                  setNotConfirmed(true);
                  setAll(false);
                  setConfirmed(false);
                  setPage(0);
                }}
              >
                Niezatwierdzone
              </Button>
            )}
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
                    color: darkMode == "white" ? "black" : "white",
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
                    color: darkMode === "white" ? "black" : "white",
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

                      color: darkMode == "white" ? "black" : "white",
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
                      color: darkMode == "white" ? "black" : "white",
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
                color: darkMode == "white" ? "black" : "white",
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
        darkMode={darkMode}
      />
      <EditAdminDialog
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        editStudent={editStudent}
        changeUserInfo={changeUserInfo}
        setChangeLogin={setChangeLogin}
        darkMode={darkMode}
        changeConfirmation={changeConfirmation}
        changePassword={changePassword}
        setChangePassword={setChangePassword}
        changePassword2={changePassword2}
        setChangePassword2={setChangePassword2}
        changePasswordAdmin={changePasswordAdmin}
      />

      <ToastContainer autoClose={1000} />
    </>
  );
}
