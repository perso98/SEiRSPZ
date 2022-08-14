import React,{ useState, useEffect} from 'react'
import axios, { Axios } from 'axios'

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

import { Container, Typography, Grid, Input } from '@mui/material'


function ListaOpiekunow(props) {
    const [opiekuni,setOpiekuni]=useState([])

    useEffect(()=>
    {
        axios.get(`http://localhost:5000/api/getOpiekun/${props.dane.id}`).then((res)=>{
            setOpiekuni(res.data)
        })
    },[]
    )


  return (
    <div>
        <Grid container>
            <Grid item xs = {2}>
                <div>login: {props.dane.login}</div>
            </Grid>
            <Grid item xs = {2}>
                <div>imie: {opiekuni.imie}</div>
            </Grid>
            <Grid item xs = {2}>
                <div>naziwkso: {opiekuni.nazwisko}</div>
            </Grid>
        </Grid>
      
    </div>

  )
}

export default ListaOpiekunow