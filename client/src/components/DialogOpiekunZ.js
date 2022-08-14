import { React, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, TextField } from "@mui/material";
function DialogOpiekunZ(props) {
  return (
    <>
      {props.open && (
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          fullWidth="40%"
          style={{ fontSize: "1.2rem", color: "#403c3c" }}
        >
          <DialogTitle
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <h6 style={{ textAlign: "center" }}>
              Dzień: {props.checkDay.dzien}
            </h6>{" "}
            <h6 style={{ textAlign: "center" }}>Data: {props.checkDay.data}</h6>
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <>
              <div>
                <TextField
                  multiline
                  rows={3}
                  margin="normal"
                  label="Opis"
                  style={{ width: "100%" }}
                  value={props.checkDay.opis}
                />
              </div>

              <div style={{ margin: "1rem 0px 1rem 0 " }}>
                <h5>E-mail:</h5>
                {props.checkDay.user.login}
              </div>
              <div>
                <TextField
                  multiline
                  rows={2}
                  margin="normal"
                  label="Dodaj komentarz"
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    props.acceptStatus(props.checkDay.id);
                    props.handleClose();
                  }}
                >
                  Akceptuj
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    props.declineStatus(props.checkDay.id);
                    props.handleClose();
                  }}
                >
                  Odrzuć
                </Button>
              </div>
            </>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default DialogOpiekunZ;
