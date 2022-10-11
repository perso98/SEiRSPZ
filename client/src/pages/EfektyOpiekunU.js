import React, { useEffect, useState } from "react";
import * as axios from "axios";
import Container from "@material-ui/core/Container";
import SearchBar from "../components/SearchBar";
import PaginationForEffects from "../components/PaginationForEffects";
import EfektyDialog from "../components/EfektyDialog";
import { ToastContainer, toast } from "react-toastify";
import { url } from "../services/Url";
import { useNavigate } from "react-router-dom";
function EfektyOpiekunU(props) {
  const [opis, setOpis] = useState("");
  const [studenci, setStudenci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLogin, setSearchLogin] = useState("");
  const [open, setOpen] = useState(false);
  const [checkStudent, setCheckStudent] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [efekt, setEfekt] = useState(0);
  const [efektId, setEfektId] = useState(0);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpis();
    setOpen(false);
  };
  const handleOpen = (val) => {
    setEfektId(0);
    setCheckStudent(val);
    setOpen(true);
  };
  useEffect(() => {
    axios.get(`${url}getEffectsOpiekunU`).then((res) => {
      if (res.data.message) {
        props.setStatus();
        alert(res.data.message).then(() => {
          navigate("/login");
        });
      } else {
        setStudenci(res.data);
        setLoading(false);
      }
    });
  }, []);

  const updateDzienniczek = (id, opis, student, status) => {
    axios
      .put(`${url}updateEffects`, {
        id: id,
        opis: opis,
        status: status,
      })
      .then((res) => {
        if (res.data.message) {
          props.setStatus();
          alert(res.data.message).then(() => {
            navigate("/login");
          });
        } else {
          toast.success(`Zmiana statusu na ${status}`);
          setStudenci(
            studenci.map((val) => {
              return val.id == student
                ? {
                    ...val,
                    efektyStudents: val.efektyStudents.map((efekty) => {
                      return efekty.id == id
                        ? { ...efekty, komentarz: opis, status: status }
                        : efekty;
                    }),
                  }
                : val;
            })
          );
        }
      });
  };

  const recordsAfterFiltering = studenci.filter((val) => {
    if (searchLogin == "") {
      return val;
    } else if (val.login.toLowerCase().includes(searchLogin.toLowerCase())) {
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
        <PaginationForEffects
          data={recordsAfterFiltering}
          open={open}
          handleOpen={handleOpen}
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
          setEfekt={setEfekt}
          opis={opis}
          efekt={efekt}
          checkStudent={checkStudent}
          setOpis={setOpis}
        />
      </Container>
      <EfektyDialog
        open={open}
        handleClose={handleClose}
        checkStudent={checkStudent}
        efekt={efekt}
        setEfekt={setEfekt}
        opis={opis}
        setOpis={setOpis}
        updateDzienniczek={updateDzienniczek}
        efektId={efektId}
        setEfektId={setEfektId}
      />
      <ToastContainer />
    </>
  );
}

export default EfektyOpiekunU;
