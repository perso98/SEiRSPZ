import React from 'react'
import {
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  TextField,
} from "@material-ui/core";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


function AddAdminDialog({addOpen,handleAddClose,setLogin,setPassword,createAcc,setAdmin,setOpiekunU,setOpiekunZ,setStudent,
  setDyrektor,setDziekanat,opiekunZ,student2,admin,opiekunU,dyrektor,dziekanat}) {
  return (
    <Dialog open={addOpen} onClose={handleAddClose} fullWidth="60%">
    <DialogTitle
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      Dodawanie nowego użytkownika
      <IconButton aria-label="close" onClick={handleAddClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <DialogContentText style={{ marginTop: "2%" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="login"
            label="Login:"
            onChange={(e) => {
              setLogin(e.target.value);
            }}
            style={{ marginBottom: "5%" }}
          />

          <TextField
            id="haslo"
            label="Hasło:"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
            <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Opiekun Z.</div>
                    <div>
                      {opiekunZ == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setOpiekunZ(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setOpiekunZ(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Student</div>
                    <div>
                      {student2 == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setStudent(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setStudent(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "red" }}>!!Admin!!</div>
                    <div>
                      {admin == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setAdmin(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setAdmin(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Opiekun U.</div>
                    <div>
                      {opiekunU == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setOpiekunU(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setOpiekunU(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Dyrektor</div>
                    <div>
                      {dyrektor == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setDyrektor(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setDyrektor(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "5%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ color: "black" }}>Dziekanat</div>
                    <div>
                      {dziekanat == 1 ? (
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => {
                            setDziekanat(0);
                          }}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => {
                            setDziekanat(1);
                          }}
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>
          <Button
            variant="contained"
            style={{ marginTop: "4%" }}
            onClick={createAcc}
          >
            Dodaj
          </Button>
        </div>
      </DialogContentText>
    </DialogContent>
    <DialogActions></DialogActions>
  </Dialog>
  )
}

export default AddAdminDialog