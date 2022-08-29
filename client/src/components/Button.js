import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
function Button(props) {
  const useStyles = makeStyles((theme) => ({
    links: {
      textDecoration: "none",
      color: "white",
      background: "#08448c",
      height: "3.5rem",
      width: "6.5rem",
      textAlign: "center",
      borderRadius: "25px",
      padding: "1rem",
      "&:hover": {
        color: "yellow",
        textDecoration: "none",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Link className={classes.links} to={props.linkTo}>
      {props.text}
    </Link>
  );
}

export default Button;
