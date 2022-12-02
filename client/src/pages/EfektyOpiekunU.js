import React, { useEffect, useState, useContext } from "react";
import * as axios from "axios";
import Container from "@material-ui/core/Container";
import SearchBar from "../components/SearchBar";
import PaginationForEffects from "../components/PaginationForEffects";
import EfektyDialog from "../components/EfektyDialog";
import { ToastContainer, toast } from "react-toastify";
import { url } from "../services/Url";
import { useNavigate } from "react-router-dom";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";
import Helper from "../components/Helper";
import { ThemeContext } from "../context/ThemeContext";
import { Button } from "@mui/material";
function EfektyOpiekunU(props) {
  const [opis, setOpis] = useState("");
  const [studenci, setStudenci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkStudent, setCheckStudent] = useState(null);
  const [efekt, setEfekt] = useState(0);
  const [efektId, setEfektId] = useState(0);
  const navigate = useNavigate();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchSurname, setSearchSurname] = useState("");
  const [remountComponent, setRemountComponent] = useState(0);
  const handleClose = () => {
    setOpis();
    setOpen(false);
  };
  const handleOpen = (val) => {
    setEfektId(0);
    setCheckStudent(val);
    setOpen(true);
  };
  const [darkMode] = useContext(ThemeContext);
  useEffect(() => {
    axios.get(`${url}getEffectsOpiekunU`).then((res) => {
      if (res.data.message) {
        window.location.reload(false);
      } else {
        setStudenci(res.data);
        setLoading(false);
      }
    });
  }, []);

  const updateDzienniczek = (id, opis, student, status) => {
    axios
      .put(`${url}updateEffects`, {
        id: id,
        opis: opis,
        status: status,
      })
      .then((res) => {
        if (res.data.message) {
          window.location.reload(false);
        } else {
          toast.success(`Zmiana statusu na ${status}`);
          setStudenci(
            studenci.map((val) => {
              return val.id == student
                ? {
                    ...val,
                    efektyStudents: val.efektyStudents.map((efekty) => {
                      return efekty.id == id
                        ? { ...efekty, komentarz: opis, status: status }
                        : efekty;
                    }),
                  }
                : val;
            })
          );
        }
      });
  };

  const recordsAfterFiltering = studenci.filter((val) => {
    if (searchLogin == "" && searchSurname == "") {
      return val;
    } else if (searchLogin !== "")
      return val?.login.toLowerCase().includes(searchLogin.toLowerCase());
    else if (searchSurname !== "") {
      return val?.dane.nazwisko
        .toLowerCase()
        .includes(searchSurname.toLowerCase());
    }
  });
  const info = (
    <div>
      W tym panelu oceniasz efekty uczenia się przypisanych do ciebie studentów.
      <br />
      Po lewej od przycisku <HelpOutlineOutlined />, możesz wyszukać dni
      studenta po jego e-mailu, jeśli chcesz wyszukać użytkownika po jego
      nazwisku kliknij w przycik "Zmień opcje wyszukiwania". <br />
      Jeśli student nie ma żadnych efektów studenta, to znaczy, że ich nie
      wybrał na swoim koncie.
      <br />
      Przycisk "SPRAWDŹ", pozwala ci na sprawdzenia efektów uczenia się danego
      studenta.
      <br />
      Po wciśnięciu przycisku "SPRAWDŹ", możesz akceptować dany efekt albo go
      odrzucić.
      <br />
      Efekty uczenia się wybierasz z listy rozwijanej, po wybraniu efektu, opis
      efektu powinien się ukazać, a wraz z nim opis efektu studenta (możesz
      eedytować opis), co zrobił, aby osiągnął ten efekt.
      <br />
      Przy efekcie status "Niezatwierdzone", oznacza iż nie zatwierdziłeś
      efektu.
      <br />
      Przy efekcie status "Zatwierdzone", oznacza iż zatwierdziłeś efekt.
      efektu.
      <br />
      Masz dostęp od razu do edycji opisu tego efektu, więc w łatwy sposób
      możesz go zedytować i przesłać do studenta.
      <br />
    </div>
  );
  const changeToggle = () => {
    if (toggleSearch) {
      setToggleSearch(false);
      setSearchLogin("");
    } else {
      setToggleSearch(true);
      setSearchSurname("");
    }
  };
  return (
    <>
      <Container style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        {loading && (
          <h5
            style={{
              color: darkMode == "white" ? "black" : "white",
            }}
          >
            Ładowanie...
          </h5>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!loading && (
            <SearchBar
              setSearchLogin={setSearchLogin}
              darkMode={darkMode}
              setRemountComponent={setRemountComponent}
              toggleSearch={toggleSearch}
              setSearchSurname={setSearchSurname}
            />
          )}
          <Helper
            info={info}
            title="Pomoc opiekun uczelniany efekty"
            darkMode={darkMode}
          />
        </div>
        <Button
          variant="contained"
          onClick={() => {
            changeToggle();
          }}
        >
          Zmień opcje wyszukiwania
        </Button>
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
            <PaginationForEffects
              data={recordsAfterFiltering}
              open={open}
              handleOpen={handleOpen}
              setEfekt={setEfekt}
              opis={opis}
              efekt={efekt}
              checkStudent={checkStudent}
              setOpis={setOpis}
            />{" "}
          </div>
        ) : null}
      </Container>
      <EfektyDialog
        open={open}
        handleClose={handleClose}
        checkStudent={checkStudent}
        efekt={efekt}
        setEfekt={setEfekt}
        opis={opis}
        setOpis={setOpis}
        updateDzienniczek={updateDzienniczek}
        efektId={efektId}
        setEfektId={setEfektId}
        darkMode={darkMode}
      />
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default EfektyOpiekunU;
