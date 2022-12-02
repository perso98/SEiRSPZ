import React, { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
import { useParams } from 'react-router-dom'
import { url } from "../services/Url";

function ListaStudentow() {

  const [students,setStudents]=useState([])

  useEffect(()=>
  {

    axios.get(`${url}getStudents`).then((res)=>{
      if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
        window.location.reload(false)
      } else {
    setStudents(res.data)
      }
      
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