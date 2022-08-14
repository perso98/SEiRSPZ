import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState } from "react";
import DialogOpiekunZ from "./DialogOpiekunZ";
import * as axios from "axios";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

function OpiekunStatus() {
  const [dzienniczek, setDzienniczek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  var status = true;
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (val) => {
    setCheckDay(val);
    setOpen(true);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/getDaysOpiekunStatus").then((res) => {
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
          dzienniczek.map((val) => {
            return val.id == id
              ? { ...val, [res.data.status]: "Zaakceptowano" }
              : val;
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
          dzienniczek.map((val) => {
            return val.id == id
              ? { ...val, [res.data.status]: "Odrzucono" }
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
          status={status}
        />
      </Container>
      <DialogOpiekunZ
        open={open}
        handleClose={handleClose}
        checkDay={checkDay}
        acceptStatus={acceptStatus}
        declineStatus={declineStatus}
      />
    </>
  );
}

export default OpiekunStatus;
