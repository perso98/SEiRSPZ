import React,{useState,useEffect} from 'react';
import Nav from './components/Nav';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import ListaStudentow from './components/ListaStudentow';
import Register from './components/Register';
import Form from './components/Form';
import Login from './components/Login';
import Dzienniczek from './components/Dzienniczek';
import Logged from './pages/Logged';
import { Container, Grid } from '@mui/material';
import Sidebar from './components/Sidebar';
import Rightbar from './components/Rightbar';
import Footer from './components/Footer';
import { makeStyles } from '@mui/styles'
import Profil from './components/Konto';



const useStyles = makeStyles(theme => ({
  content:{
    paddingTop: theme.spacing(0),
    height: "90vh",
  },
  margingora:{
    paddingTop: theme.spacing(2)
  },

  marginHome:{
    paddingTop: theme.spacing(10)
  }
}));

function App() {
  const classes = useStyles();
  return (
  <div className='App'>

    <BrowserRouter >
      <Nav/>
       <Grid container>
        <Grid item xs className={classes.content}>
          
          <Routes>
            <Route path="/">
              <Route index element={<div className={classes.marginHome}><Home/></div>}/>
              <Route path='login' element={<div className={classes.margingora}><Login/></div>}/>
              <Route path='register' element={<div className={classes.margingora}><Register/></div>}/>
              <Route path='profil/*' element={<Logged/>}/>
            </Route>
          </Routes>
        </Grid>
        
      </Grid>
    </BrowserRouter>
  </div>
  )
}

export default App