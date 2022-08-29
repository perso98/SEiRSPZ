import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState } from "react";
import DialogOpiekunZ from "../components/DialogOpiekunZ";
import * as axios from "axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ButtonLink from "../components/Button";

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
    setOpen(false);
  };
  const handleOpen = (val) => {
    setCheckDay(val);
    setOpen(true);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/getDaysOpiekunU").then((res) => {
      setDzienniczek(res.data);
      setLoading(false);
    });
  }, []);

  const changeStatus = (id, status) => {
    axios
      .post("http://localhost:5000/api/changeStatus", {
        id: id,
        status: status,
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

  const acceptStatusEdit = (id) => {
    axios
      .post("http://localhost:5000/api/acceptStatusEdit", {
        id: id,
        opis: opis,
        komentarz: komentarz,
      })
      .then((res) => {
        setDzienniczek(
          dzienniczek.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const declineStatusEdit = (id) => {
    axios
      .post("http://localhost:5000/api/declineStatusEdit", {
        id: id,
        opis: opis,
        komentarz: komentarz,
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
          <ButtonLink linkTo="/profil/opiekunUStatus" text="Historia" />
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
        open={open}
        handleClose={handleClose}
        checkDay={checkDay}
        acceptStatusEdit={acceptStatusEdit}
        declineStatusEdit={declineStatusEdit}
        setOpis={setOpis}
        setKomentarz={setKomentarz}
      />
    </>
  );
}

export default OpiekunU;
