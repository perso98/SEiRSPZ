import React from 'react'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Form from '../components/Form'
import Nav from '../components/Nav'
import ListaStudentow from '../components/ListaStudentow'

import { BrowserRouter, Route,Routes,Link } from 'react-router-dom'



function Main() {
  return (
<BrowserRouter >
<Nav/>

  <Routes>
    
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/Form' element={<Form/>}/>
  <Route path='/ListaStudentow' element={<ListaStudentow/>}/>
  </Routes>
  </BrowserRouter>
  

   

  )
}

export default Main