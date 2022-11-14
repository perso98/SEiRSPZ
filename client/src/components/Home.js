import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Typography } from "@mui/material";
import logo from "../img/ans.png";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loginForm: {
    paddingTop: "8rem",
    padding: "20px",
  },
}));

function Home(props) {
  const [darkMode] = useContext(ThemeContext);

  const unlogedText = (
    <div>
      Celem aplikacji na której znajdujesz się jest:
      <br />
      <br />
      <li>
        Ułatwienie studentowi rozliczenie się z praktykami zawodowymi, poprzez
        prowadzenie dzienniczka,
      </li>
      <li>
        Polepsza rozliczanie praktyk oraz możliwość pomocy opiekunom pośród ich
        studentów
      </li>
      <li>
        Umożliwia pracownikom dziekanatu proste zarządzanie zakładami pracy oraz
        studentami, którzy w nich przebywają.{" "}
      </li>
      <br />
      Aplikacja jest stworzona dla Akademii Nauk Stosowanych w Elblągu im.
      Krzysztofa Brzeskiego.
      <br />
      <br />
      Aby skorzystać z aplikacji <Link to="/register">
        utwórz konto
      </Link> lub <Link to="/login">zaloguj się</Link>.
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <span style={{ fontSize: "11px" }}>
          Autorzy aplikacji <br /> Maciej Sierżęga{" "}
          <a href="mailto:maciej.sierzegaa@gmail.com">
            maciej.sierzegaa@gmail.com
          </a>{" "}
          <br />
          Karol Mikołajewski{" "}
          <a href="mailto:KarolMikolajewski@wp.pl">KarolMikolajewski@wp.pl</a>
        </span>
      </div>
    </div>
  );

  const logedText = (
    <div>
      Witaj {props?.auth?.user?.login},
      <br />
      <br />
      {props?.auth?.user?.isOpiekun ? (
        <li>
          Jako opiekun uczelniany możesz{" "}
          <Link to="/opiekunu">oceniać dni studentów</Link> oraz ich{" "}
          <Link to="/opiekunuefekty">efekty uczenia się </Link>.
          <br />
          <br />
        </li>
      ) : null}
      {props?.auth?.user?.isOpiekunZakl ? (
        <li>
          Jako opiekun zakładowy możesz{" "}
          <Link to="/opiekunz">oceniać dni studentów</Link>.
          <br />
          <br />
        </li>
      ) : null}
      {props?.auth?.user?.isAdmin ? (
        <li>
          Jako administrator możesz skorzystać z{" "}
          <Link to="/admin">panelu administratora</Link>.
          <br />
          <br />
        </li>
      ) : null}
      {props?.auth?.user?.isDyrektor ? (
        <li>
          Jako dyrektor możesz dokonywać zastępstw w panleu{" "}
          <Link to="/zastepstwa">zastępstwa</Link>.
          <br />
          <br />
        </li>
      ) : null}
      {props?.auth?.user?.isDziekanat ? (
        <li>
          Jako dziekanat możesz{" "}
          <Link to="/zarzadzaniezakladami">zarządzać zakładami</Link> oraz
          dokonywać zmian w{" "}
          <Link to="/efektyuczeniasie">efektach uczenia się </Link>.
          <br />
          <br />
        </li>
      ) : null}
      {props?.auth?.user?.isStudent ? (
        <li>
          Jako student możesz prowadzić{" "}
          <Link to="/dzienniczek">dzienniczek praktyk</Link> oraz uzupełnić{" "}
          <Link to="/efekty">efekty uczenia się </Link>.
          <br />
          <br />
        </li>
      ) : null}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <span style={{ fontSize: "11px" }}>
          Autorzy aplikacji <br /> Maciej Sierżęga{" "}
          <a href="mailto:maciej.sierzegaa@gmail.com">
            maciej.sierzegaa@gmail.com
          </a>{" "}
          <br />
          Karol Mikołajewski{" "}
          <a href="mailto:KarolMikolajewski@wp.pl">KarolMikolajewski@wp.pl</a>
        </span>
      </div>
    </div>
  );

  const classes = useStyles();
  return (
    <Grid
      container
      sm={12}
      justifyContent={"space-between"}
      className={classes.loginForm}
    >
      <div />

      <div
        elevation={12}
        style={{
          backgroundColor: darkMode == "white" ? "white" : "#242424",
          padding: "3rem",
          color: darkMode == "white" ? "black" : "white",
          display: "flex",
          flexDirection: "column",
          minWidth: "250px",
        }}
      >
        <img src={logo} alt="Logo" style={{ marginBottom: "2rem" }} />
        {console.log(props.auth)}
        <div style={{ maxWidth: "600px" }}>
          {props?.auth?.logged ? logedText : unlogedText}
        </div>
      </div>
      <div />
    </Grid>
  );
}

export default Home;
