import {React} from 'react'
import {Link} from 'react-router-dom'

import { makeStyles } from '@mui/styles'
import { Container, Typography } from '@mui/material'

import Homeicon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const useStyles = makeStyles(theme => ({
    container:{
        paddingTop: theme.spacing(2),
        position: "sticky",
        top: 0,
        height: "90vh",
        // width: "20vh",
        // maxWidth: " 15vh",
        color: "white",
        backgroundColor: "#08448c",
        paddingLeft: theme.spacing(5),
        [theme.breakpoints.down("sm")]:{
          alignItems: "center",
          paddingRight: theme.spacing(0),
          paddingLeft: theme.spacing(1),
      }
    },
    item:{
        display:"flex",
        alignItems:"center",
        marginBottom:theme.spacing(4),
        [theme.breakpoints.up("sm")]:{
            marginBottom:theme.spacing(3),
            cursor:"pointer"
        }
    },
    text:{
      fontSize: "20px !important",
      paddingRight: theme.spacing(10),
        [theme.breakpoints.down("sm")]:{
            display: "none"
        }
    },
    icon:{
        marginRight:theme.spacing(1),
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

function Sidebar() {
  const classes = useStyles();
  return (
  <div className={classes.container}>
      <Link to ='Dzienniczek' className={classes.links} >
        <div className={classes.item}>
            <DateRangeIcon className={classes.icon}/>
            <Typography className={classes.text} >Dzienniczek</Typography>
        </div>
      </Link>
      <Link to ='Form' className={classes.links} >
        <div className={classes.item}>
            <AssignmentIcon className={classes.icon}/>
            <Typography className={classes.text} >Form</Typography>
        </div>
      </Link>
      <div className={classes.item}>
        <QuestionMarkIcon className={classes.icon} />
        <Typography className={classes.text} >Need Help</Typography>
      </div>
      <div className={classes.item}>
        <Homeicon className={classes.icon} />
        <Typography className={classes.text} >Homepage</Typography>
      </div>
  </div>
  )
}

export default Sidebar