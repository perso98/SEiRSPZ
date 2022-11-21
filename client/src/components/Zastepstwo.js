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
import OpiekunU from "../pages/ZastepstwoOpiekunU";
import OpiekunUEfekty from "../pages/ZastepstwoEfektyOpiekunU";
import OpiekunUHistory from "../pages/ZastepstwoOpiekunUHistory";

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
    <Dialog open={open} onClose={handleClose} fullWidth="20%">
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        {infoUser !== null ? (
            <div>
                Zastępstwo: {infoUser.imie} {infoUser.nazwisko}
                Id: {infoUser.user.id}
            </div>
        ): null}
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginTop: "2%" }}>
            <div>
            <OpiekunU 
            infoUser = { infoUser }
            />
            <OpiekunUHistory
            infoUser = { infoUser }
            />
            <OpiekunUEfekty
            infoUser = { infoUser }
            />

            </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default Zastepstwo