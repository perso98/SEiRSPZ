import React from 'react'
import Main from './pages/Main'
import Logged from './pages/Logged'
import Nav from './components/Nav'
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom'


function App() {
  return (
    <div>


      <Main/>
      <Logged/>
    
  

  </div>
  )
}

export default App