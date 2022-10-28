import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { TextField } from "@material-ui/core";

function SearchBar(props) {
  return (
    <TextField
      style={{ width: "70%" }}
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
      }}
    />
  );
}

export default SearchBar;
