import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState, useContext } from "react";
import DialogOpiekunZ from "../components/DialogOpiekunZ";

import FileDownload from "js-file-download";
import * as axios from "axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { url } from "../services/Url";
import ButtonLink from "../components/Button";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";
import Helper from "../components/Helper";
import { ThemeContext } from "../context/ThemeContext";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function OpiekunStatus(props) {
  const [dzienniczek, setDzienniczek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [remountComponent, setRemountComponent] = useState(0);
  const [komentarz, setKomentarz] = useState("");
  const [opis, setOpis] = useState();
  const statusOpiekuna = "statusOpiekunaZ";
  const [yearFilter, setYearFilter] = useState("Wszystkie");
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [all, setAll] = useState(true);
  const [darkMode] = useContext(ThemeContext);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchSurname, setSearchSurname] = useState("");
  const status = true;

  const handleClose = () => {
    setKomentarz();
    setOpis();
    setOpen(false);
  };
  const handleOpen = (val) => {
    setCheckDay(val);
    setOpen(true);
  };
  const changeToggle = () => {
    if (toggleSearch) {
      setToggleSearch(false);
      setSearchSurname("");
    } else {
      setToggleSearch(true);

      setSearchLogin("");
    }
  };
  useEffect(() => {
    axios.get(`${url}getDaysOpiekunZStatus`).then((res) => {
      if (res.data.message) {
        props.setStatus();
        alert(res.data.message).then(() => {
          window.location.reload(false);
        });
      } else {
        setDzienniczek(res.data);
        setLoading(false);
      }
    });
  }, []);
  const deleteComment = (id, day) => {
    axios
      .delete(`${url}deleteComment/${id}`, {
        id: id,
      })
      .then((res) => {
        if (res.data.message) {
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
        } else {
          setDzienniczek(
            dzienniczek.map((val) => {
              return val.id === day.id
                ? {
                    ...val,
                    komentarzes: val.komentarzes.filter((com) => {
                      return com.id != id;
                    }),
                  }
                : val;
            })
          );
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
        if (res.data.message) {
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
        } else {
          toast.success(`Zmiana statusu na ${status}`);
          setDzienniczek(
            dzienniczek.map((val) => {
              return val.id === id
                ? {
                    ...val,
                    [res.data.status]: status,
                    LaststatusOpiekunaZ: res.data.lastOpiekun,
                  }
                : val;
            })
          );
        }
      });
  };
  const downloadFile = (name) => {
    axios({
      url: `${url}downloadFile/${name}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      if (res.data.message) {
        props.setStatus();
        alert(res.data.message).then(() => {
          navigate("/login");
        });
      } else {
        FileDownload(res.data, name);
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
        if (res.data.message) {
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
        } else {
          toast.success(`Zmiana statusu na ${status}`);

          setDzienniczek(
            dzienniczek.map((val) => {
              return val.id === id
                ? {
                    ...val,
                    [res.data.status]: status,
                    LaststatusOpiekunaZ: res.data.lastOpiekun,
                    opis: opis ? opis : val.opis,
                    komentarzes: komentarz
                      ? [
                          ...val.komentarzes,
                          {
                            id: res.data.commentId,
                            komentarz: komentarz,
                          },
                        ]
                      : [...val.komentarzes],
                  }
                : val;
            })
          );
        }
      });
  };
  const yearArray = [];
  const recordsAfterFiltering = dzienniczek.filter((val) => {
    if (!yearArray.includes(val.createdAt.split("-")[0]))
      yearArray.push(val.createdAt.split("-")[0]);
    if (accepted) {
      if (
        val?.statusOpiekunaZ === "Zaakceptowano" &&
        searchLogin === "" &&
        searchSurname === ""
      ) {
        return yearFilter !== "Wszystkie"
          ? val.createdAt.split("-")[0] === yearFilter
          : val;
      } else if (
        searchLogin !== "" &&
        val?.statusOpiekunaZ === "Zaakceptowano"
      ) {
        return yearFilter !== "Wszystkie"
          ? val?.user?.login
              .toLowerCase()
              .includes(searchLogin.toLowerCase()) &&
              val.createdAt.split("-")[0] === yearFilter
          : val?.user?.login.toLowerCase().includes(searchLogin.toLowerCase());
      } else if (
        searchSurname !== "" &&
        val?.statusOpiekunaZ === "Zaakceptowano"
      ) {
        return val.user.dane.nazwisko
          .toLowerCase()
          .includes(searchSurname.toLowerCase());
      }
    }
    if (all) {
      if (searchLogin === "" && searchSurname === "") {
        return yearFilter !== "Wszystkie"
          ? val.createdAt.split("-")[0] === yearFilter
          : val;
      } else if (searchLogin !== "") {
        return yearFilter !== "Wszystkie"
          ? val?.user?.login
              .toLowerCase()
              .includes(searchLogin.toLowerCase()) &&
              val.createdAt.split("-")[0] === yearFilter
          : val?.user?.login.toLowerCase().includes(searchLogin.toLowerCase());
      } else if (searchSurname !== "") {
        return yearFilter !== "Wszystkie"
          ? val.user.dane.nazwisko
              .toLowerCase()
              .includes(searchSurname.toLowerCase())
          : val.user.dane.nazwisko
              .toLowerCase()
              .includes(searchSurname.toLowerCase()) &&
              val.createdAt.split("-")[0] === yearFilter;
      }
    }
    if (declined) {
      if (
        val?.statusOpiekunaZ === "Odrzucono" &&
        searchLogin === "" &&
        searchSurname === ""
      ) {
        return yearFilter !== "Wszystkie"
          ? val.createdAt.split("-")[0] === yearFilter
          : val;
      } else if (searchLogin !== "" && val?.statusOpiekunaZ === "Odrzucono") {
        return val?.user?.login
          .toLowerCase()
          .includes(searchLogin.toLowerCase());
      } else if (searchSurname !== "" && val?.statusOpiekunaZ === "Odrzucono") {
        return yearFilter !== "Wszystkie"
          ? val.user.dane.nazwisko
              .toLowerCase()
              .includes(searchSurname.toLowerCase())
          : val.user.dane.nazwisko
              .toLowerCase()
              .includes(searchSurname.toLowerCase()) &&
              val.createdAt.split("-")[0] === yearFilter;
      }
    }
  });
  const handleYearChange = (event) => {
    setYearFilter(event.target.value);
    setRemountComponent(Math.random());
  };
  const info = (
    <div>
      Po lewej od przycisku <HelpOutlineOutlined />, możesz wyszukać dni
      studenta po jego e-mailu, jeśli chcesz wyszukać użytkownika po jego
      nazwisku kliknij w przycik "Zmień opcje wyszukiwania". <br />
      Przycisk "Akceptuj" akceptuje dzień studenta. Jeśli chcesz przefiltrować
      dni z dzienniczka po ich roku utworzenia, skorzystaj z pola wybieranego o
      nazwie "Rok".
      <br />
      Przycisk "Odrzuć" odrzuca dzień studenta.
      <br />
      Widzisz także w tym panelu kto ostatni zaakceptował lub odrzucił wpis
      dnia.
      <br />
      Możesz także przejść do dokładniejszej edycji dnia klikając przycisk
      "Edycja".
      <br />W dokładniejszej edycji dnia, możesz zmienić opis dnia, dodać
      komentarz, a także jak w przypadku wcześniej zaakceptować, lub odrzucić
      dzień studenta.
      <br />
      Po prawej od przycisku <HelpOutlineOutlined /> znajduje się przycisk
      "Nowe", a w niej znajdują się nowe dni do oceny, jeśli odrzuciłeś dzień,
      to student może ci przesłać poprawiony dzień, który znajdzie się własnie w
      tamtym panelu.
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
              searchLogin={searchLogin}
              darkMode={darkMode}
              setRemountComponent={setRemountComponent}
              toggleSearch={toggleSearch}
              setSearchSurname={setSearchSurname}
              searchSurname={searchSurname}
            />
          )}
          <Helper
            info={info}
            title="Pomoc opiekun zakładowy historia"
            darkMode={darkMode}
          />
          <ButtonLink linkTo="/opiekunz" text="Nowe" />
        </div>
        <Button
          variant="contained"
          onClick={() => {
            changeToggle();
          }}
        >
          Zmień opcje wyszukiwania
        </Button>
        <div style={{ marginTop: "1.5rem" }}>
          <FormControl style={{ width: "200px", height: "60px" }}>
            <InputLabel
              sx={{ color: darkMode === "white" ? null : "white !important" }}
            >
              Rok
            </InputLabel>
            <Select
              sx={{
                color: darkMode === "white" ? null : "white !important",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode === "white" ? null : "white !important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode === "white" ? null : "white !important",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode === "white" ? null : "white !important",
                },
                ".MuiSvgIcon-root ": {
                  fill: darkMode === "white" ? null : "white !important",
                },
              }}
              value={yearFilter}
              label="Rok"
              variant="outlined"
              onChange={handleYearChange}
            >
              <MenuItem value={"Wszystkie"}>Wszystkie</MenuItem>
              {yearArray.map((val) => (
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          {accepted ? (
            <Button
              variant="outlined"
              disabled
              style={{ marginRight: "0.5rem" }}
            >
              Zatwierdzone
            </Button>
          ) : (
            <Button
              style={{ marginRight: "0.5rem" }}
              color="success"
              variant="contained"
              onClick={() => {
                setAccepted(true);
                setAll(false);
                setDeclined(false);
                setRemountComponent(Math.random());
              }}
            >
              Zatwierdzone
            </Button>
          )}
          {all ? (
            <Button
              variant="outlined"
              disabled
              style={{ marginRight: "0.5rem" }}
            >
              Wszystkie
            </Button>
          ) : (
            <Button
              style={{ marginRight: "0.5rem" }}
              variant="contained"
              onClick={() => {
                setAll(true);
                setAccepted(false);
                setDeclined(false);
                setRemountComponent(Math.random());
              }}
            >
              Wszystkie
            </Button>
          )}
          {declined ? (
            <Button
              variant="outlined"
              disabled
              style={{ marginRight: "0.5rem" }}
            >
              Odrzucone
            </Button>
          ) : (
            <Button
              style={{ marginRight: "0.5rem" }}
              color="error"
              variant="contained"
              onClick={() => {
                setDeclined(true);
                setAll(false);
                setAccepted(false);
                setRemountComponent(Math.random());
              }}
            >
              Odrzucone
            </Button>
          )}
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
              status={status}
              statusOpiekuna={statusOpiekuna}
              dzienniczek={dzienniczek}
              darkMode={darkMode}
            />
          </div>
        ) : null}
      </Container>
      <DialogOpiekunZ
        downloadFile={downloadFile}
        deleteComment={deleteComment}
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

export default OpiekunStatus;
