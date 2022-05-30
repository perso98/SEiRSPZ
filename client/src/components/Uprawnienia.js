import axios from 'axios'
import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react'
export default function Uprawnienia() {


  const [students,setStudents]=useState([])
  useEffect(()=>
  {

    axios.get("http://localhost:5000/api/getStudents").then((res)=>{
      
    setStudents(res.data)
      
    })
  },[])

  const columns = [
    {
      id: 1,
      name: "Login",
      selector: (row) => row.login,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "Student",
      selector: (row) => row.isStudent,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: "Opiekun Zakładowy",
      selector: (row) => row.isOpiekunZakl,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: "Opiekun Uczelniany",
      selector: (row) => row.isOpiekun,
      sortable: true,
      reorder: true
    },
    {
      id: 5,
      name: "Dziekanat",
      selector: (row) => row.isDziekanat,
      sortable: true,
      reorder: true
    },
    {
      id: 6,
      name: "Dyrektor",
      selector: (row) => row.isDyrektor,
      sortable: true,
      reorder: true
    },
    {
    id: 7,
    name: "Admin",
    selector: (row) => row.isAdmin,
    sortable: true,
    reorder: true
  },
  ]


  

  return (
<div className="App">
        <DataTable
          title="Konta"
          columns={columns}
          data={students}
          pagination
        />
    </div>
  )
}
