import React,{useState,useEffect} from 'react'
import axios from "axios"
import { makeStyles } from '@mui/styles'
import { Button, Grid, TextField,TableRow, TableCell, Table,
  TableBody,
  
  TableHead,  Box, Alert,Collapse,IconButton, Typography } from '@mui/material';
import { url } from "../services/Url";
import ClearIcon from '@mui/icons-material/Clear';

const useStyles = makeStyles(theme => ({
    container:{
        marginBottom: theme.spacing(10)
    },
    center : {
        justifyContent:'space-around',
     
      },
      changePasswordForm : {
        display:'flex',
        flexDirection:'column',
        padding:'5%',
        minWidth:'600px',
        textAlign:'center',
        [theme.breakpoints.down('md')]:{
          minWidth:'400px',
        },
      },
      daneForm : {
        display:'flex',
        flexDirection:'column',
        paddingBottom:'5%',
        paddingLeft:'5%',
        paddingRight:'5%',
        minWidth:'600px',
        textAlign:'center',
        [theme.breakpoints.down('md')]:{
          minWidth:'400px',
        },
      },
}));


function Zastepstwa() {
    const classes = useStyles();

    const [edit, setEdit] = useState(0);
    const [nazwaKierunku, setNazwaKierunku] = useState();

    const [listaOpiekunow, setListaOpiekunow] = useState([]);
    const [listaZastepstw, setListaZastepstw] = useState([]);

    useEffect(() => {
      axios.get(`${url}getListaOpiekunow`).then((res) => {
        setListaOpiekunow(res.data);
        console.log(res.data)
      });
      axios.get(`${url}getListaZastepstw`).then((res) => {
        setListaZastepstw(res.data);
        console.log(res.data)
      });
  
    }, []);

  //   const dodanieZastepstwa = (id) => {
      
  //     setListaZastepstw([
  //       ...listaZastepstw,
  //       {
  //           userId: userId,
  //       },
  //     ])

  // }

    

    return (
    <Grid>
        <Grid container  xs={12} className={classes.center}  >
          
            {listaOpiekunow.map((val) => (
                <div>
                    <div>
                        {val.imie}
                        {val.nazwisko}

                        <Button>Zastępstwo</Button>
                    </div>
                </div>
            ))}

            {listaZastepstw.map((val) => (
                <div>
                    <div>
                        {val.imie}
                        {val.nazwisko}
                        <Button>Wejdź</Button>
                    </div>
                </div>
            ))}

        </Grid>
    </Grid>
    )
    
}

export default Zastepstwa