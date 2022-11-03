import { React, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Person from "@mui/icons-material/Person";
import Person2 from "@mui/icons-material/PersonAddAlt1";
import ProfilImg from "@mui/icons-material/AccountCircleOutlined";
import LogoutImg from "@mui/icons-material/LogoutOutlined";
import Sidebar from "../components/Sidebar";
import { url } from "../services/Url";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../context/ThemeContext";

function Nav(props) {
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
    },

    login: {
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(4),
      fontSize: "20px",
      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
        marginRight: theme.spacing(1),
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
        marginLeft: theme.spacing(1),
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
        marginLeft: theme.spacing(1),
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
  const [darkMode, setDarkMode] = useContext(ThemeContext);
  Axios.defaults.withCredentials = true;
  const logout = async () => {
    await Axios.post(`${url}logoutFromAccount`).then((res) => {
      if (res.data.message) {
        props.setStatus();

        navigate("/");
      }
      navigate("/");
    });
  };

  const Navbar = () => {
    return (
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div />
          <Typography variant="h5" className={classes.logoBig}>
            <NavLink to="/" className={classes.links}>
              Akademia Nauk Stosowanych
            </NavLink>
          </Typography>
          <Typography variant="h5" className={classes.logoLit}>
            <NavLink to="/" className={classes.links}>
              ANS
            </NavLink>
          </Typography>
          <div>
            {!darkMode || darkMode == "white" ? (
              <IconButton
                onClick={() => {
                  setDarkMode("#242424");
                }}
              >
                <Brightness7Icon style={{ color: "white" }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  setDarkMode("white");
                }}
              >
                <Brightness4Icon style={{ color: "white" }} />
              </IconButton>
            )}
          </div>
          <div className={classes.menu}>
            <NavLink to="login" className={classes.links}>
              <div className={classes.login}>
                <Person style={{ marginRight: "0.2rem" }} />
                Logowanie
              </div>
            </NavLink>
            <NavLink to="register" className={classes.links}>
              <div className={classes.register}>
                <Person2 style={{ marginRight: "0.3rem" }} />
                Rejestracja
              </div>
            </NavLink>
          </div>
          <div />
        </Toolbar>
      </AppBar>
    );
  };

  const NavLogged = () => {
    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Sidebar auth={props.auth} />
          <Typography variant="h5" className={classes.logoBig}>
            <NavLink to="/" className={classes.links}>
              Akademia Nauk Stosowanych
            </NavLink>
          </Typography>
          <Typography variant="h5" className={classes.logoLit}>
            <NavLink to="/" className={classes.linksLogoLitSM}>
              ANS
            </NavLink>
          </Typography>
          <div>
            {!darkMode || darkMode == "white" ? (
              <IconButton
                onClick={() => {
                  setDarkMode("#242424");
                }}
              >
                <Brightness7Icon style={{ color: "white" }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  setDarkMode("white");
                }}
              >
                <Brightness4Icon style={{ color: "white" }} />
              </IconButton>
            )}
          </div>
          <div className={classes.menu}>
            <NavLink to="/konto" className={classes.links}>
              <div className={classes.login}>
                <ProfilImg style={{ marginRight: "0.2rem" }} />
                Konto
              </div>
            </NavLink>
            <Link
              to="/"
              onClick={() => {
                props.setStatus();
                logout();
                window.location.reload(false);
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

  return <>{props.auth?.logged ? <NavLogged /> : <Navbar />}</>;
}

export default Nav;
