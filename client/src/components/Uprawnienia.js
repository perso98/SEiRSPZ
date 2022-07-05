import axios, * as others from "axios";
import CloseIcon from '@mui/icons-material/Close';
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
import { InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddNewAcc from "./AddNewAcc";
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
    display:'flex',
    width:'70%',
    justifyContent:'space-between',
  },
  NoData: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "600",
  },

  DialogTitleClass:{
display:'flex',
justifyContent:'space-between'
  },
}));
export default function Uprawnienia() {
  const classes = useStyles();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open,setOpen]=useState(false)
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
    {id:'Actions',label:'Akcje'}
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
    return ( 
     
    
      <IconButton  onClick={() => {
        updateRole(action, 0, id);
      }}>
      <CheckCircleOutlineIcon style={{color:'green'}}/></IconButton>
    )
  }
  
  const takeButton = (action,id) =>
  {
    return (  <IconButton  onClick={() => {
      updateRole(action, 1, id);
    }}>
    <HighlightOffIcon style={{color:'red'}}/></IconButton>
    )
  }
  const handleClose = () => {
    setOpen(false);
  };
  const [editStudent,setEditStudent]=useState(null)
  const handleOpen = (student) => {
    setEditStudent(student)
    setOpen(true);
  };

  return (
    <>
    {editStudent &&
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.DialogTitleClass}>Edycja {editStudent.login} 
        <IconButton
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton></DialogTitle>
        <DialogContent>
          <DialogContentText>
          {editStudent.isStudent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
      }
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
        <AddNewAcc/>
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
              <TableCell style={{textAlign:'center'}}>
                {val.isStudent == 0 ? takeButton('isStudent',val.id): giveButton('isStudent',val.id)}
              </TableCell>
              <TableCell style={{textAlign:'center'}}>
                {val.isAdmin == 0 ? takeButton('isAdmin',val.id): giveButton('isAdmin',val.id)}
              </TableCell >
              <TableCell style={{textAlign:'center'}}>
                {val.isOpiekunZakl == 0 ? takeButton('isOpiekunZakl',val.id): giveButton('isOpiekunZakl',val.id)}
              </TableCell>
              <TableCell style={{textAlign:'center'}}>
                {val.isOpiekun == 0 ? takeButton('isOpiekun',val.id): giveButton('isOpiekun',val.id)}
              </TableCell>
              <TableCell style={{textAlign:'center'}}>
                {val.isDyrektor == 0 ? takeButton('isDyrektor',val.id): giveButton('isDyrektor',val.id)}
              </TableCell>
              <TableCell style={{textAlign:'center'}}>
                {val.isDziekanat == 0 ? takeButton('isDziekanat',val.id): giveButton('isDziekanat',val.id)}
              </TableCell>
              <TableCell>
               
              <IconButton onClick={()=>{handleOpen(val)}}>
              <EditIcon style={{color:'#FF8C00'}}/>
              </IconButton>
              <IconButton>
              <DeleteIcon style={{color:'#A52A2A'}}/>
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
