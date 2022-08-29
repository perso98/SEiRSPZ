import { React, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function EfektyDialog(props) {
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    props.setEfekt(event.target.value);
    props.setOpis(
      props.checkStudent.efektyStudents[event.target.value].komentarz
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
            Efekty studenta {props.checkStudent.login}
            <IconButton onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <>
              <FormControl style={{ marginTop: "1rem" }} sx={{ width: 550 }}>
                <InputLabel>Efekty</InputLabel>
                <Select
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={props.efekt}
                  label="Efekty"
                  onChange={handleChange}
                >
                  {props.checkStudent.efektyStudents.map((efekty, index) =>
                    efekty.status === "Zatwierdzone" ? (
                      <MenuItem value={index}>
                        {efekty.efektyListum.nazwa}
                        <div style={{ color: "green" }}> (Zatwierdzone)</div>
                      </MenuItem>
                    ) : (
                      <MenuItem value={index}>
                        {efekty.efektyListum.nazwa}{" "}
                        <div style={{ color: "red" }}> (Niezatwierdzone)</div>
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <div>
                <div>
                  {" "}
                  {
                    props.checkStudent.efektyStudents[props.efekt].efektyListum
                      .opis
                  }
                </div>
                <TextField
                  multiline
                  rows={10}
                  margin="normal"
                  label="Opis"
                  value={props.opis}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    props.setOpis(e.target.value);
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    props.handleClose();
                  }}
                >
                  Akceptuj
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
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

export default EfektyDialog;
