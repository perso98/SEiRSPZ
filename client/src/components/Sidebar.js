import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import { makeStyles } from '@mui/styles'
import { Container, Typography, Button , Menu , MenuItem } from '@mui/material'
import DehazeIcon from '@mui/icons-material/Dehaze';
import Homeicon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const useStyles = makeStyles(theme => ({
    container:{
        paddingTop: theme.spacing(2),
        position: "fixed",
        paddingLeft: theme.spacing(-3),
        top: 0,
        left: 0,
        height: "100vh",
        // width: "20vh",
        // maxWidth: " 15vh",
        color: "white",
        backgroundColor: "#08448c",
        paddingLeft: theme.spacing(3),
        [theme.breakpoints.down("sm")]:{
          alignItems: "center",
          paddingRight: theme.spacing(0),
          paddingLeft: theme.spacing(2),
          marginTop: theme.spacing(-1),
      }
    },
    item:{
        display:"flex",
        alignItems:"center",
        marginBottom:theme.spacing(4),
        marginTop:theme.spacing(4),
        [theme.breakpoints.up("sm")]:{
            marginBottom:theme.spacing(3),
            cursor:"pointer",
            
        }
    },
    text:{
      fontSize: "20px !important",
      paddingRight: theme.spacing(10),
        // [theme.breakpoints.down("sm")]:{
        //     display: "none"
        // }
    },
    icon:{
        marginRight:theme.spacing(1),
        
    },
    sidebarIcon:{
      color:'white',
    },

    sidebarIconbtn:{
      marginTop:"3px",
      marginLeft: "-4px",

    },

    sidebarIconcontainer:{
      position:'absolute',
      left: 0,
    },

    links:{
        textDecoration: 'none', 
        color:'white',
        "&:hover": {
          color:'yellow',
          textDecoration: 'none', 
        },
      },
    menu:{
      [theme.breakpoints.down("sm")]:{
        backgroundColor: "#08448c",
    }
    },

}));

function Sidebar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [student,setStudent]=useState()
  const [admin,setAdmin]=useState()
  const [opiekunZ,setOpiekunZ]=useState()
  Axios.defaults.withCredentials=true
  useEffect(()=>{
      Axios.get("http://localhost:5000/api/loginToAccount").then((res)=>
      {
          if(res.data.logged==true)
          {
              setStudent(res.data.user.isStudent)
              setAdmin(res.data.user.isAdmin)
              setOpiekunZ(res.data.user.isOpiekunZakl)
             
          }
      })
  })
  const classes = useStyles();

  return (
    <div className={classes.sidebarIconcontainer}>
      <Button
        onClick={handleClick}
      >
        <DehazeIcon className={classes.sidebarIcon}/>
      </Button>

      <Menu className={classes.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <div className={classes.container}>
            <DehazeIcon className={classes.sidebarIconbtn}
            onClick={handleClose}
            />

          { student==1 && <Link to ='profil/Dzienniczek' className={classes.links} >
            <div className={classes.item}>
              <DateRangeIcon className={classes.icon}/>
              <Typography className={classes.text} >Dzienniczek</Typography> 
            </div>
          </Link> }

          <Link to ='profil/Form' className={classes.links} >
            <div className={classes.item}>
                <AssignmentIcon className={classes.icon}/>
                <Typography className={classes.text} >Formularz</Typography>
            </div>
          </Link>

          <div className={classes.item}>
            <QuestionMarkIcon className={classes.icon} />
            <Typography className={classes.text} >Pomoc</Typography>
          </div>

          <div className={classes.item}>
            <Link to ='Home' className={classes.links} >
              <div className={classes.item}>
                <Homeicon className={classes.icon} />
                <Typography className={classes.text} >Strona główna</Typography>
              </div>
            </Link>
          </div>

          <div className={classes.item}>
            { admin==1 && <Link to ='profil/Uprawnienia' className={classes.links} >
              <div className={classes.item}>
                <Homeicon className={classes.icon} />
                <Typography className={classes.text} >Uprawnienia</Typography>
              </div>
            </Link>}
          </div>
          
          <div className={classes.item}>
            { opiekunZ==1 && <Link to ='profil/OpiekunZ' className={classes.links} >
              <div className={classes.item}>
                <Homeicon className={classes.icon} />
                <Typography className={classes.text} >Opiekun Z</Typography>
              </div>
            </Link>}
          </div>
        </div>
      </Menu>
    </div>
  )
}

export default Sidebar