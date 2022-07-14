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
} from "@material-ui/core";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputAdornment
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAdminDialog from "./AddAdminDialog";
import EditAdminDialog from "./EditAdminDialog";
const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
    "& thead th": {
      fontWeight: "600",
      color: "white",
    },
  },
  tableHead: {
    background: "#08448c",
  },
  searchInp: {
    width: "100%",
    marginRight:theme.spacing(20), 
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
}));
export default function Uprawnienia() {
  const classes = useStyles();
  const [changeLogin, setChangeLogin] = useState();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
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

  const deleteUser = (id, login) => {
    const acceptDelete = window.confirm(`Czy pewno chcesz usunąć ${login}?`);
    if (acceptDelete)
      axios.delete(`http://localhost:5000/api/deleteUser/${id}`).then((res) => {
        setStudents(
          students.filter((val) => {
            return val.id != id;
          })
        );
      });
  };
  const [addOpen, setAddOpen] = useState(false);

  const handleAddClose = () => {
    setAddOpen(false);
  };
  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const [userObject,setUserObject] = useState({
    login:'',
    password:'',
    admin:0,
    opiekunU:0,
    opiekunZ:0,
    student:0,
    dziekanat:0,
    dyrektor:0,
  })
  const onChange=(e)=>{
    const {value,id}=e.target
    setUserObject({...userObject,[id]:value})
  }
  const onClick=(e,number)=>
  {
    const {id}=e.currentTarget
    setUserObject({...userObject,[id]:number})
  }
  const createAcc = () => {
    axios
      .post("http://localhost:5000/api/createAccount2", {
      userObject:userObject
      })
      .then((res) => {
        if (res.data.message == "Konto zostało pomyślnie utworzone") {
          setStudents([
            ...students,
            {
              id:res.data.id,
              login: userObject.login,
              password: userObject.password,
              isOpiekunZakl:userObject.opiekunZ,
              isAdmin:userObject.admin,
              isDyrektor:userObject.dyrektor,
              isOpiekun:userObject.opiekunU,
              isDziekanat:userObject.dziekanat,
              isDyrektor:userObject.dyrektor,
              isStudent:userObject.student,
            },
          ]);
          setUserObject({...userObject,
            login:'',
            password:'',
          })
        }
 
        alert(res.data.message);
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
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const [editStudent, setEditStudent] = useState(null);
  const handleOpen = (student) => {
    setEditStudent(student);
    setEditOpen(true);
  };

  const changeUserInfo = (id) => {
    axios
      .put("http://localhost:5000/api/changeUserInfo", {
        id: id,
        changeLogin: changeLogin,
      })
      .then((res) => {
        setStudents(
          students.map((val) => {
            return val.id == id ? { ...val, login: changeLogin } : val;
          })
        );
      });
  };

  return (
    <>
    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
    <div/>
    <div>
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
            setPage(0);
          }}
        />
        <Button variant="contained" onClick={handleAddOpen}>
          Dodaj użytkownika
        </Button>
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
                      deleteUser(val.id, val.login);
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
      </div>
      <div/>
      </div>
      <AddAdminDialog
        addOpen={addOpen}
        handleAddClose={handleAddClose}
        onChange={onChange}
        userObject={userObject}
        createAcc={createAcc}
        onClick={onClick}
      />
      <EditAdminDialog
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        editStudent={editStudent}
        changeUserInfo={changeUserInfo}
        setChangeLogin={setChangeLogin}
      />
    </>
  );
}
