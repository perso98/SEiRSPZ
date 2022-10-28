import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState } from "react";
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
function OpiekunStatus(props) {
  const [dzienniczek, setDzienniczek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [komentarz, setKomentarz] = useState("");
  const [opis, setOpis] = useState();
  const statusOpiekuna = "statusOpiekunaZ";
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [all, setAll] = useState(true);

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
    axios.get(`${url}getDaysOpiekunZStatus`).then((res) => {
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
      if (val?.statusOpiekunaZ === "Zaakceptowano" && searchLogin == "") {
        return val;
      } else if (
        val?.user?.login.toLowerCase().includes(searchLogin.toLowerCase()) &&
        val?.statusOpiekunaZ === "Zaakceptowano" &&
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
      if (val?.statusOpiekunaZ === "Odrzucono" && searchLogin == "") {
        return val;
      } else if (
        val?.user?.login.toLowerCase().includes(searchLogin.toLowerCase()) &&
        val?.statusOpiekunaZ === "Odrzucono" &&
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
            />
          )}
          <Helper info={info} title="Pomoc opiekun zakładowy historia" />
          <ButtonLink linkTo="/opiekunz" text="Nowe" />
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
                setItemOffset(0);
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
                setItemOffset(0);
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
                setItemOffset(0);
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
            <h6>Nie odnaleziono wyniku, którego szukasz... </h6>
            <div />
          </div>
        )}
        <Pagination
          data={recordsAfterFiltering}
          changeStatus={changeStatus}
          handleOpen={handleOpen}
          open={open}
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
          status={status}
          statusOpiekuna={statusOpiekuna}
        />
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
      />
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default OpiekunStatus;
