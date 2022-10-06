import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState } from "react";
import DialogOpiekunZ from "../components/DialogOpiekunZ";
import * as axios from "axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ButtonLink from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import FileDownload from "js-file-download";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../services/Url";
function OpiekunU() {
  const [dzienniczek, setDzienniczek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [komentarz, setKomentarz] = useState("");
  const [opis, setOpis] = useState();
  const statusOpiekuna = "statusOpiekunaU";

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
    axios.get(`${url}getDaysOpiekunU`).then((res) => {
      setDzienniczek(res.data);
      setLoading(false);
    });
  }, []);
  const downloadFile = (name) => {
    axios({
      url: `${url}downloadFile/${name}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, name);
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
          dzienniczek.filter((val) => {
            return val.id != id;
          })
        );
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
        setDzienniczek(
          dzienniczek.filter((val) => {
            return val.id != id;
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
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          {loading && <h5>Ładowanie...</h5>}
          {!loading && (
            <SearchBar
              setSearchLogin={setSearchLogin}
              setItemOffset={setItemOffset}
            />
          )}
          <ButtonLink linkTo="/opiekunu/historia" text="Historia" />
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
        />
      </Container>
      <DialogOpiekunZ
        downloadFile={downloadFile}
        open={open}
        handleClose={handleClose}
        checkDay={checkDay}
        changeStatusEdit={changeStatusEdit}
        setOpis={setOpis}
        setKomentarz={setKomentarz}
      />
      <ToastContainer />
    </>
  );
}

export default OpiekunU;
