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
  const [edycja, setEdycja] = useState(false);

  const editClickTrue = () => {
    setEdycja(true);
  };
  const editClickFalse = () => {
    setEdycja(false);
  };

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
            Dzień:{props.checkDay.id}
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {edycja ? (
              <>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={editClickFalse}
                >
                  Tryb Zwykły
                </Button>
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
                  {props.checkDay.opis}
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {" "}
                  <Button variant="contained" color="success">
                    Akceptuj
                  </Button>
                  <Button variant="contained" color="error">
                    Odrzuć
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={editClickTrue}
                >
                  Tryb Edycji
                </Button>
                <div style={{ margin: "1rem 0px 1rem 0 " }}>
                  <h5>Opis:</h5> Wczoraj dasdkasdkasmd asdkmsak daksm dkas
                  dkmsakm dksamk dskamd kasd ds dsad{" "}
                </div>

                <div style={{ margin: "1rem 0px 1rem 0 " }}>
                  <h5>E-mail:</h5>
                  {props.checkDay.opis}
                </div>

                <h5>Efekty uczenia:</h5>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {" "}
                  <Button variant="contained" color="success">
                    Akceptuj
                  </Button>
                  <Button variant="contained" color="error">
                    Odrzuć
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default DialogOpiekunZ;
