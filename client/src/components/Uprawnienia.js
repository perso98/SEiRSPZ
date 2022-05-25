import axios from 'axios'
import React, { useState, useEffect } from 'react'
export default function Uprawnienia() {


 const $ = require('jquery')
 $.DataTable = require('datatables.net')

  $(document).ready(function () {
      $('#accounts').DataTable();
  });




  const [students,setStudents]=useState([])
  useEffect(()=>
  {

    axios.get("http://localhost:5000/api/getStudents").then((res)=>{
      
    setStudents(res.data)
      
    })
  },[])


  return (
 <div>
    <table id="accounts" class="display">
    <thead>
        <tr>
            <th>Login</th>
            <th>Student</th>
            <th>Opiekun Zakładowy</th>
            <th>Opiekun Uczelniany</th>
            <th>Dziekanat</th>
            <th>Dyrektor</th>
            <th>Admin</th>
        </tr>
    </thead>
    <tbody>
      
    {students.map((val)=> {
      return (

        <tr>
            <td>{val.login}</td>
            <td>{val.isStudent}</td>
            <td>{val.isOpiekunZakl}</td>
            <td>{val.isOpiekun}</td>
            <td>{val.isDziekanat}</td>
            <td>{val.isDyrektor}</td>
            <td>{val.isAdmin}</td>
        </tr>
      )
    })}
        </tbody>
        </table>
        </div>
  )
}
