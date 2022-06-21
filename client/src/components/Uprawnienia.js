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
import { InputAdornment } from "@mui/material";
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
    width: "40%",
  },
  toolbar: {
    marginTop: "2%",
  },
  NoData: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "600",
  },
}));
export default function Uprawnienia() {
  const classes = useStyles();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
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
    { id: "isOpiekunZakl", label: "Opiekun Zakł." },
    { id: "isOpiekun", label: "Opiekun Ucz." },
    { id: "isDyrektor", label: "Dyrektor" },
    { id: "isDziekanat", label: "Dziekanat" },
  ];

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
      }).then((res)=>{
        setStudents(
        students.map((val) => {
          return val.id == id ? { ...val, [action]: type } : val;
        })
      )});
  };
  
  const giveButton = (action,id) => { 
    return ( <Button
      style={{width:'70px'}}
      variant="contained"
      color="success"
      onClick={() => {
        updateRole(action, 1, id);
      }}
    >
      Nadaj
    </Button>)
  }
  const takeButton = (action,id) =>
  {
    return ( <Button
      style={{width:'70px'}}
      variant="contained"
      color="error"
      onClick={() => {
        updateRole(action, 0, id);
      }}
    >
      Odbierz
    </Button>)
  }

  return (
    <>
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
              <TableCell>
                {val.isStudent == 1 ? takeButton('isStudent',val.id): giveButton('isStudent',val.id)}
              </TableCell>
              <TableCell>
                {val.isAdmin == 1 ? takeButton('isAdmin',val.id): giveButton('isAdmin',val.id)}
              </TableCell>
              <TableCell>
                {val.isOpiekunZakl == 1 ? takeButton('isOpiekunZakl',val.id): giveButton('isOpiekunZakl',val.id)}
              </TableCell>
              <TableCell>
                {val.isOpiekun == 1 ? takeButton('isOpiekun',val.id): giveButton('isOpiekun',val.id)}
              </TableCell>
              <TableCell>
                {val.isDyrektor == 1 ? takeButton('isDyrektor',val.id): giveButton('isDyrektor',val.id)}
              </TableCell>
              <TableCell>
                {val.isDziekanat == 1 ? takeButton('isDziekanat',val.id): giveButton('isDziekanat',val.id)}
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
