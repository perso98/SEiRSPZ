import { React, useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

function Helper(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <IconButton style={{ color: "#08448c" }} onClick={handleClickOpen}>
          <QuestionMarkIcon style={{ fontSize: "2rem" }} />
        </IconButton>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {props.title}
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.info}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Helper;
