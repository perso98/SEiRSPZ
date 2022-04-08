import {React,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import  Axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { AppBar, Toolbar, Typography } from '@mui/material'
import logo from '../img/ans.png'
import Person from '@mui/icons-material/Person';
import Person2 from '@mui/icons-material/PersonAddAlt1';




function Nav() {
  const useStyles = makeStyles(theme => ({
    logoBig:{
      display:'block',
      [theme.breakpoints.down("md")]:{
        display:'none'
      }
    },

    logoLit:{
      display:'none',
      [theme.breakpoints.down("md")]:{
        display:'block'
      }
    },
    toolbar:{
      display:'flex',
      justifyContent:'space-around'
    },
    login:{
      display:'flex',
      alignItems:'center',
      marginRight:theme.spacing(3),  
      fontSize:'20px',
      [theme.breakpoints.down("md")]:{
        fontSize:'16px'
      }
      
    },
    register:{
      display:'flex',
      alignItems:'center',
      marginRight:theme.spacing(2),
      fontSize:'20px',
      [theme.breakpoints.down("md")]:{
        fontSize:'16px'
      }      
    },
    menu:{
      display:'flex',
      
      
    },
    links:{
      textDecoration: 'none', 
      color:'white',
      "&:hover": {
        color:'yellow',
        textDecoration: 'none', 
      },
    },
  }));
  const navigate = useNavigate()
  const classes = useStyles()
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




  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
      <Typography variant='h5' className={classes.logoBig} >
      <Link to='/' className={classes.links} >Akademia Nauk Stosowanych</Link>
      </Typography>
      <Typography variant='h5' className={classes.logoLit}>
      <Link to='/' className={classes.links} >ANS</Link>
      </Typography>
      <div className={classes.menu}>
      <Link to ='login' className={classes.links} ><div className={classes.login}>
          
          <Person style={{marginRight:'0.4rem'}}/>Logowanie
        </div></Link>
        <Link to ='register' className={classes.links} ><div className={classes.register}>
        
          <Person2 style={{marginRight:'0.5rem'}}/>Rejestracja
        </div></Link>

      </div>
      
      
      </Toolbar>
    </AppBar>
  )
}

export default Nav