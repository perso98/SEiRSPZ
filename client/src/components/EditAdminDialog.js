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
  DialogTitleClass: {
    display: "flex",
    justifyContent: "space-between",
  },
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
}) {
  const classes = useStyles();
  const [confirm, setConfirm] = useState(editStudent?.confirmation);

  useEffect(() => {
    setConfirm(editStudent?.confirmation);
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
          <DialogTitle className={classes.DialogTitleClass}>
            Edycja użytkownika : {editStudent.login}
            <IconButton aria-label="close" onClick={handleEditClose}>
              <CloseIcon
                style={{ color: darkMode == "white" ? "black" : "white" }}
              />
            </IconButton>
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
                    Imię: {editStudent.dane.imie}
                  </span>
                  <span style={{ marginBottom: "1rem" }}>
                    {" "}
                    Nazwisko: {editStudent.dane.nazwisko}
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

            <TextField
              label="Zmiana loginu"
              defaultValue={editStudent.login}
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
              }}
            />
            <Button
              variant="contained"
              style={{ marginTop: "1rem" }}
              onClick={() => {
                changeUserInfo(editStudent.id);
              }}
            >
              Zmień
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default EditAdminDialog;
