import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState } from "react";
import DialogOpiekunZ from "../components/DialogOpiekunZ";
import * as axios from "axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ButtonLink from "../components/Button";
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
  const [itemOffset, setItemOffset] = useState(0);
  const [komentarz, setKomentarz] = useState("");
  const [opis, setOpis] = useState();
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
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          {!loading && (
            <SearchBar
              setSearchLogin={setSearchLogin}
              setItemOffset={setItemOffset}
            />
          )}
          <Helper info={info} title="Pomoc opiekun uczelniany historia" />
          <ButtonLink linkTo="/opiekunu" text="Nowe" />
        </div>
        {recordsAfterFiltering.length === 0 && !loading && (
          <h6>Nie znaleziono wyniku</h6>
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
      />
      <ToastContainer autoClose={1000} />
    </>
  );
}

export default OpiekunUHistory;
