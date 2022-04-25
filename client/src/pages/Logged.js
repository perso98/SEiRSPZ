import React,{useState,useEffect} from 'react'
import Student from '../roles/Student'
import Opiekun from '../roles/Opiekun'
import Dyrektor from '../roles/Dyrektor'
import Axios from 'axios'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Rightbar from '../components/Rightbar';
import Footer from '../components/Footer';
import { Container, Grid } from '@mui/material';

import Home from '../components/Home';
import ListaStudentow from '../components/ListaStudentow';
import Register from '../components/Register';
import Form from '../components/Form';
import Login from '../components/Login';
import Dzienniczek from '../components/Dzienniczek';


function Logged() {
    const [rola,setRola]=useState('')
    Axios.defaults.withCredentials=true
    useEffect(()=>{
        Axios.get("http://localhost:5000/api/loginToAccount").then((res)=>
        {
            if(res.data.logged==true)
            {
                setRola(res.data.user.rola)
               
            }
        })
    })

  return (   
  <>
          {rola=='student' &&  <Student/>}
          {rola=='dyrektor' && <Dyrektor/>}
          {rola=='opiekun' && <Opiekun/>}
  </>

  
  )

  
  
}

export default Logged