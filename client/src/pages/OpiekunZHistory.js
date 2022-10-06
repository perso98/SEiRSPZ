import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState } from "react";
import DialogOpiekunZ from "../components/DialogOpiekunZ";
import FileDownload from "js-file-download";
import * as axios from "axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OpiekunStatus() {
  const [dzienniczek, setDzienniczek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [komentarz, setKomentarz] = useState("");
  const [opis, setOpis] = useState();
  const statusOpiekuna = "statusOpiekunaZ";
  import { url } from "../services/Url";

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
      setDzienniczek(res.data);
      setLoading(false);
    });
  }, []);
  const deleteComment = (id, day) => {
    axios
      .delete(`${url}deleteComment/${id}`, {
        id: id,
      })
      .then((res) => {
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
        toast.success(`Zmiana statusu na ${status}`);
        setDzienniczek(
          dzienniczek.map((val) => {
            return val.id == id ? { ...val, [res.data.status]: status } : val;
          })
        );
      });
  };
  const downloadFile = (name) => {
    axios({
      url: `${url}downloadFile/${name}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, name);
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

  return (
    <>
      <Container style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        {loading && <h5>Ładowanie...</h5>}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {!loading && (
            <SearchBar
              setSearchLogin={setSearchLogin}
              setItemOffset={setItemOffset}
            />
          )}
          <Button linkTo="/opiekunz" text="Nowe" />
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
      <ToastContainer autoClose={5000} limit={3} />
    </>
  );
}

export default OpiekunStatus;
