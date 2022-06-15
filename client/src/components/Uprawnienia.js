import axios from 'axios'
import {makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Toolbar, TextField, Button} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
const useStyles = makeStyles(theme=>({
  table:{
    marginTop:theme.spacing(2),
    '& thead th':{
      fontWeight: '700',
    },
  '& tbody tr:hover':{
    backgroundColor:'gray',
    cursor:'pointer',
  },

},
searchInp:{
  width: '40%',
},
toolbar:{
  marginTop:'2%',
},
NoData:{
  display:'flex',
  justifyContent:'space-between',
  fontWeight:'600',
}
}))
export default function Uprawnienia() {

  const classes = useStyles()

  const [students,setStudents]=useState([])
  useEffect(()=>
  {

    axios.get("http://localhost:5000/api/getStudents").then((res)=>{
      
    setStudents(res.data)
      
    })
  },[])

  const pages = [10,15,20]
  const [page,setPage]=useState(0)
  const [pageRows,setpageRows]=useState(pages[page])
  const [searchLogin,setSearchLogin]=useState('')

 
  const HeadCells = [
    {id: 'login',label:'Login'},
    {id: 'isStudent',label:'Student'},
    {id: 'isAdmin',label:'Admin'},
  ]
  
  const handleChangePage = (event,newPage)=>{
    setPage(newPage)

  }

  const handleChangeRowsPerPage = (event)=>{
    setpageRows(parseInt(event.target.value,10))
    setPage(0)
  }
  const recordsAfterFiltering=students.filter((val)=>{
      if(searchLogin==''){
        return val}

      else if (val.login.toLowerCase().includes(searchLogin.toLowerCase())){
      return val }           
    })
    const recordsAfter = ()=>{
      return recordsAfterFiltering.slice(page*pageRows,(page+1)*pageRows)
    }
   
  


  return (
    <>
    <Toolbar className={classes.toolbar}>
    <TextField
    className={classes.searchInp}
      label="Szukaj"
      variant='outlined'
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      
      onChange={(e)=>{
        setSearchLogin(e.target.value)
      }}
    />
    </Toolbar>

<Table className={classes.table}>
<TableHead>
    <TableRow>
      {
        HeadCells.map(head => (<TableCell key={head.id}>
          {head.label}
        </TableCell>))
      }
    </TableRow>
    </TableHead>
  <TableBody>

    {
     recordsAfter().map(val => 
        (
          <TableRow key={val.id}>
            <TableCell>{val.login}</TableCell>
            <TableCell>{val.isStudent}</TableCell>
            <TableCell>{val.isAdmin==1? <button style={{background:'red'}}>Odbierz</button>:<button style={{background:'green'}}>Nadaj</button>  }</TableCell>
           
          </TableRow>
        ))
    }
     {recordsAfterFiltering.length==0 && <div className={classes.NoData}><div/><div>Brak danych...</div><div/></div>}
    
           
  </TableBody>
  <TablePagination
  component="div"
  page={page}
  rowsPerPageOptions={pages}
  rowsPerPage={pageRows}
  count={recordsAfterFiltering.length}
  onChangePage={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}  />
</Table>
</>
  )
}
