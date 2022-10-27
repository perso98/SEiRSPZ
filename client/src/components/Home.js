import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    height: "100vh",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <Container style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      Home
    </Container>
  );
}

export default Home;
