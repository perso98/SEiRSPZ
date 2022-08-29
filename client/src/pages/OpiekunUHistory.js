import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { useState } from "react";
import DialogOpiekunZ from "../components/DialogOpiekunZ";
import * as axios from "axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ButtonLink from "../components/Button";

function OpiekunUHistory() {
  const [dzienniczek, setDzienniczek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [komentarz, setKomentarz] = useState("");
  const [opis, setOpis] = useState();
  const statusOpiekuna = "statusOpiekunaU";
  const status = true;
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (val) => {
    setCheckDay(val);
    setOpen(true);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/getDaysOpiekunUStatus").then((res) => {
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
          dzienniczek.map((val) => {
            return val.id == id ? { ...val, [res.data.status]: status } : val;
          })
        );
      });
  };

  const changeStatusEdit = (id, status) => {
    axios
      .post("http://localhost:5000/api/changeStatusEdit", {
        id: id,
        status: status,
        opis: opis,
        komentarz: komentarz,
        statusOpiekuna: statusOpiekuna,
      })
      .then((res) => {
        if (!opis)
          setDzienniczek(
            dzienniczek.map((val) => {
              return val.id == id ? { ...val, [res.data.status]: status } : val;
            })
          );
        else
          setDzienniczek(
            dzienniczek.map((val) => {
              return val.id == id
                ? { ...val, [res.data.status]: status, opis: opis }
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
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          {!loading && (
            <SearchBar
              setSearchLogin={setSearchLogin}
              setItemOffset={setItemOffset}
            />
          )}
          <ButtonLink linkTo="/profil/opiekunU" text="Nowe" />
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
        open={open}
        handleClose={handleClose}
        checkDay={checkDay}
        changeStatusEdit={changeStatusEdit}
        setOpis={setOpis}
        setKomentarz={setKomentarz}
      />
    </>
  );
}

export default OpiekunUHistory;
