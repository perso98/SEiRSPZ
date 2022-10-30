import React from "react";
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
  editOpen,
  handleEditClose,
  editStudent,
  changeUserInfo,
  setChangeLogin,
  darkMode,
}) {
  const classes = useStyles();

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
            <TextField
              label="Zmiana loginu"
              defaultValue={editStudent.login}
              variant="outlined"
              style={{ marginTop: "1rem" }}
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
