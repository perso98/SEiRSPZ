import React from "react";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
function NoPage() {
  const [darkMode] = useContext(ThemeContext);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <h1
          style={{
            color: darkMode == "white" ? "black" : "white",
            fontSize: "2rem",
          }}
        >
          Nic tu nie ma...{" "}
        </h1>
      </Grid>
    </Grid>
  );
}

export default NoPage;
