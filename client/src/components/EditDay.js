import { React, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, TextField } from "@mui/material";
function EditDay({ open, handleClose, checkDay }) {
  const [edycja, setEdycja] = useState(false);

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth="40%"
          style={{ fontSize: "1.2rem", color: "#403c3c" }}
        >
          <DialogTitle
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            Dzień:{checkDay.dzien}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>

            <div style={{ margin: "1rem 0px 1rem 0 " }}>
              <h5>Opis:</h5> {checkDay.opis}
            </div>

            <div style={{ margin: "1rem 0px 1rem 0 " }}>
              <b>Zatwierdzenie </b>

              <h5>Opiekun uczelniany: </h5>
              {checkDay.statusOpiekunaU}

              <h5>Opiekun zakładowy: </h5>
              {checkDay.statusOpiekunaZ}

            </div>

            <h5>Efekty uczenia:</h5>

          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default EditDay;
