import React, { useState } from "react";
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Typography, Button } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";

import Dialog from "@mui/material/Dialog";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",

    // width: "20vh",
    // maxWidth: " 15vh",
    color: "white",
    backgroundColor: "#022d61",
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      width: "100%",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(2),
      cursor: "pointer",
    },
  },
  text: {
    fontSize: "20px !important",
    paddingRight: theme.spacing(10),
    // [theme.breakpoints.down("sm")]:{
    //     display: "none"
    // }
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  sidebarIcon: {
    color: "white",
  },
  sidebarIconbtn: {
    color: "white",
    position: "flex",
    right: 0,
  },

  sidebarIconcontainer: {
    position: "absolute",
    left: 0,
  },

  links: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      color: "yellow",
      textDecoration: "none",
    },
  },
  menu: {
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#08448c",
    },
  },
}));

function Sidebar(props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  Axios.defaults.withCredentials = true;

  const classes = useStyles();

  return (
    <>
      <Button onClick={handleOpen}>
        <DehazeIcon className={classes.sidebarIconbtn} />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <div className={classes.sidebarIconcontainer}>
          <div>
            <div className={classes.menu}>
              <div className={classes.container}>
                <Button onClick={handleClose}>
                  {open ? (
                    <CloseIcon className={classes.sidebarIcon} />
                  ) : (
                    <DehazeIcon className={classes.sidebarIcon} />
                  )}
                </Button>
                {props.auth?.user.isStudent === 1 && (
                  <div>
                    <NavLink to="/dzienniczek" className={classes.links}>
                      <div className={classes.item}>
                        <NavigateNextIcon className={classes.icon} />
                        <Typography className={classes.text}>
                          Dzienniczek
                        </Typography>
                      </div>
                    </NavLink>
                    <NavLink to="/efekty" className={classes.links}>
                      <div className={classes.item}>
                        <NavigateNextIcon className={classes.icon} />
                        <Typography className={classes.text}>Efekty</Typography>
                      </div>
                    </NavLink>
                  </div>
                )}

                {props.auth?.user.isDziekanat === 1 && (
                  <div>
                    <NavLink
                      to="/zarzadzaniezakladami"
                      className={classes.links}
                    >
                      <div className={classes.item}>
                        <NavigateNextIcon className={classes.icon} />
                        <Typography className={classes.text}>
                          Zarządzanie zakładami
                        </Typography>
                      </div>
                    </NavLink>

                    <NavLink to="/efektyuczeniasie" className={classes.links}>
                      <div className={classes.item}>
                        <NavigateNextIcon className={classes.icon} />
                        <Typography className={classes.text}>
                          Efekty uczenia się
                        </Typography>
                      </div>
                    </NavLink>
                  </div>
                )}

                {/* <Link to="profil/Form" className={classes.links}>
                      <div className={classes.item}>
                        <AssignmentIcon className={classes.icon} />
                        <Typography className={classes.text}>Form</Typography>
                      </div>
                    </Link> */}

                {/* <div className={classes.item}>
                  <QuestionMarkIcon className={classes.icon} />
                  <Typography className={classes.text}>Pomoc</Typography>
                </div> */}

                {/* <div className={classes.item}>
                  <Link to="Home" className={classes.links}>
                    <div className={classes.item}>
                      <Homeicon className={classes.icon} />
                      <Typography className={classes.text}>
                        Strona główna
                      </Typography>
                    </div>
                  </Link>
                </div> */}

                {props.auth?.user.isAdmin === 1 && (
                  <NavLink to="/admin" className={classes.links}>
                    <div className={classes.item}>
                      <NavigateNextIcon className={classes.icon} />
                      <Typography className={classes.text}>
                        Panel Admina
                      </Typography>
                    </div>
                  </NavLink>
                )}

                {props.auth?.user.isOpiekunZakl === 1 && (
                  <NavLink to="/opiekunz" className={classes.links}>
                    <div className={classes.item}>
                      <NavigateNextIcon className={classes.icon} />
                      <Typography className={classes.text}>
                        Opiekun Zakładowy
                      </Typography>
                    </div>
                  </NavLink>
                )}
                {props.auth?.user.isOpiekun === 1 && (
                  <NavLink to="/opiekunu" className={classes.links}>
                    <div className={classes.item}>
                      <NavigateNextIcon className={classes.icon} />
                      <Typography className={classes.text}>
                        Opiekun Uczelniany
                      </Typography>
                    </div>
                  </NavLink>
                )}

                {props.auth?.user.isOpiekun === 1 && (
                  <NavLink to="opiekunu/efekty" className={classes.links}>
                    <div className={classes.item}>
                      <NavigateNextIcon className={classes.icon} />
                      <Typography className={classes.text}>
                        Opiekun Ucz. Efekty
                      </Typography>
                    </div>
                  </NavLink>
                )}

                {props.auth?.user.isDyrektor === 1 && (
                  <NavLink to="/zastepstwa" className={classes.links}>
                    <div className={classes.item}>
                      <NavigateNextIcon className={classes.icon} />
                      <Typography className={classes.text}>
                        Zastepstwa
                      </Typography>
                    </div>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Sidebar;
