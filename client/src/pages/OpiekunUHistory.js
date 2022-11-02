import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState } from "react";
import DialogOpiekunZ from "../components/DialogOpiekunZ";
import * as axios from "axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ButtonLink from "../components/Button";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../services/Url";
import FileDownload from "js-file-download";
import { useNavigate } from "react-router-dom";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";
import Helper from "../components/Helper";

function OpiekunUHistory(props) {
  const [dzienniczek, setDzienniczek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [komentarz, setKomentarz] = useState("");
  const [opis, setOpis] = useState();
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [all, setAll] = useState(true);
  const [remountComponent, setRemountComponent] = useState(0);

  const statusOpiekuna = "statusOpiekunaU";
  const navigate = useNavigate();
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

  useEffect(() => {
    axios.get(`${url}getDaysOpiekunUStatus`).then((res) => {
      if (res.data.message) {
        props.setStatus();
        alert(res.data.message).then(() => {
          navigate("/login");
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
              return val.id == day.id
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
  const downloadFile = (name) => {
    axios({
      url: `${url}downloadFile/${name}`,
      method: "GET",
      responseType: "blob",
    })
      .then((res) => {
        if (res.data.message) {
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
        } else {
          FileDownload(res.data, name);
        }
      })
      .catch(function (error) {
        alert(error);
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
              return val.id == id ? { ...val, [res.data.status]: status } : val;
            })
          );
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
              return val.id == id
                ? {
                    ...val,
                    [res.data.status]: status,
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

  const recordsAfterFiltering = dzienniczek.filter((val) => {
    if (accepted == true && all == false && declined == false) {
      if (val?.statusOpiekunaU === "Zaakceptowano" && searchLogin == "") {
        return val;
      } else if (
        val?.user?.login.toLowerCase().includes(searchLogin.toLowerCase()) &&
        val?.statusOpiekunaU === "Zaakceptowano" &&
        searchLogin !== ""
      ) {
        return val;
      }
    }
    if (all == true && accepted == false && declined == false) {
      if (searchLogin == "") {
        return val;
      } else if (
        val?.user?.login.toLowerCase().includes(searchLogin.toLowerCase()) &&
        searchLogin !== ""
      ) {
        return val;
      }
    }
    if (declined == true && all == false && accepted == false) {
      if (val?.statusOpiekunaU === "Odrzucono" && searchLogin == "") {
        return val;
      } else if (
        val?.user?.login.toLowerCase().includes(searchLogin.toLowerCase()) &&
        val?.statusOpiekunaU === "Odrzucono" &&
        searchLogin !== ""
      ) {
        return val;
      }
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
      Widzisz także w tym panelu status pozostałego opiekuna.
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
    <div
      style={{ background: props.darkMode == "white" ? "white" : "#242424" }}
    >
      <Container
        style={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
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
                color: props.darkMode == "white" ? "black" : "white",
              }}
            >
              Ładowanie...
            </h5>
            <div />
          </div>
        )}
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          {!loading && (
            <SearchBar
              setSearchLogin={setSearchLogin}
              setRemountComponent={setRemountComponent}
              darkMode={props.darkMode}
            />
          )}
          <Helper
            info={info}
            title="Pomoc opiekun uczelniany historia"
            darkMode={props.darkMode}
          />
          <ButtonLink linkTo="/opiekunu" text="Nowe" />
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
                color: props.darkMode == "white" ? "black" : "white",
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
              darkMode={props.darkMode}
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
        darkMode={props.darkMode}
      />
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default OpiekunUHistory;
