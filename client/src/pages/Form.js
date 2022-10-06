import React,{useState,useEffect} from 'react'
import Axios from "axios"
import { makeStyles } from '@mui/styles'
import { Button, Grid, TextField, Box, Alert,Collapse,IconButton, Typography } from '@mui/material';


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


function Form() {
    const classes = useStyles();

    const [nazwaKierunku, setNazwaKierunku] = useState();

    const [sipsKierunkow, setSipsKierunkow] = useState([]);

    const dodanieKierunku = () => {
        setSipsKierunkow([
        ...sipsKierunkow,
        {
            nazwaKierunku: nazwaKierunku,
            listaEfektow: [
            ],
        },
      ]);
    }

    const [nazwaEfektu, setNazwaEfektu] = useState();

    
    const dodanieEfektu = (nazwaKierunku) => {

        
        // const list = sipsKierunkow.map((val) => (
        //     val.nazwaKierunku == nazwaKierunku ? { 
        //         val
        //     } : null
        // ))
        
        // list.push(nazwaEfektu)

        // setSipsKierunkow(
        //     sipsKierunkow.map(val => (
        //         val.nazwaKierunku == nazwaKierunku ? { 
        //             ...val, 
        //             listaEfektow()
        //         } : val
        //     ))
        // )

        // console.log(list)

        // setSipsKierunkow(
        //     sipsKierunkow.map((val) => (
        //         val.nazwaKierunku == nazwaKierunku ? { 
        //             ...val, 
        //             list : val.listaEfektow
        //         } : val
        //     ))
        // )

    }

    const consoleLog = () => {
        console.log(sipsKierunkow)
    }

    const [formStatus, setFormStatus] = useState([]);
    const [dziennikZalaczniki, setDziennikZalaczniki] = useState([]);


    

    return (
    <Grid>
        <Grid container  sm={12} className={classes.center}  >
            <div/>

            <div className={classes.changePasswordForm}>

                <Typography variant="h4" color="initial" style={{paddingBottom: '5%'}}> 
                    Dodawanie efektów uczenia się
                </Typography> 
                
                <TextField
                required
                type="text"
                label="Kierunek:"
                margin='normal'
                onChange={(e) => {
                    setNazwaKierunku(e.target.value);
                }}
                />
                <Button
                    variant="contained"
                    style={{  }}
                    onClick={() => {
                        dodanieKierunku();
                    }}
                >
                    Dodaj 
                </Button>
            </div>
            <div/>
        </Grid>

        <Button
            variant="contained"
            style={{  }}
            onClick={() => {
                consoleLog();
            }}
        >
            Console log 
        </Button>
                            
        <Grid container  sm={12} className={classes.center}>
            { sipsKierunkow.length > 0 ? (
                <div>
                    {sipsKierunkow.map((val) => (
                        <div>
                            <Typography color="initial" style={{fontSize: '26px'}}> 
                                Kierunek:<br/> <p style={{fontSize: '20px'}}>{val.nazwaKierunku}</p>
                            </Typography> 
                            
                            Efekty uczenia się:
                            <div>
                            {val.listaEfektow.map((efekt) => (
                                <div>
                                    {efekt.nazwa}
                                </div>
                            ))}
                            </div>
                            <div>
                                <TextField
                                    label="Efekt"
                                    id="efekt"
                                    margin="normal"
                                    onChange={(e) => {
                                        setNazwaEfektu(e.target.value);
                                    }}
                                />
                                <Button 
                                    variant="contained" 
                                    onClick={() => {
                                        dodanieEfektu(val.nazwaKierunku);
                                        }} 
                                    style={{marginTop:'20px',minHeight:'50px',fontSize:'15px'}}
                                >
                                    Zapisz
                                </Button>
                                
                            </div> 
                            
                        </div>
                    ))}
                </div>
            ): <div>Brak kierunków</div>}
        </Grid>
    </Grid>
    )
    
}

export default Form