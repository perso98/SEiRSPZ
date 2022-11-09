import { React, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, TextField } from "@mui/material";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Zalacznik from "./Zalacznik";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FileDownload from "js-file-download";
import ClearIcon from "@mui/icons-material/Clear";
import { url } from "../services/Url";

const useStyles = makeStyles(theme => ({
  containerMain:{
      height: "100vh",
  },
  dni:{
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
  },
  ol:{
      listStyle: "none",
  },
  dniItem:{
      display:"flex",
      alignItems:"center",
      fontSize: "20px !important",
  },
  links:{
      textDecoration: 'none', 
      color:'black',
      "&:hover": {
          color:'white',
          textDecoration: 'none', 
      },
  },
  content:{
      paddingTop: theme.spacing(2),
  },

  label:{
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(1),
  },
  form:{
      paddingRight: theme.spacing(2),
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));

function EditDay(
  { 
    editOpen,
    zalaczniki,
    handleEditClose,
    editDay,
    deleteDay,
    createEditDay,
    dziennikZalaczniki,
    setDziennikZalaczniki,
    addZalacznik,
    deleteZalacznik,
    changeZalacznik,
    setChangeZalacznik,
    setChangeOpis,
    setChangeDzien,
    setChangeData,
    setChangeIloscGodzin,
    sendDay,
    darkMode,
  }
  ){

  const classes = useStyles();

  const downloadFile = (name) => {
    axios({
      url: `${url}downloadFile/${name}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, name);
    });
  };

  const [files, setFiles] = useState([]);

  const onSuccess = (savedFiles) => {
      setFiles(savedFiles)
  };

  const FileUploader = ({onSuccess}) => {
    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
        
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        for(const element of files) {
            data.append('file', element);
        }
        const idDay = editDay.id
        axios.post(`${url}upload/${idDay}`, data,{
          })
            .then((response) => {
                toast.success('Załadowano pomyślnie');

                setDziennikZalaczniki([
                  ...zalaczniki,
                  {
                    id: response.data.id,
                    zalacznik: response.data.zalacznik,
                    dziennikId: idDay
                  },
                ])
                setChangeZalacznik(response.data)
                onSuccess(response.data)
            })
            .catch((e) => {
                toast.error('Błąd')
            })
    };

    return (
        <form>
            <div>
                <Stack direction="row" spacing={1}>
                  <input type="file"
                        onChange={onInputChange}
                        className="form-control"
                        />

                  <Button
                    variant="contained"
                    color="success"
                    onClick={onSubmit}
                  >
                    Załącz
                  </Button>
                </Stack>
            </div>
        </form>
    )
  }

  

  return (
    <>
      {editDay && (
        <Dialog
          open={editOpen}
          onClose={handleEditClose}
          fullWidth="40%"
          PaperProps={{
            style: {
              backgroundColor: darkMode == "white" ? "white" : "#242424",
              color: darkMode == "white" ? "black" : "white",
            },
          }}
          style={{ fontSize: "1.2rem", color: "#403c3c" }}
        >
          <DialogTitle
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            Dzień:{editDay.dzien}
            <IconButton onClick={handleEditClose}>
              <CloseIcon 
              style={{ color: darkMode == "white" ? "black" : "white" }}
              />
            </IconButton>
          </DialogTitle>
          <DialogContent>

            <div style={{ margin: "1rem 0px 1rem 0 " }}>
              <Stack  direction="row" spacing={1}>

              
            <Box sx={{ width: 70}}>
              <TextField className={classes.TextField}
                size="small"
                label="Dzień"
                defaultValue= {editDay.dzien}
                onChange={(e) => {
                  setChangeDzien(e.target.value);
                }}
                margin="normal"
                inputProps={{
                  style: {
                    color: darkMode == "white" ? "black" : "white",
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
                }}
                />
            </Box>
            <Box sx={{ width: 120}}>
              <TextField className={classes.TextField}
                size="small"
                label="Data"
                defaultValue= {editDay.data}
                onChange={(e) => {
                  setChangeData(e.target.value);
                }}
                margin="normal"
                inputProps={{
                  style: {
                    color: darkMode == "white" ? "black" : "white",
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
                }}
                />
            </Box>

            <Box sx={{ width: 120}}>
              <TextField className={classes.TextField}
                size="small"
                label="Ilość godzin"
                defaultValue= {editDay.ilosc_godzin}
                onChange={(e) => {
                  setChangeIloscGodzin(e.target.value);
                }}
                margin="normal"
                inputProps={{
                  style: {
                    color: darkMode == "white" ? "black" : "white",
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
                }}
                />
            </Box>
            </Stack>
              <TextField className={classes.TextField}
                label="Opis"
                id="opis"
                defaultValue= {editDay.opis}
                onChange={(e) => {
                  setChangeOpis(e.target.value);
                }}
                multiline
                fullWidth
                margin="normal"
                inputProps={{
                  style: {
                    color: darkMode == "white" ? "black" : "white",
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
                }}
                />
            </div>

            <div style={{ margin: "1rem 0px 1rem 0 " }}>
              <b>Zatwierdzenie </b>
              <Stack direction="row" spacing={1}>
                <h5>Opiekun uczelniany:</h5>
                <div style={{ 
                          color: darkMode == "white" ?
                            (editDay.statusOpiekunaU === "Odrzucono" ? 
                              ("red")
                              : 
                              editDay.statusOpiekunaU === "Zaakceptowano" ? 
                                ("green")
                                :
                                ("black")
                            )
                            :
                            (editDay.statusOpiekunaU === "Odrzucono" ? ("red"): editDay.statusOpiekunaU === "Zaakceptowano" ? ("green"):("white")) 
                          }}>
                    {editDay.statusOpiekunaU}
                  </div>
              </Stack>
              <Stack direction="row" spacing={1}>
              <h5>Opiekun zakładowy: </h5> 
              <div style={{ 
                          color: darkMode == "white" ?
                            (editDay.statusOpiekunaZ === "Odrzucono" ? 
                              ("red")
                              : 
                              editDay.statusOpiekunaZ === "Zaakceptowano" ? 
                                ("green")
                                :
                                ("black")
                            )
                            :
                            (editDay.statusOpiekunaZ === "Odrzucono" ? ("red"): editDay.statusOpiekunaZ === "Zaakceptowano" ? ("green"):("white")) 
                          }}>
                    {editDay.statusOpiekunaZ}
                  </div>
              </Stack>
            </div>

            <div>
            {zalaczniki?.length > 0 && (
                  <div style={{ marginBottom: "1rem" }}>Załączniki:</div>
                )}
                {zalaczniki?.map((val) => (
                  <div>
                  {val.dziennikId === editDay.id ? (
                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <div className="blueCard">
                      {val.zalacznik.substring(val.zalacznik.indexOf("-") + 1)}
                    </div>
                    <div style={{ marginLeft: "1rem" }}>
                      <IconButton
                        onClick={() => {
                          downloadFile(val.zalacznik);
                        }}
                      >
                        <CloudDownloadIcon style={{ color: "green" }} />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                              deleteZalacznik(val.id);
                            }}
                      >
                        <ClearIcon style={{ color: "red" }} />
                      </IconButton>
                    </div>
                  </div>
                  ): null}
                  </div>
                ))}

                {/* { zalaczniki.map((val) => (
                  <div>
                    {val.dziennikId === editDay.id ? (
                      <div> 
                        <a href={`//localhost:5000/${val.zalacznik}`} > <img style={{maxWidth: '200px'}} src={`//localhost:5000/${val.zalacznik}`}/></a>
                        <IconButton
                        onClick={() => {
                              deleteZalacznik(val.id);
                            }}
                      >
                        <ClearIcon style={{ color: "red" }} />
                      </IconButton>
                          </div>
                    ): null}
                  </div>
                  ))} */}

        <FileUploader onSuccess={onSuccess} />


              {/* <form>
                <div>
                    <Stack direction="row" spacing={1}>
                    <label>Załącz pliki </label>
                    <input type="file"
                          onChange={onInputChange}
                          className="form-control"
                          />
                    <button 
                    // onClick={addZalacznik}
                    // onClick={() => {
                    //   addZalacznik(editDay.id);
                    // }}
                    onClick={() => {addZalacznik(editDay.id)}}
                    >
                    
                    Submit</button>
                    </Stack>
                </div>
              </form> */}


              {/* <Zalacznik
              idDay = {editDay.id}
              setChangeZalacznik = {setChangeZalacznik}
              /> */}
              <ToastContainer/>
            </div>

        <div  style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
            <Button
            variant="contained"
            style={{ marginTop: "5vh" }}
            onClick={() => {
              createEditDay(editDay.id, editDay.dzien, editDay.data, editDay.ilosc_godzin, editDay.opis);
            }}
          >
            Zmień
          </Button>
          <Button
            variant="contained"
            color="success"
            style={{ marginTop: "5vh" }}
            onClick={() => {
              sendDay(editDay.id);
            }}
          >
            Wyślij
          </Button>

          <Button
            variant="contained"
            color="error"
            style={{ marginTop: "5vh" }}
            onClick={() => {
              deleteDay(editDay.id);
            }}
          >
            Usuń
          </Button>
          </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default EditDay;
