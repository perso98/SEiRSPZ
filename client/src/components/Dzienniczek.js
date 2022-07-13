import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { Container, Typography, Grid, Input, TextField } from '@mui/material'
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const useStyles = makeStyles(theme => ({
    containerMain:{
        height: "100vh",
    },
    dni:{
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    ol:{
        listStyle: "none",
    },
    dniItem:{
        display:"flex",
        alignItems:"center",
        fontSize: "20px !important",
    },
    links:{
        textDecoration: 'none', 
        color:'black',
        "&:hover": {
          color:'white',
          textDecoration: 'none', 
        },
    },
    content:{
        paddingTop: theme.spacing(2),
    },

    label:{
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(1),
    },
    form:{
        paddingRight: theme.spacing(2),
    },
}));




function Dzienniczek() {
    const classes = useStyles();

    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={classes.containerMain}>

    
        <Grid >
            <Grid item className={classes.dni}>
                <details>
                    <summary>
                        Nieuzupelnione
                    </summary>
                    <ol className={classes.ol}>
                        <li>
                            <Link to ='Dzienniczek' className={classes.links} >
                                <div className={classes.dniItem}>
                                    <Typography className={classes.text} >Dzień 1</Typography>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to ='Dzienniczek' className={classes.links} >
                                <div className={classes.dniItem}>
                                    <Typography className={classes.text} >Dzień 2</Typography>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to ='Dzienniczek' className={classes.links} >
                                <div className={classes.dniItem}>
                                    <Typography className={classes.text} >Dzień 3</Typography>
                                </div>
                            </Link>
                        </li>
                    </ol>
                </details>
            
                <details>
                    <summary>
                        Uzupelnione
                    </summary>
                    <ol className={classes.ol}>
                        <li>
                            <Link to ='Dzienniczek' className={classes.links} >
                                <div className={classes.dniItem}>
                                    <Typography className={classes.text} >Dzień 4</Typography>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to ='Dzienniczek' className={classes.links} >
                                <div className={classes.dniItem}>
                                    <Typography className={classes.text} >Dzień 4</Typography>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to ='Dzienniczek' className={classes.links} >
                                <div className={classes.dniItem}>
                                    <Typography className={classes.text} >Dzień 4</Typography>
                                </div>
                            </Link>
                        </li>
                    </ol>
                </details>
                <div>
                
                    <Button variant="contained">Dodaj dzień</Button>
                
                </div>
                
            </Grid>
            <Grid item xs className={classes.content}>
                <Grid container>
                    <Grid item xs>
                        <form className={classes.form}>
                            <div>
                                <Grid container>
                                    <Grid item margin={3}>
                                        Dzień X
                                    </Grid>
                                    <Grid item marginRight={1}>
                                        <TextField className={classes.TextField}
                                        label="Data"
                                        id="data"
                                        defaultValue="XX.XX.XXXX"
                                        size='8'
                                        sx={{ width: '15ch'}}
                                        margin="normal"
                                        />
                                    </Grid>
                                    <Grid item >
                                        <TextField className={classes.TextField}
                                        label="Ilość godzin"
                                        id="iloscGodzin"
                                        defaultValue="8"
                                        sx={{ width: '13ch'}}
                                        margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs margin={3}>
                                        Status Zatwierdzono / Niezatwierdzono
                                    </Grid>
                                </Grid>
                            </div>
                            <div>
                                <TextField className={classes.TextField}
                                    fullWidth 
                                    label="Opis wykonanej pracy"
                                    multiline
                                    margin="normal"
                                />
                            </div>

                            <div>
                                <Button variant="contained">Dodaj załącznik</Button>
                            </div>

                            <Box sx={{ minWidth: 200, maxWidth: 200, paddingTop: 2 , paddingBottom: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Efekt uczenia się</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Efekt uczenia się"
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={10}>1</MenuItem>
                                    <MenuItem value={20}>2</MenuItem>
                                    <MenuItem value={30}>3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <div>
                                <Button variant="contained">Zapisz</Button>
                            </div>
                        </form>
                    </Grid>
                </Grid>
                
            
            </Grid>
            <Grid item xs={12}>
                
            </Grid>
        </Grid>
    </div>
  )
}

export default Dzienniczek