import React,{useEffect,useState} from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Form from './components/Form'

import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css';


function App() {
  return (
    <BrowserRouter>
    <div className='App'>
<Nav/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/Form' element={<Form/>}/>
</Routes>
    </div>
    </BrowserRouter>
  )
}

export default App