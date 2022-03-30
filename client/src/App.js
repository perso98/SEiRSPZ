import React,{useState,useEffect} from 'react'
import Nav from './components/Nav'
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import ListaStudentow from './components/ListaStudentow'
import Register from './components/Register'
import Form from './components/ListaStudentow'
import NavLogged from './maincomponents/NavLogged'
import Login from './components/Login'
import Axios from 'axios'
import Student from './roles/Student'




function App() {
  Axios.defaults.withCredentials=true
  const [logged,setLogged]=useState('')
  useEffect(()=>
{
  Axios.get("http://localhost:5000/api/loginToAccount").then((res)=>{
    setLogged(res.data.logged)  
  }
  )
},[])

useEffect(()=>{
  
  Axios.get("http://localhost:5000/api/logoutFromAccount").then((res)=>{
    
    setLogged(res.data.logged)   
  }
  )
},[])
const Navbar = () => {
  return (
          <>
              
              {logged ? <NavLogged/> : <Nav/>}
              
      </>
  );
};
  return (
  

    <BrowserRouter >
      <Navbar/>
      <Routes>
        <Route path="/">
      <Route index element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='Form' element={<Form/>}/>
      <Route path='ListaStudentow' element={<ListaStudentow/>}/>
      <Route path='profil' element={<Student/>}/>
      </Route>

      </Routes>
      
      </BrowserRouter>
      
  )
}

export default App