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
}));

function EditAdminDialog({
  editOpen,
  handleEditClose,
  editStudent,
  changeUserInfo,
  setChangeLogin,
}) {
  const classes = useStyles();

  return (
    <>
    {editStudent && (
    <Dialog open={editOpen} onClose={handleEditClose} fullWidth="40%">
      <DialogTitle className={classes.DialogTitleClass}>
        Edycja użytkownika : {editStudent.login}
        <IconButton aria-label="close" onClick={handleEditClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        style={{ display: "flex", flexDirection: "column", margin: "5%" }}
      >
        <TextField
          label="Zmiana loginu"
          defaultValue={editStudent.login}
          onChange={(e) => {
            setChangeLogin(e.target.value);
          }}
        />
        <Button
          variant="contained"
          style={{ marginTop: "5vh" }}
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
