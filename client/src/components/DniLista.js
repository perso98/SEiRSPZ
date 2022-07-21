import React from "react";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button'
import DialogOpiekunZ from "./DialogOpiekunZ";
import {useState} from 'react'

function DzienniczekDni({ Dzienniczek }) {
  const [open,setOpen] = useState(false)
  const [checkDay,setCheckDay] = useState(null)
  const handleClose = () =>{
      setOpen(false)
  }
  const handleOpen=(val)=>{
    setCheckDay(val)
    setOpen(true)
  }
  
  return (
    <div>
      <Grid container spacing={3}>
        {Dzienniczek.map((val) => {
          return (
            <Grid item xs={12} md={12} lg={6}>
              <div
                style={{
                  backgroundImage: 'linear-gradient(#073874, #042144)',
                   color:'white',
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius:'25px',
                  boxShadow:' 0 0 5px black',
                }}
              >
                <div style={{display:'flex',justifyContent:'space-between'}}>Dzień : {val.id} <Button 
                onClick={() => {handleOpen(val)}}
                variant="contained" color="warning">
                  Szczegóły
                </Button></div> <div style={{margin:'1rem 0 1rem 0'}}>Tytuł: {val.title}</div> <div style={{margin:'0 0 1rem 0'}}>Student: {val.opis}</div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                <Button variant="contained" color="success">
                  Akceptuj
                </Button>
                <Button variant="contained" color="error">
                  Odrzuć
                </Button>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
      <DialogOpiekunZ open={open} handleClose={handleClose} checkDay={checkDay}/>
    </div>
  );
}

export default DzienniczekDni;
