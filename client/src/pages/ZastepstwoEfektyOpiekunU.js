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
function ZastepstwoEfektyOpiekunU(props) {
  const [opis, setOpis] = useState("");
  const [studenci, setStudenci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkStudent, setCheckStudent] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [efekt, setEfekt] = useState(0);
  const [efektId, setEfektId] = useState(0);
  const navigate = useNavigate();

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
    const id = props.infoUser.user.id
    console.log("QQQQQQQQQQQQ Efekty Opiekun U " + id)
    axios.get(`${url}getEffectsOpiekunUZastepstwo/${id}`).then((res) => {
      if (res.data.message) {
        props.setStatus();
        alert(res.data.message).then(() => {
          navigate("/login");
        });
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
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
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
    if (searchLogin == "") {
      return val;
    } else if (val.login.toLowerCase().includes(searchLogin.toLowerCase())) {
      return val;
    }
  });
  const info = (
    <div>
      W tym panelu oceniasz efekty uczenia się przypisanych do ciebie studentów.
      <br />
      Po lewej od przycisku <HelpOutlineOutlined />, możesz wyszukać dni
      studenta po jego e-mailu. <br />
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
  return (
    <>
      <Container style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        {loading && <h5>Ładowanie...</h5>}

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
              setItemOffset={setItemOffset}
              darkMode={darkMode}
            />
          )}
          <Helper
            info={info}
            title="Pomoc opiekun uczelniany efekty"
            darkMode={darkMode}
          />
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
        <PaginationForEffects
          data={recordsAfterFiltering}
          open={open}
          handleOpen={handleOpen}
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
          setEfekt={setEfekt}
          opis={opis}
          efekt={efekt}
          checkStudent={checkStudent}
          setOpis={setOpis}
        />
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

export default ZastepstwoEfektyOpiekunU;
