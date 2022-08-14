import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState } from "react";
import DialogOpiekunZ from "./DialogOpiekunZ";
import * as axios from "axios";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

function OpiekunZ() {
  const [dzienniczek, setDzienniczek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [komentarz, setKomentarz] = useState("");
  const [opis, setOpis] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (val) => {
    setCheckDay(val);
    setOpen(true);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/getDaysOpiekunZ").then((res) => {
      setDzienniczek(res.data);
      setLoading(false);
    });
  }, []);

  const acceptStatus = (id) => {
    axios
      .post("http://localhost:5000/api/acceptStatus", {
        id: id,
      })
      .then((res) => {
        setDzienniczek(
          dzienniczek.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const declineStatus = (id) => {
    axios
      .post("http://localhost:5000/api/declineStatus", {
        id: id,
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
        {loading && <h5>Ładowanie...</h5>}
        {!loading && (
          <SearchBar
            setSearchLogin={setSearchLogin}
            setItemOffset={setItemOffset}
          />
        )}
        {recordsAfterFiltering.length === 0 && !loading && (
          <h6>Nie znaleziono wyniku</h6>
        )}
        <Pagination
          data={recordsAfterFiltering}
          acceptStatus={acceptStatus}
          declineStatus={declineStatus}
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

export default OpiekunZ;
