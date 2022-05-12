import { Button, Grid, TextField, Box, Alert,Collapse,IconButton } from '@mui/material';
import  Axios  from 'axios';
import React, {useEffect,useState} from 'react'
import {useNavigate } from 'react-router-dom'
import logo from '../img/ans.png'
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles'




function Login() {
  const useStyles = makeStyles(theme => ({
      loginForm : {
          marginTop:'10%',
          padding:'20px',
          [theme.breakpoints.down("md")]:{
            marginTop:'20%',
          }    

      },
  }))


  const navigate = useNavigate();
  const [loginLogin,getLogin]=useState("");
  const [loginPassword,getPassword]=useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const classes = useStyles()
  const [open, setOpen] = useState(false);



  Axios.defaults.withCredentials=true

  const loginToAccount = ()=>
  {
    Axios.post("http://localhost:5000/api/loginToAccount",
    {
      loginLogin : loginLogin,
      loginPassword : loginPassword,
    }).then((res) => {
      if (res.data.message) 
        setLoginStatus(res.data.message);
        if (res.data.message=='Pomyślne zalogowanie')
          navigate("/profil")
          else {
            setOpen(true);
          }
    })
  }
  
  return (
   <Grid container  sm={12} justifyContent={'space-between'} className={classes.loginForm} >

<div />
<div style={{display:'flex', flexDirection:'column', minWidth:'250px'}}>
<img src={logo} alt="Logo" style={{marginBottom:'5%'}}/>

{ loginStatus!='' &&
   <Box sx={{ width: '100%' }}>
   <Collapse in={open}>
     <Alert severity="error" variant='filled' 
       action={
         <IconButton
           aria-label="close"
           color="inherit"
           size="medium"
           onClick={() => {
             setOpen(false);
           }}
         >
           <CloseIcon fontSize="inherit" />
         </IconButton>
       }
       sx={{ mb: 2 }}
     >
       {loginStatus}
     </Alert>
   </Collapse>
 </Box>}


  <TextField
  required
    name="loginLogin"
    label="Login:"
    onChange={(e=>{getLogin(e.target.value)})}
    margin='normal'
  />
    <TextField
    required
    name="loginPassword"
    label="Hasło:"
    onChange={(e=>{getPassword(e.target.value)})}
    margin='normal'
    type="password"
  />

<Button variant="contained" style={{marginTop:'20px',minHeight:'50px',fontSize:'17px'}} onClick={loginToAccount}>
  Zaloguj się
</Button>
</div>
<div />

      
   </Grid>
  )
}

export default Login