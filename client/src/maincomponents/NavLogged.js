import {useNavigate,Navigate } from 'react-router-dom'
import React from 'react'
import  Axios  from 'axios';
import {Link} from 'react-router-dom'

function NavLogged() {
    const navigate = useNavigate()
  Axios.defaults.withCredentials=true
  const logout = ()=>{ Axios.post("http://localhost:5000/api/logoutFromAccount")
  navigate('/')
}
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
   <div className="navbar-nav mx-auto">
   <Link to='/profil/' className="nav-item nav-link fonter">Profil</Link>
    <button type="submit" class="btn btn-primary" onClick={logout}>Wyloguj</button>

   </div>
  </div>
</nav>
  )
}

export default NavLogged