import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));
function SearchBar(props) {
  const classes = useStyles();
  return (
    <>
      {!props.toggleSearch ? (
        <TextField
          style={{ width: "70%" }}
          label="Szukaj po e-mailu"
          variant="outlined"
          inputProps={{
            style: {
              color: props.darkMode == "white" ? "black" : "white",
              classes: {
                notchedOutline:
                  props.darkMode == "white" ? null : classes.notchedOutline,
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
                props.darkMode == "white" ? null : classes.notchedOutline,
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  style={{
                    color: props.darkMode == "white" ? "black" : "white",
                  }}
                />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            props.setSearchLogin(e.target.value);
            props.setRemountComponent(Math.random());
          }}
        />
      ) : (
        <TextField
          style={{ width: "70%" }}
          label="Szukaj po nazwisku"
          variant="outlined"
          inputProps={{
            style: {
              color: props.darkMode == "white" ? "black" : "white",
              classes: {
                notchedOutline:
                  props.darkMode == "white" ? null : classes.notchedOutline,
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
                props.darkMode == "white" ? null : classes.notchedOutline,
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  style={{
                    color: props.darkMode == "white" ? "black" : "white",
                  }}
                />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            props.setSearchSurname(e.target.value);
            props.setRemountComponent(Math.random());
          }}
        />
      )}
    </>
  );
}

export default SearchBar;
