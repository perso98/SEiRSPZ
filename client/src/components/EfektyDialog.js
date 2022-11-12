import { React, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { TextField, makeStyles } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const useStyles = makeStyles((theme) => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));
function EfektyDialog(props) {
  const [open, setOpen] = useState(false);
  const [updateEffect, setUpdateEffect] = useState(
    props?.checkStudent?.efektyStudents
  );
  const classes = useStyles();
  useEffect(() => {
    setUpdateEffect(props?.checkStudent?.efektyStudents);
  }, [props?.checkStudent?.efektyStudents]);

  const updatedEffect = (id, opis, status) => {
    setUpdateEffect(
      updateEffect.map((val) => {
        return val.id == id ? { ...val, komentarz: opis, status: status } : val;
      })
    );
  };

  const handleChange = (event) => {
    props.setEfekt(event.target.value);
    props.setOpis(
      props.checkStudent.efektyStudents[event.target.value].komentarz
    );
    props.setEfektId(props.checkStudent.efektyStudents[event.target.value].id);
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
          PaperProps={{
            style: {
              backgroundColor: props.darkMode == "white" ? "white" : "#242424",
              color: props.darkMode == "white" ? "black" : "white",
            },
          }}
        >
          <DialogTitle
            style={{
              justifyContent: "space-between",
              display: "flex",
            }}
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
                  {updateEffect?.map((efekty, index) =>
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
                    props?.checkStudent.efektyStudents[props.efekt].efektyListum
                      .opis
                  }
                </div>
                <TextField
                  multiline
                  rows={10}
                  margin="normal"
                  label="Opis"
                  variant="outlined"
                  value={props?.opis?.length > 0 ? props.opis : ""}
                  style={{ width: "100%" }}
                  inputProps={{
                    style: {
                      color: props.darkMode == "white" ? "black" : "white",
                      classes: {
                        notchedOutline:
                          props.darkMode == "white"
                            ? null
                            : classes.notchedOutline,
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: props.darkMode == "white" ? "black" : "white",
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline:
                        props.darkMode == "white"
                          ? null
                          : classes.notchedOutline,
                    },
                  }}
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
                    props.updateDzienniczek(
                      props.efektId == 0
                        ? props.checkStudent.efektyStudents[0].id
                        : props.efektId,
                      props.opis,
                      props.checkStudent.id,
                      "Zatwierdzone"
                    );
                    updatedEffect(
                      props.efektId == 0
                        ? props.checkStudent.efektyStudents[0].id
                        : props.efektId,
                      props.opis,
                      "Zatwierdzone"
                    );
                  }}
                >
                  Akceptuj
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    props.updateDzienniczek(
                      props.efektId == 0
                        ? props.checkStudent.efektyStudents[0].id
                        : props.efektId,
                      props.opis,
                      props.checkStudent.id,
                      "Niezatwierdzone"
                    );
                    updatedEffect(
                      props.efektId == 0
                        ? props.checkStudent.efektyStudents[0].id
                        : props.efektId,
                      props.opis,
                      props.checkStudent.id,
                      "Niezatwierdzone"
                    );
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
