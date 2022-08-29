import React from 'react'
import { Grid, TextField } from '@mui/material'
import Footer from '../components/Footer';
import { makeStyles } from '@mui/styles'
import { Container, Typography } from '@mui/material'

const useStyles = makeStyles(theme => ({
container:{
  paddingTop: theme.spacing(2),
  height: "100vh",
},
}));


function Home() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid className={classes.container}>
      Home
      </Grid>
       
       <Grid item xs={12}>
          <Footer/>
        </Grid>
  </Grid> 
  )
}

export default Home