import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import  Axios  from 'axios';
import {useNavigate,Navigate } from 'react-router-dom'


function Nav() {
  const navigate = useNavigate()
  Axios.defaults.withCredentials=true
  const [logged,setLogged]=useState('')

  const logout = ()=>{ Axios.post("http://localhost:5000/api/logoutFromAccount")
  navigate('/')
}

  useEffect(()=>
{
  Axios.get("http://localhost:5000/api/loginToAccount").then((res)=>{
    
    setLogged(res.data.logged)
    
  }
  )
})
useEffect(()=>{
  
  Axios.get("http://localhost:5000/api/logoutFromAccount").then((res)=>{
    
    setLogged(res.data.logged)
    
  }
  )
  
})
    return(
        
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
   <div className="navbar-nav mx-auto">
       <Link to='/' className="nav-item nav-link fonter">Strona główna</Link>
       {logged==false && <Link to='/login' className="nav-item nav-link fonter">Logowanie</Link>}
       
       {logged==false &&<Link to='/register' className="nav-item nav-link fonter">Rejestracja</Link>}
       <Link to='/form' className="nav-item nav-link fonter">Form</Link>
       {logged==true && <Link to='/profil/' className="nav-item nav-link fonter">Profil</Link>}
       {logged==true && <button type="submit" class="btn btn-primary" onClick={logout}>Wyloguj</button>}
   </div>
  </div>
</nav>
    )
}
export default Nav;