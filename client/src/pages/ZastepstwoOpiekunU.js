import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState, useContext } from "react";
import DialogOpiekunZ from "../components/DialogOpiekunZ";
import * as axios from "axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ButtonLink from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import FileDownload from "js-file-download";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../services/Url";
import { useNavigate } from "react-router-dom";
import Helper from "../components/Helper";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";
import { makeStyles } from "@material-ui/core";
import { ThemeContext } from "../context/ThemeContext";
const useStyles = makeStyles((theme) => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));
function ZastepstwoOpiekunU(props) {
  const classes = useStyles();
  const [dzienniczek, setDzienniczek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [remountComponent, setRemountComponent] = useState(0);
  const [komentarz, setKomentarz] = useState("");
  const [opis, setOpis] = useState();
  const statusOpiekuna = "statusOpiekunaU";
  const navigate = useNavigate();
  const [darkMode] = useContext(ThemeContext);
  const handleClose = () => {
    setOpis();
    setKomentarz();
    setOpen(false);
  };
  const handleOpen = (val) => {
    setCheckDay(val);
    setOpen(true);
  };

  useEffect(() => {
    const id = props.infoUser.user.id
    console.log(id)
    axios.get(`${url}getDaysOpiekunUZastepstwo/${id}`)
    .then((res) => {
      if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
        window.location.reload(false)
      } else {
      if (res.data.message) {
        props.setStatus();
        alert(res.data.message).then(() => {
          navigate("/login");
        });
      } else {
        setDzienniczek(res.data);
        setLoading(false);
      }
    }
    });
  }, []);
  const downloadFile = (name) => {
    axios({
      url: `${url}downloadFile/${name}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
        window.location.reload(false)
      } else {
      if (res.data.message) {
        props.setStatus();
        alert(res.data.message).then(() => {
          navigate("/login");
        });
      } else {
        FileDownload(res.data, name);
      }
    }
    });
  };
  const changeStatus = (id, status) => {
    axios
      .post(`${url}changeStatus`, {
        id: id,
        status: status,
        statusOpiekuna: statusOpiekuna,
      })
      .then((res) => {
        if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
          window.location.reload(false)
        } else {
        if (res.data.message) {
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
        } else {
          toast.success(`Zmiana statusu na ${status}`);
          setDzienniczek(
            dzienniczek.filter((val) => {
              return val.id != id;
            })
          );
        }
      }
      });
  };
  const changeStatusEdit = (id, status) => {
    axios
      .post(`${url}changeStatusEdit`, {
        id: id,
        status: status,
        opis: opis,
        komentarz: komentarz,
        statusOpiekuna: statusOpiekuna,
      })
      .then((res) => {
        if (res.data.message === "Sesja utracona, zaloguj się ponownie") {
          window.location.reload(false)
        } else {
        if (res.data.message) {
          window.location.reload(false);
        } else {
          setDzienniczek(
            dzienniczek.filter((val) => {
              return val.id != id;
            })
          );
        }
      }
      });
  };

  const recordsAfterFiltering = dzienniczek.filter((val) => {
    if (searchLogin == "") {
      return val;
    } else if (
      val.user.login.toLowerCase().includes(searchLogin.toLowerCase())
    ) {
      return val;
    }
  });
  const info = (
    <div>
      Po lewej od przycisku <HelpOutlineOutlined />, możesz wyszukać dni
      studenta po jego e-mailu. <br />
      Przycisk "Akceptuj" akceptuje dzień studenta.
      <br />
      Przycisk "Odrzuć" odrzuca dzień studenta.
      <br />
      Możesz także przejść do dokładniejszej edycji dnia klikając przycisk
      "Edycja".
      <br />W dokładniejszej edycji dnia, możesz zmienić opis dnia, dodać
      komentarz, a także jak w przypadku wcześniej zaakceptować, lub odrzucić
      dzień studenta.
      <br />
      Po prawej od przycisku <HelpOutlineOutlined /> znajduje się przycisk
      "Historia", a w niej znajdują się już ocenione przez ciebie dni,
      <br />
      Jeśli odrzuciłeś dzień, to student może ci przesłać poprawiony dzień,
      który znajdzie się tutaj.
    </div>
  );
  return (
    <div style={{ background: darkMode == "white" ? "white" : "#242424" }}>
      <Container
        style={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
          background: darkMode == "white" ? "white" : "#242424",
        }}
      >
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div />
              <h5
                style={{
                  color: darkMode == "white" ? "black" : "white",
                }}
              >
                Ładowanie...
              </h5>
              <div />
            </div>
          )}
          {!loading && (
            <SearchBar
              setSearchLogin={setSearchLogin}
              setRemountComponent={setRemountComponent}
              darkMode={darkMode}
            />
          )}
          <Helper info={info} title="Pomoc opiekun uczelniany" />
          <ButtonLink linkTo="/opiekunu/historia" text="Historia" />
        </div>
        {recordsAfterFiltering.length === 0 && !loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div />
            <h6
              style={{
                color: darkMode == "white" ? "black" : "white",
              }}
            >
              Nie odnaleziono wyniku, którego szukasz...{" "}
            </h6>
            <div />
          </div>
        )}
        {recordsAfterFiltering.length > 0 ? (
          <div key={remountComponent}>
            <Pagination
              data={recordsAfterFiltering}
              changeStatus={changeStatus}
              handleOpen={handleOpen}
              open={open}
              statusOpiekuna={statusOpiekuna}
              dzienniczek={dzienniczek}
              darkMode={darkMode}
            />
          </div>
        ) : null}
      </Container>
      <DialogOpiekunZ
        downloadFile={downloadFile}
        open={open}
        handleClose={handleClose}
        checkDay={checkDay}
        changeStatusEdit={changeStatusEdit}
        setOpis={setOpis}
        setKomentarz={setKomentarz}
        statusOpiekuna={statusOpiekuna}
        darkMode={darkMode}
      />
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default ZastepstwoOpiekunU;
