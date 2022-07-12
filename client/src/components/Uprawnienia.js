import axios, * as others from "axios";
import CloseIcon from "@mui/icons-material/Close";
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
} from "@material-ui/core";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
    width: "70%",
    "& thead th": {
      fontWeight: "600",
      color: "white",
    },
    // '& tbody tr:hover':{
    //   backgroundColor:'gray',
    // },
  },
  tableHead: {
    background: "#08448c",
  },
  searchInp: {
    width: "60%",
  },
  toolbar: {
    marginTop: "2%",
    display: "flex",
    width: "70%",
    justifyContent: "space-between",
  },
  NoData: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "600",
  },

  DialogTitleClass: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
export default function Uprawnienia() {
  const classes = useStyles();
  const [changeLogin,setChangeLogin]=useState()
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/api/getStudents").then((res) => {
      setStudents(res.data);
      setLoading(false);
    });
  }, []);

  const pages = [10, 15, 20];
  const [page, setPage] = useState(0);
  const [pageRows, setpageRows] = useState(pages[page]);
  const [searchLogin, setSearchLogin] = useState("");

  const HeadCells = [
    { id: "login", label: "Login" },
    { id: "isStudent", label: "Student" },
    { id: "isAdmin", label: "Admin" },
    { id: "isOpiekunZakl", label: "Opiekun Z." },
    { id: "isOpiekun", label: "Opiekun U." },
    { id: "isDyrektor", label: "Dyrektor" },
    { id: "isDziekanat", label: "Dziekanat" },
    { id: "Actions", label: "Akcje" },
  ];

  const deleteUser = (id) => {
    console.log(id);
    axios.delete(`http://localhost:5000/api/deleteUser/${id}`).then((res) => {
      setStudents(
        students.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  const [open2, setOpen2] = useState(false);
  const [admin, setAdmin] = useState(0);
  const [opiekunZ, setOpiekunZ] = useState(0);
  const [opiekunU, setOpiekunU] = useState(0);
  const [dyrektor, setDyrektor] = useState(0);
  const [dziekanat, setDziekanat] = useState(0);
  const [student2, setStudent] = useState(0);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };

  const createAcc = () => {
    axios.post("http://localhost:5000/api/createAccount2", {
      login: login,
      password: password,
      student2: student2,
      dyrektor: dyrektor,
      dziekanat: dziekanat,
      admin: admin,
      opiekunZ: opiekunZ,
      opiekunU: opiekunU,
    }).then((res) => {
      if(res.data.message=="Konto zostało pomyślnie utworzone")
        setStudents([...students,
          {
          login: login,
          password: password,
          isStudent: student2,
          idDyrektor: dyrektor,
          isDziekanat: dziekanat,
          isAdmin: admin,
          isOpiekunZakl: opiekunZ,
          isOpiekun: opiekunU,}])
        })
    
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setpageRows(parseInt(event.target.value, 10));
    setPage(0);
  };
  const recordsAfterFiltering = students.filter((val) => {
    if (searchLogin == "") {
      return val;
    } else if (val.login.toLowerCase().includes(searchLogin.toLowerCase())) {
      return val;
    }
  });
  const recordsAfter = () => {
    return recordsAfterFiltering.slice(page * pageRows, (page + 1) * pageRows);
  };

  const updateRole = (action, type, id) => {
    axios
      .put("http://localhost:5000/api/changeRole", {
        action: action,
        type: type,
        id: id,
      })
      .then((res) => {
        setStudents(
          students.map((val) => {
            return val.id == id ? { ...val, [action]: type } : val;
          })
        );
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
  const handleClose = () => {
    setOpen(false);
  };
  const [editStudent, setEditStudent] = useState(null);
  const handleOpen = (student) => {
    setEditStudent(student);
    setOpen(true);
  };

  const changeUserInfo= (id)=>{
    axios.put('http://localhost:5000/api/changeUserInfo',{
      id:id,
      changeLogin:changeLogin
    }).then((res)=>{
      setStudents(
        students.map((val) => {
          return val.id == id ? { ...val, login: changeLogin } : val;
        })
      );

    })
  }

  return (
    <>
      {editStudent && (
        <Dialog open={open} onClose={handleClose}  fullWidth="40%">
          <DialogTitle className={classes.DialogTitleClass}>
            Edycja użytkownika :  {editStudent.login}
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{display:'flex',flexDirection:'column',margin:'5%'}}>

            <TextField
              label="Zmiana loginu"
              defaultValue={editStudent.login}
              onChange={(e)=>{
                setChangeLogin(e.target.value)
              }}
              
            />
            <Button variant="contained" style={{marginTop:'5vh'}} onClick={()=>{changeUserInfo(editStudent.id)}}>
              Zmień
            </Button>

          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      )}
      <Toolbar className={classes.toolbar}>
        <TextField
          className={classes.searchInp}
          label="Szukaj"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setSearchLogin(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleOpen2}>
          Dodaj użytkownika
        </Button>
        <Dialog open={open2} onClose={handleClose2} fullWidth="60%">
          <DialogTitle
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Dodawanie nowego użytkownika
            <IconButton aria-label="close" onClick={handleClose2}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginTop: "2%" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="login"
                  label="Login:"
                  onChange={(e) => {
                    setLogin(e.target.value);
                  }}
                  style={{ marginBottom: "5%" }}
                />

                <TextField
                  id="haslo"
                  label="Hasło:"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Opiekun Z.</div>
                    <div>
                      {opiekunZ == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setOpiekunZ(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setOpiekunZ(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Student</div>
                    <div>
                      {student2 == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setStudent(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setStudent(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "red" }}>!!Admin!!</div>
                    <div>
                      {admin == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setAdmin(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setAdmin(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Opiekun U.</div>
                    <div>
                      {opiekunU == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setOpiekunU(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setOpiekunU(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Dyrektor</div>
                    <div>
                      {dyrektor == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setDyrektor(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setDyrektor(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Dziekanat</div>
                    <div>
                      {dziekanat == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setDziekanat(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setDziekanat(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant="contained"
                  style={{ marginTop: "4%" }}
                  onClick={createAcc}
                >
                  Dodaj
                </Button>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Toolbar>

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
          {loading == true && <TableRow>Ładowanie...</TableRow>}
          {recordsAfterFiltering.length == 0 && loading == false && (
            <TableRow className={classes.NoData}>Brak danych...</TableRow>
          )}

          {recordsAfter().map((val) => (
            <TableRow key={val.id}>
              <TableCell>{val.login}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {val.isStudent == 0
                  ? takeButton("isStudent", val.id)
                  : giveButton("isStudent", val.id)}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {val.isAdmin == 0
                  ? takeButton("isAdmin", val.id)
                  : giveButton("isAdmin", val.id)}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {val.isOpiekunZakl == 0
                  ? takeButton("isOpiekunZakl", val.id)
                  : giveButton("isOpiekunZakl", val.id)}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {val.isOpiekun == 0
                  ? takeButton("isOpiekun", val.id)
                  : giveButton("isOpiekun", val.id)}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {val.isDyrektor == 0
                  ? takeButton("isDyrektor", val.id)
                  : giveButton("isDyrektor", val.id)}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {val.isDziekanat == 0
                  ? takeButton("isDziekanat", val.id)
                  : giveButton("isDziekanat", val.id)}
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
                  <DeleteIcon
                    style={{ color: "#A52A2A" }}
                    onClick={() => {
                      deleteUser(val.id);
                    }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          component="div"
          page={page}
          rowsPerPageOptions={pages}
          rowsPerPage={pageRows}
          count={recordsAfterFiltering.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </>
  );
}
