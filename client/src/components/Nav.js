import {React,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import  Axios  from 'axios'
import { useNavigate } from 'react-router-dom'




function Nav() {
  const navigate = useNavigate()
  Axios.defaults.withCredentials=true
  const [logged,setLogged]=useState('')
  useEffect( ()=>
{
   Axios.get("http://localhost:5000/api/loginToAccount").then((res)=>{
    setLogged(res.data.logged)  
  }
  )
})
const logout = ()=>{ 
  Axios.post("http://localhost:5000/api/logoutFromAccount")
navigate('/')}



  const Navbar = () => {
    return(
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
         <div className="navbar-nav mx-auto">
             <Link to='/' className="nav-item nav-link fonter">Strona główna</Link>
             <Link to='/login' className="nav-item nav-link fonter">Logowanie</Link>
             <Link to='/register' className="nav-item nav-link fonter">Rejestracja</Link>
             <Link to='/form' className="nav-item nav-link fonter">Form</Link>
             <Link to='/ListaStudentow' className="nav-item nav-link fonter">Lista Studentow</Link>
      
         </div>
        </div>
      </nav>
          )
    }
  
      const NavLogged = () => {
    
       
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
      </nav>)
      }





  return (
  
    <>
                  
      {logged ? <NavLogged/> : <Navbar/>}
                  
    </>
    
  )
    
}
export default Nav;