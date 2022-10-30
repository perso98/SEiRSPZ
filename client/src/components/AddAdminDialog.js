import React from "react";
import {
  // InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Paper, TextField } from "@material-ui/core";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function AddAdminDialog({
  addOpen,
  handleAddClose,
  createAcc,
  onChange,
  userObject,
  onClick,
  darkMode,
}) {
  const {
    login,
    password,
    admin,
    opiekunU,
    opiekunZ,
    student,
    dziekanat,
    dyrektor,
  } = userObject;
  return (
    <Dialog
      open={addOpen}
      onClose={handleAddClose}
      fullWidth="60%"
      PaperProps={{
        style: {
          backgroundColor: darkMode == "white" ? "white" : "#242424",
          color: darkMode == "white" ? "black" : "white",
        },
      }}
    >
      <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
        Dodawanie nowego użytkownika
        <IconButton aria-label="close" onClick={handleAddClose}>
          <CloseIcon
            style={{ color: darkMode == "white" ? "black" : "white" }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            marginTop: "2%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              id="login"
              value={login}
              label="Login:"
              onChange={(e) => onChange(e)}
              style={{ marginBottom: "5%" }}
            />

            <TextField
              id="password"
              value={password}
              label="Hasło:"
              onChange={(e) => onChange(e)}
            />
            <div
              style={{
                color: darkMode == "white" ? "black" : "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
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
                <div>Opiekun Z.</div>
                <div>
                  {opiekunZ === 1 ? (
                    <IconButton
                      id="opiekunZ"
                      style={{ color: "green" }}
                      onClick={(e) => onClick(e, 0)}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      id="opiekunZ"
                      style={{ color: "red" }}
                      onClick={(e) => onClick(e, 1)}
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
                <div>Student</div>
                <div>
                  {student === 1 ? (
                    <IconButton
                      id="student"
                      style={{ color: "green" }}
                      onClick={(e) => {
                        onClick(e, 0);
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      id="student"
                      style={{ color: "red" }}
                      onClick={(e) => {
                        onClick(e, 1);
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
                <div>!!Admin!!!</div>
                <div>
                  {admin === 1 ? (
                    <IconButton
                      id="admin"
                      style={{ color: "green" }}
                      onClick={(e) => {
                        onClick(e, 0);
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      id="admin"
                      style={{ color: "red" }}
                      onClick={(e) => {
                        onClick(e, 1);
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
                justifyContent: "space-around",
                color: darkMode == "white" ? "black" : "white",
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
                <div>Opiekun U.</div>
                <div>
                  {opiekunU === 1 ? (
                    <IconButton
                      id="opiekunU"
                      style={{ color: "green" }}
                      onClick={(e) => {
                        onClick(e, 0);
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      id="opiekunU"
                      style={{ color: "red" }}
                      onClick={(e) => {
                        onClick(e, 1);
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
                <div>Dyrektor</div>
                <div>
                  {dyrektor === 1 ? (
                    <IconButton
                      id="dyrektor"
                      style={{ color: "green" }}
                      onClick={(e) => {
                        onClick(e, 0);
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      id="dyrektor"
                      style={{ color: "red" }}
                      onClick={(e) => {
                        onClick(e, 1);
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
                <div>Dziekanat</div>
                <div>
                  {dziekanat === 1 ? (
                    <IconButton
                      id="dziekanat"
                      style={{ color: "green" }}
                      onClick={(e) => onClick(e, 0)}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      id="dziekanat"
                      style={{ color: "red" }}
                      onClick={(e) => onClick(e, 1)}
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
  );
}

export default AddAdminDialog;
