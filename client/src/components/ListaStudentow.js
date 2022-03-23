import React, { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import { useParams } from 'react-router-dom'

function ListaStudentow() {

  const [students,setStudents]=useState([])

  useEffect(()=>
  {

    axios.get("http://localhost:5000/api/getStudents").then((res)=>{
      
    setStudents(res.data)
      
    })
  },[])


  return (
    <div className='center'>
      <div className='homeClass'> 
      lista Studentow: 
      
      {students.map((val)=> {
        return (
          <div className='form-group'><h3>imie: {val.imie} nazwisko: {val.nazwisko}<button type="submit" class="btn btn-primary">Więcej</button></h3></div>
        )
      })}
      </div>
    </div>
  )
}

export default ListaStudentow