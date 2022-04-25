import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Rightbar from '../components/Rightbar';
import { Container, Grid } from '@mui/material';

import Home from '../components/Home';
import ListaStudentow from '../components/ListaStudentow';
import Form from '../components/Form';
import Dzienniczek from '../components/Dzienniczek';

export default function Student() {
  return (
    <Grid container>
        <Grid item >
          <Sidebar/>
        </Grid>
        <Grid item xs>
          <Rightbar/>
            <Routes>
              <Route path="/">
                <Route index element={<Dzienniczek/>}/>
                <Route path='Form' element={<Form/>}/>
                <Route path='ListaStudentow' element={<ListaStudentow/>}/>
                <Route path='/' element={<Dzienniczek/>}/>
              </Route>
            </Routes>
        </Grid>
        
    </Grid>
  )
}
