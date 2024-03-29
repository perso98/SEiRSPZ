import {React} from 'react'

import { makeStyles } from '@mui/styles'
import { Container} from '@mui/material'
import { padding, textAlign } from '@mui/system';

const useStyles = makeStyles(theme => ({
    container:{
        position: "sticky",
        top: 0,
        width: "100%",
        height: "10vh",
        backgroundColor: "#08448c",
        textAlign: "center",
        color:"white",
        paddingTop: theme.spacing(3)
    },
}));

function Footer() {
  const classes = useStyles();
  return (
      <div className={classes.container}>
        Stopka
      </div>
      )
}

export default Footer