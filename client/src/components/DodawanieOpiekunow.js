import React,{ useState, useEffect} from 'react'
import axios, { Axios } from 'axios'

import ListaOpiekunow from "./ListaOpiekunow";
import { Container, Typography, Grid, Input } from '@mui/material'
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



function DodawanieOpiekunow() {
    const [opiekuni,setOpiekuni]=useState([])
    const [studenci,setStudenci]=useState([])

    useEffect(()=>
    {
        axios.get("http://localhost:5000/api/getStudentsO").then((res)=>{
            setStudenci(res.data)
        })

        axios.get("http://localhost:5000/api/getOpiekuni").then((res)=>{
            setOpiekuni(res.data)
            console.log(res.data)
        })
    },[]
    )


  return (
    <div>
        <div>
            lista Opiekunow: 
            {opiekuni.map((val)=> {
                return (
                <ListaOpiekunow 
                dane = {val}
                />
                )
            })}
        </div>

        <div>
            lista Studentów: 
            {studenci.map((val)=> {
                return (
                    <Grid container>
                        <Grid item xs = {2}>
                            <div>login: {val.login}</div>
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    </div>
  )
}

export default DodawanieOpiekunow