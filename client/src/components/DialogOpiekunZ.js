import { React, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, makeStyles } from "@material-ui/core";
import ClearIcon from "@mui/icons-material/Clear";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "../App.css";
const useStyles = makeStyles((theme) => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));
function DialogOpiekunZ(props) {
  const [comments, setComments] = useState(props?.checkDay?.komentarzes);
  const classes = useStyles();
  useEffect(() => {
    setComments(props?.checkDay?.komentarzes);
  }, [props?.checkDay?.komentarzes]);

  const deleteCom = (id) => {
    setComments(
      comments.filter((val) => {
        return val.id != id;
      })
    );
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
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <h6 style={{ textAlign: "center" }}>
              Dzień: {props.checkDay.dzien}
            </h6>{" "}
            <h6 style={{ textAlign: "center" }}>Data: {props.checkDay.data}</h6>
            <IconButton onClick={props.handleClose}>
              <CloseIcon
                style={{ color: props.darkMode == "white" ? "black" : "white" }}
              />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <>
              <div>
                <TextField
                  variant="outlined"
                  multiline
                  rows={10}
                  margin="normal"
                  label="Opis"
                  style={{ width: "100%" }}
                  defaultValue={props.checkDay.opis}
                  onChange={(e) => props.setOpis(e.target.value)}
                  inputProps={{
                    style: {
                      color: props.darkMode == "white" ? "black" : "white",
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
                />
              </div>

              <div style={{ margin: "1rem 0px 1rem 0 " }}>
                <h5>E-mail:</h5>
                {props.checkDay.user.login}
              </div>
              <div>
                {props.checkDay?.dzienZalacznikis?.length > 0 && (
                  <div style={{ marginBottom: "1rem" }}>Załączniki:</div>
                )}
                {props.checkDay?.dzienZalacznikis?.map((val) => (
                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <div className="blueCard">
                      {val.zalacznik.substring(val.zalacznik.indexOf("-") + 1)}
                    </div>
                    <div style={{ marginLeft: "1rem" }}>
                      <IconButton
                        onClick={() => {
                          props.downloadFile(val.zalacznik);
                        }}
                      >
                        <CloudDownloadIcon style={{ color: "green" }} />
                      </IconButton>
                    </div>
                  </div>
                ))}
                {comments?.length > 0 && (
                  <div style={{ marginBottom: "1rem" }}>Twoje komentarze:</div>
                )}
                {comments?.map((val) => (
                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <div className="blueCard">{val.komentarz}</div>
                    <div style={{ marginLeft: "1rem" }}>
                      <IconButton
                        onClick={() => {
                          props.deleteComment(val.id, props.checkDay);
                          deleteCom(val.id);
                        }}
                      >
                        <ClearIcon style={{ color: "red" }} />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <TextField
                  variant="outlined"
                  multiline
                  rows={2}
                  margin="normal"
                  label="Dodaj komentarz"
                  style={{ width: "100%" }}
                  onChange={(e) => props.setKomentarz(e.target.value)}
                  inputProps={{
                    style: {
                      color: props.darkMode == "white" ? "black" : "white",
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
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                {props?.checkDay?.[props.statusOpiekuna] === "Odrzucono" ||
                props?.checkDay?.[props.statusOpiekuna] === "Oczekiwanie" ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      props.changeStatusEdit(
                        props.checkDay.id,
                        "Zaakceptowano"
                      );

                      props.handleClose();
                    }}
                  >
                    Akceptuj
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ color: "gray" }}
                    disabled="true"
                  >
                    Akceptuj{" "}
                  </Button>
                )}
                {props?.checkDay?.[props.statusOpiekuna] === "Zaakceptowano" ||
                props?.checkDay?.[props.statusOpiekuna] === "Oczekiwanie" ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      props.changeStatusEdit(props.checkDay.id, "Odrzucono");
                      props.handleClose();
                    }}
                  >
                    Odrzuć
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ color: "gray" }}
                    disabled="true"
                  >
                    Odrzuć{" "}
                  </Button>
                )}
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
