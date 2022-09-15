import { React, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Icon, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function DialogOpiekunZ(props) {
  const [comments, setComments] = useState(props?.checkDay?.komentarzes);
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
                  rows={10}
                  margin="normal"
                  label="Opis"
                  style={{ width: "100%" }}
                  defaultValue={props.checkDay.opis}
                  onChange={(e) => props.setOpis(e.target.value)}
                />
              </div>

              <div style={{ margin: "1rem 0px 1rem 0 " }}>
                <h5>E-mail:</h5>
                {props.checkDay.user.login}
              </div>
              <div>
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
                    <div
                      style={{
                        wordWrap: "break-word",
                        fontSize: "1rem",
                        borderRadius: "25px",
                        boxShadow: " 0 0 5px black",
                        padding: "1rem",
                        width: "100%",
                        marginBottom: "1rem",
                        color: "white",
                        backgroundImage: "linear-gradient(#073874, #042144)",
                      }}
                    >
                      {val.komentarz}
                    </div>
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
                  multiline
                  rows={2}
                  margin="normal"
                  label="Dodaj komentarz"
                  style={{ width: "100%" }}
                  onChange={(e) => props.setKomentarz(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    props.changeStatusEdit(props.checkDay.id, "Zaakceptowano");

                    props.handleClose();
                  }}
                >
                  Akceptuj
                </Button>
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
