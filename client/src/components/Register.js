import React,{useState,useEffect} from 'react'
import Axios from "axios"
import logo from '../img/ans.png'
import { Button, Grid, TextField,Box,Collapse,Alert,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Register() {
  const [registerLogin,setLogin]=useState("");
  const [registerPassword,setPassword]=useState("");
  const [registerPassword2,setPassword2]=useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [alertSeverity, setalertSeverity] = useState('');
  
  const [open, setOpen] = useState(false);



  const createAccount = ()=>
  {
    Axios.post("http://localhost:5000/api/createAccount",
    {
      registerLogin : registerLogin,
      registerPassword : registerPassword,
      registerPassword2 : registerPassword2,
    }).then((res) => {
      if (res.data.message) {
        setRegisterStatus(res.data.message);
        if(res.data.message=='Konto zostało pomyślnie utworzone ;)')
        setalertSeverity(false)
        else setalertSeverity(true)  
        setOpen(true);
        console.log(res.data.message)
        console.log(alertSeverity)
      }
    })
  }


  return (
    <Grid container  sm={12} justifyContent={'space-between'} style={{padding:20,marginTop:'7%'}} >

    <div />
    <div style={{display:'flex', flexDirection:'column', minWidth:'250px'}}>
    <img src={logo} alt="Logo" style={{marginBottom:'5%'}}/>
    { registerStatus!='' &&

<Box sx={{ width: '100%' }}>
   <Collapse in={open}>

    <>

    {alertSeverity ?  <Alert severity='error'
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
       {registerStatus}
     </Alert> :
      <Alert severity='success'
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
      {registerStatus}
    </Alert>}

    </>

    
   </Collapse>
 </Box>}

      <TextField
        name="registerLogin"
        label="Login:"
        onChange={(e=>{setLogin(e.target.value)})}
        margin='normal'
        
      />
        <TextField
        name="registerPassword"
        label="Hasło:"
        onChange={(e=>{setPassword(e.target.value)})}
        margin='normal'
        type="password"
      />
       <TextField
        name="registerPassword2"
        label="Powtórz hasło:"
        onChange={(e=>{setPassword2(e.target.value)})}
        margin='normal'
        type="password"
      />
    
    <Button variant="contained" style={{marginTop:'20px',minHeight:'50px',fontSize:'17px'}} onClick={createAccount}>
      Utwórz konto
    </Button>
    </div>
    <div />
          
       </Grid>
  )
}

export default Register