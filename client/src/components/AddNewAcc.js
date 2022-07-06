import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from "@mui/icons-material/Close";
import Axios from "axios";
import Uprawnienia from "./Uprawnienia";



function AddNewAcc() {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(0);
  const [opiekunZ, setOpiekunZ] = useState(0);
  const [opiekunU, setOpiekunU] = useState(0);
  const [dyrektor, setDyrektor] = useState(0);
  const [dziekanat, setDziekanat] = useState(0);
  const [student2, setStudent] = useState(0);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const createAcc = () => {
    Axios.post("http://localhost:5000/api/createAccount2", {
      login: login,
      password: password,
      student2: student2,
      dyrektor: dyrektor,
      dziekanat: dziekanat,
      admin: admin,
      opiekunZ: opiekunZ,
      opiekunU: opiekunU,
    }).then((res) => {
        window.location.reload(false)
      setOpen(false);
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Dodaj użytkownika
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth="60%">
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Dodawanie nowego użytkownika
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{marginTop:'2%'}}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="login"
                label="Login:"
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
                style={{ marginBottom: "5%" }}
              />

              <TextField
                id="haslo"
                label="Hasło:"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    marginTop: "5%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "black" }}>Opiekun Z.</div>
                  <div>
                    {opiekunZ == 1 ? (
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => {
                          setOpiekunZ(0);
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => {
                          setOpiekunZ(1);
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "5%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "black" }}>Student</div>
                  <div>
                    {student2 == 1 ? (
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => {
                          setStudent(0);
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => {
                          setStudent(1);
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "5%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "red" }}>!!Admin!!</div>
                  <div>
                    {admin == 1 ? (
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => {
                          setAdmin(0);
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => {
                          setAdmin(1);
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    marginTop: "5%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "black" }}>Opiekun U.</div>
                  <div>
                    {opiekunU == 1 ? (
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => {
                          setOpiekunU(0);
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => {
                          setOpiekunU(1);
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "5%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "black" }}>Dyrektor</div>
                  <div>
                    {dyrektor == 1 ? (
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => {
                          setDyrektor(0);
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => {
                          setDyrektor(1);
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "5%",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "black" }}>Dziekanat</div>
                  <div>
                    {dziekanat == 1 ? (
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => {
                          setDziekanat(0);
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => {
                          setDziekanat(1);
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>

              <Button
                variant="contained"
                style={{ marginTop: "4%" }}
                onClick={createAcc}
              >
                Dodaj
              </Button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default AddNewAcc;
