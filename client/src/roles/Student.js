import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Rightbar from '../components/Rightbar';
import { Container, Grid } from '@mui/material';
import Home from '../components/Home';
import ListaStudentow from '../components/ListaStudentow';
import Form from '../components/Form';
import Dzienniczek from '../components/Dzienniczek';
import Footer from '../components/Footer';
import Konto from '../components/Konto';

export default function Student() {
  return (
    <Grid container>
        <Grid item >
          <Sidebar/>
        </Grid>
        <Grid item xs>
            <Routes>
              <Route path="/">
                <Route index element={<Dzienniczek/>}/>
                <Route path='Form' element={<Form/>}/>
                <Route path='Dzienniczek' element={<Dzienniczek/>}/>
                <Route path='konto' element={<Konto/>}/>
                {/* <Route path='ListaStudentow' element={<ListaStudentow/>}/> */}
              </Route>
            </Routes>
        </Grid>
        <Grid item xs={12}>
          <Footer/>
        </Grid>
    </Grid>
  )
}
