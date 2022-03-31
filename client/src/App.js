import React,{useState,useEffect} from 'react'
import Nav from './components/Nav'
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import ListaStudentow from './components/ListaStudentow'
import Register from './components/Register'
import Form from './components/ListaStudentow'
import Login from './components/Login'
import Logged from './pages/Logged'




function App() {


  return (
  <div className='App'>

    <BrowserRouter >
      <Nav/>
      <Routes>
        <Route path="/">
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='Form' element={<Form/>}/>
      <Route path='ListaStudentow' element={<ListaStudentow/>}/>
      <Route path='profil' element={<Logged/>}/>
      </Route>

      </Routes>
     
      
      </BrowserRouter>
      </div>
      
  )
}

export default App