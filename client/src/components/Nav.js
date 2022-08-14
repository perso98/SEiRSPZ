import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Person from "@mui/icons-material/Person";
import Person2 from "@mui/icons-material/PersonAddAlt1";
import ProfilImg from "@mui/icons-material/AccountCircleOutlined";
import LogoutImg from "@mui/icons-material/LogoutOutlined";
import Sidebar from "../components/Sidebar";
import { getLoginToAccountInfo, logout } from "../services/UserService";

function Nav() {
  const useStyles = makeStyles((theme) => ({
    logoBig: {
      display: "block",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },

    logoLit: {
      display: "none",
      [theme.breakpoints.down("md")]: {
        display: "block",
      },
    },
    toolbar: {
      display: "flex",
      
      justifyContent: "space-between",
      // justifyContent: "space-around",
      // [theme.breakpoints.down("md")]: {
      //   justifyContent: "space-between",
      // },
    },

    login: {
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(3),
      fontSize: "20px",
      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
        marginRight: theme.spacing(3),
      },
    },
    register: {
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(2),
      fontSize: "20px",
      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
        marginRight: theme.spacing(1),
      },
    },

    menu: {
      display: "flex",
    },

    links: {
      textDecoration: "none",
      color: "white",
      "&:hover": {
        color: "yellow",
        textDecoration: "none",
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: theme.spacing(5),
      },
    },

    linksLogoLitSM: {
      textDecoration: "none",
      color: "white",
      "&:hover": {
        color: "yellow",
        textDecoration: "none",
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: theme.spacing(8),
      },
    },

    sidebarBtn: {
      textDecoration: "none",
      color: "white",
      "&:hover": {
        color: "yellow",
        textDecoration: "none",
      },
    },

    buttonLogout: {
      color: "white",
      fontSize: "20px",
    },
  }));

  const navigate = useNavigate();
  const classes = useStyles();
  Axios.defaults.withCredentials = true;
  const [logged, setLogged] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:5000/api/loginToAccount").then((res) => {
      if (res.data.logged == true) {
        setLogged(res.data.logged);
      }
    });
  }, []);

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    getLoginToAccountInfo(setLogged);
  });

  const Navbar = () => {
    return (
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.logoBig}>
            <Link to="/" className={classes.links}>
              Akademia Nauk Stosowanych
            </Link>
          </Typography>
          <Typography variant="h5" className={classes.logoLit}>
            <Link to="/" className={classes.links}>
              ANS
            </Link>
          </Typography>
          <div className={classes.menu}>
            <Link to="login" className={classes.links}>
              <div className={classes.login}>
                <Person style={{ marginRight: "0.2rem" }} />
                Logowanie
              </div>
            </Link>
            <Link to="register" className={classes.links}>
              <div className={classes.register}>
                <Person2 style={{ marginRight: "0.3rem" }} />
                Rejestracja
              </div>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  const NavLogged = () => {
    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Sidebar />
          <Typography variant="h5" className={classes.logoBig}>
            <Link to="/" className={classes.links}>
              Akademia Nauk Stosowanych
            </Link>
          </Typography>
          <Typography variant="h5" className={classes.logoLit}>
            <Link to="/" className={classes.linksLogoLitSM}>
              ANS
            </Link>
          </Typography>
          <div className={classes.menu}>
            <Link to="/profil/konto" className={classes.links}>
              <div className={classes.login}>
                <ProfilImg style={{ marginRight: "0.2rem" }} />
                Konto
              </div>
            </Link>
            <Link
              to="/"
              onClick={() => {
                logout(navigate);
              }}
              className={classes.links}
            >
              <div className={classes.register}>
                <LogoutImg style={{ marginRight: "0.2rem" }} />
                Wyloguj
              </div>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

  return <>{logged ? <NavLogged /> : <Navbar />}</>;
}

export default Nav;
