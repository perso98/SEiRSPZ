import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { url } from "../services/Url";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Input } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddDayDialog from "../components/AddDayDialog";
import EditDay from "../components/EditDay";
import EfektyUczeniaSie from "../components/EfektyUczeniaSie";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonLink from "../components/Button";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EfektUzasadnienie from "../components/EfektUzasadnienie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { minWidth } from "@mui/system";

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

  const [listEfektyStudent, setListEfektyStudent] = useState([]);

    useEffect(() => {
      axios.get(`${url}getEfektUczenia`).then((res) => {
        setListaEfektyow(res.data);
    })
      axios.get(`${url}IdUser`).then((res) => {
        setIdUser(res.data);
    });
      
    }, []);



  const [efektId, setEfektId] = useState();

  const [efekt, setEfekt] = useState([]);

  const[komentarz, setKomentarz] = useState([]);

  const hoverClose = () => {
      setEfektId()
  };
  const hoverOpen = (val) => {
      setEfektId(val.id)
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
      setOpen(false)
      setKomentarz()
  };
  const handleOpen = (val) => {
      axios.get(`${url}listEfektyStudent/${val.id}`,{
      }).then((res) => {
        setKomentarz(res.data);
        console.log(res.data)
    });
      setOpen(true)
      setEfekt(val)
  };

  const updateUzasadnienieEfektu = (id) => {
  axios.put(`${url}updateUzasadnienieEfektu`, {
      id: id,
      komentarz: komentarz,
      })
  };


  return (
    <div className={classes.containerMain}>
      
      <div className={classes.nowyDzienBTN}>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
            <Button variant="contained">
            <Link to="/dzienniczek" className={classes.links}>
            <div className={classes.item}>
                <Typography className={classes.text}>
                Dzienniczek
                </Typography>
            </div>
            </Link>
            </Button>
        </div>
      </div>

      <Grid container style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}>
        
        
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
            <Grid container style={{marginBottom:"10px"}}>
            Lista efektów do realizacji
                <Grid item xs = {4} md = {8}>
                    <div>
                        Nazwa efektu
                    </div>
                </Grid>
                <Grid item xs = {1} md = {1}>
                    <div>
                        Uzasadnienie
                    </div>
                </Grid>
            </Grid>
        
          {listaEfektyow.map((val) => (
                    <Grid container onMouseLeave={() => hoverClose()}>
                        <Grid item xs = {4} md = {8} style={{marginBottom:"15px"}}>
                            <div>
                            {val.nazwa}
                            </div>
                        </Grid>
                        
                        <Grid item xs = {2} md = {1}>
                            <div>
                            <Button className={classes.btnEdycja} 
                                variant="contained" 
                                onClick={() => { handleOpen(val)}}
                            >
                                Uzasadnij
                            </Button>
                            </div>
                        </Grid>
                    </Grid>
            ))}
            </div>
      </Grid>
    </div>
  );
}

export default EfektyUzasadnienie;
