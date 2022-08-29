import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { TextField } from "@material-ui/core";

function SearchBar(props) {
  return (
    <TextField
      style={{ width: "70%", marginBottom: "3rem" }}
      label="Szukaj"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(e) => {
        props.setSearchLogin(e.target.value);
        props.setItemOffset(0);
      }}
    />
  );
}

export default SearchBar;
