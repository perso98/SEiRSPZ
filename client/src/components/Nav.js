import React from "react";
import {Link} from 'react-router-dom'

function Nav() {
    
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
   </div>
  </div>
</nav>
    )
}
export default Nav;