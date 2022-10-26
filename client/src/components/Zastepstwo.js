import React,{ useState, useEffect} from 'react'
import axios, { Axios } from 'axios'
import {
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@mui/material";
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
import {Link} from 'react-router-dom'
import Button from "@mui/material/Button";
import { Container, Typography, Grid, Input } from '@mui/material'
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import OpiekunU from "../pages/OpiekunU";
import OpiekunUEfekty from "../pages/EfektyOpiekunU";
function Zastepstwo(
    {
        open,
        infoUser,
        idFirma,
        user,
        dane,
        idOpiekuna,
        jakiOpiekun,
        handleClose,
        addStudentFirma,
        delStudentFirma,
        onChange,
        object,
      }
) {


  return (
    <Dialog open={open} onClose={handleClose} fullWidth="60%">
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        {infoUser !== null ? (
            <div>
                Zastępstwo: {infoUser.imie} {infoUser.nazwisko}
            </div>
        ): null}
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginTop: "2%" }}>
            <div>
            <OpiekunU></OpiekunU>
            <OpiekunUEfekty/>

            </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default Zastepstwo