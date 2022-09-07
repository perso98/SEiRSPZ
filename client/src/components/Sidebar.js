import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { Container, Typography, Button, Menu, MenuItem } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Homeicon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

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
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(2),
      marginTop: theme.spacing(-1),
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
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

  const [student, setStudent] = useState();
  const [admin, setAdmin] = useState();
  const [opiekunZ, setOpiekunZ] = useState();
  const [dziekanat, setDziekanat] = useState();
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
                  <DehazeIcon className={classes.sidebarIcon} />
                </Button>
                {props.auth?.user.isStudent == 1 && (
                  <Link to="/dzienniczek" className={classes.links}>
                    <div className={classes.item}>
                      <DateRangeIcon className={classes.icon} />
                      <Typography className={classes.text}>
                        Dzienniczek
                      </Typography>
                    </div>
                  </Link>
                )}
                {props.auth?.user.isDziekanat == 1 && (
                  <div>
                    {/* <Link to="profil/Dane" className={classes.links}>
                      <div className={classes.item}>
                        <AssignmentIcon className={classes.icon} />
                        <Typography className={classes.text}>
                          Dodaj dane
                        </Typography>
                      </div>
                    </Link> */}

                    <Link to="/dodawanieopiekunow" className={classes.links}>
                      <div className={classes.item}>
                        <AssignmentIcon className={classes.icon} />
                        <Typography className={classes.text}>
                          Dodaj opiekunów
                        </Typography>
                      </div>
                    </Link>

                    {/* <Link to="profil/Form" className={classes.links}>
                      <div className={classes.item}>
                        <AssignmentIcon className={classes.icon} />
                        <Typography className={classes.text}>Form</Typography>
                      </div>
                    </Link> */}
                  </div>
                )}

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

                <div className={classes.item}>
                  <Link to="/admin" className={classes.links}>
                    <div className={classes.item}>
                      <Homeicon className={classes.icon} />
                      <Typography className={classes.text}>
                        Admin Panel
                      </Typography>
                    </div>
                  </Link>
                </div>

                <div className={classes.item}>
                  <Link to="/opiekunz" className={classes.links}>
                    <div className={classes.item}>
                      <Homeicon className={classes.icon} />
                      <Typography className={classes.text}>
                        Opiekun Z
                      </Typography>
                    </div>
                  </Link>
                </div>
                <Link to="/opiekunu" className={classes.links}>
                  <div className={classes.item}>
                    <Homeicon className={classes.icon} />
                    <Typography className={classes.text}>Opiekun U</Typography>
                  </div>
                </Link>

                <Link to="opiekunu/efekty" className={classes.links}>
                  <div className={classes.item}>
                    <Homeicon className={classes.icon} />
                    <Typography className={classes.text}>
                      Opiekun U Efekty
                    </Typography>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Sidebar;
