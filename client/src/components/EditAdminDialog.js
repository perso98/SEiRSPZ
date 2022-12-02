import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { TextField, makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const useStyles = makeStyles((theme) => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));

function EditAdminDialog({
  changeConfirmation,
  editOpen,
  handleEditClose,
  editStudent,
  changeUserInfo,
  setChangeLogin,
  darkMode,
  changePassword,
  setChangePassword,
  changePassword2,
  setChangePassword2,
  changePasswordAdmin,
}) {
  const classes = useStyles();
  const [confirm, setConfirm] = useState();
  const [currentLogin, setCurrentLogin] = useState();
  const [loginChange, setLoginChange] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [passwordChange, setPasswordChange] = useState();
  useEffect(() => {
    setConfirm(editStudent?.confirmation);
    setCurrentLogin(editStudent?.login);
    setLoginChange(editStudent?.login);
    setCurrentPassword(editStudent?.haslo);
    setPasswordChange(editStudent?.haslo);
  }, [editStudent]);
  return (
    <>
      {editStudent && (
        <Dialog
          open={editOpen}
          onClose={handleEditClose}
          fullWidth="40%"
          PaperProps={{
            style: {
              backgroundColor: darkMode == "white" ? "white" : "#242424",
              color: darkMode == "white" ? "black" : "white",
            },
          }}
        >
          <DialogTitle>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Edycja użytkownika </div>
                <IconButton aria-label="close" onClick={handleEditClose}>
                  <CloseIcon
                    style={{ color: darkMode == "white" ? "black" : "white" }}
                  />
                </IconButton>
              </div>
              <div>{editStudent.login}</div>
            </div>
          </DialogTitle>
          <DialogContent
            style={{ display: "flex", flexDirection: "column", margin: "5%" }}
          >
            <div
              style={{
                margin: "1rem",
                textAlign: "center",
                color: darkMode == "white" ? "black" : "white",
              }}
            >
              {editStudent.firma ? (
                <div style={{ marginBottom: "1rem" }}>
                  Nazwa firmy: {editStudent.firma.nazwa}
                </div>
              ) : null}
              {editStudent.dane ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ marginBottom: "1rem" }}>
                    {" "}
                    {editStudent.dane.imie === null ||
                    editStudent.dane.imie == "" ? (
                      <div>Imie: Brak</div>
                    ) : (
                      <div> Imię: {editStudent.dane.imie} </div>
                    )}
                  </span>
                  <span style={{ marginBottom: "1rem" }}>
                    {" "}
                    {editStudent.dane.nazwisko === null ||
                    editStudent.dane.nazwisko == "" ? (
                      <div>Nazwisko: Brak</div>
                    ) : (
                      <div>Nazwisko: {editStudent.dane.nazwisko}</div>
                    )}
                  </span>
                </div>
              ) : null}
              <div style={{ marginBottom: "1rem" }}>
                Data utworzenia konta:{" "}
                {editStudent.createdAt.match(/.{1,10}/g)[0]}
              </div>
              Weryfikacja konta:
              {confirm ? (
                <IconButton
                  onClick={() => {
                    changeConfirmation(editStudent.id, 0);
                    setConfirm(0);
                  }}
                >
                  <CheckCircleOutlineIcon style={{ color: "green" }} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    changeConfirmation(editStudent.id, 1);
                    setConfirm(1);
                  }}
                >
                  <HighlightOffIcon style={{ color: "#ff4d4d" }} />
                </IconButton>
              )}
              {confirm ? null : (
                <div
                  style={{
                    margin: "1rem",
                    textAlign: "center",
                    color: darkMode == "white" ? "black" : "white",
                  }}
                >
                  Dni bez weryfikacji:{" "}
                  {Math.ceil(
                    (Date.parse(new Date().toJSON().slice(0, 10)) -
                      Date.parse(editStudent.createdAt.match(/.{1,10}/g)[0])) /
                      86400000
                  )}
                </div>
              )}
            </div>
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Zmiana e-maila
            </div>

            <TextField
              label="Zmień e-mail"
              defaultValue={currentLogin}
              variant="outlined"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              inputProps={{
                style: {
                  color: darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
              onChange={(e) => {
                setChangeLogin(e.target.value);
                setCurrentLogin(e.target.value);
              }}
            />
            {loginChange !== currentLogin && currentLogin ? (
              <Button
                variant="contained"
                style={{ marginTop: "1rem" }}
                onClick={() => {
                  changeUserInfo(editStudent.id);
                  setLoginChange(currentLogin);
                }}
              >
                Zmień e-mail
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ marginTop: "1rem" }}
                disabled="true"
              >
                Zmień e-mail
              </Button>
            )}
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Zmiana hasła
            </div>
            {changePassword &&
            changePassword2 &&
            changePassword !== changePassword2 ? (
              <span style={{ textAlign: "center", color: "#ff4d4d" }}>
                Hasła się nie zgadzają{" "}
              </span>
            ) : null}
            <TextField
              type="password"
              label="Podaj hasło"
              variant="outlined"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              inputProps={{
                style: {
                  color: darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
              onChange={(e) => {
                setChangePassword(e.target.value);
                setPasswordChange(e.target.value);
              }}
            />
            <TextField
              type="password"
              label="Potwierdź hasło"
              variant="outlined"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              inputProps={{
                style: {
                  color: darkMode == "white" ? "black" : "white",
                  classes: {
                    notchedOutline:
                      darkMode == "white" ? null : classes.notchedOutline,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: darkMode == "white" ? "black" : "white",
                },
              }}
              InputProps={{
                classes: {
                  notchedOutline:
                    darkMode == "white" ? null : classes.notchedOutline,
                },
              }}
              onChange={(e) => {
                setChangePassword2(e.target.value);
              }}
            />

            {changePassword &&
            changePassword2 &&
            changePassword === changePassword2 &&
            passwordChange !== currentPassword ? (
              <Button
                variant="contained"
                style={{ marginTop: "1rem" }}
                onClick={() => {
                  changePasswordAdmin(editStudent.id, changePassword);
                  setCurrentPassword(changePassword);
                }}
              >
                Zmień hasło
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ marginTop: "1rem" }}
                disabled="true"
              >
                Zmień hasło
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default EditAdminDialog;
