import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogOpiekunZ from "./DialogOpiekunZ";
import { useState } from "react";
import "../App.css";

function DzienniczekDni(props) {
  const OpiekunUcount = (userId) => {
    let Za = 0;
    let Od = 0;
    props.dzienniczek.map((val) => {
      if (val.userId === userId) {
        if (val.statusOpiekunaU === "Zaakceptowano") {
          Za++;
        } else {
          Od++;
        }
      }
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        {" "}
        <div style={{ color: "green" }}>Zaakceptowane: {Za}</div>
        <div style={{ color: "#A52A2A" }}>Odrzucone: {Od}</div>
      </div>
    );
  };

  const OpiekunZcount = (userId) => {
    let Za = 0;
    let Od = 0;
    props.dzienniczek.map((val) => {
      if (val.userId === userId) {
        if (val.statusOpiekunaZ === "Zaakceptowano") {
          Za++;
        } else {
          Od++;
        }
      }
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        {" "}
        <div style={{ color: "green" }}>Zaakceptowane: {Za}</div>
        <div style={{ color: "#A52A2A" }}>Odrzucone: {Od}</div>
      </div>
    );
  };
  return (
    <div>
      <Grid container spacing={3}>
        {props.currentItems.map((val) => {
          return (
            <Grid item xs={12} md={12} lg={6}>
              <div
                key={val}
                style={{
                  backgroundImage: "linear-gradient(#073874, #042144)",
                  color: "white",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "25px",
                  boxShadow: " 0 0 5px black",
                  marginTop: "2rem",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ textAlign: "center" }}>
                    Dzień: {val.dzien}
                  </span>{" "}
                  <Button
                    onClick={() => {
                      props.handleOpen(val);
                    }}
                    variant="contained"
                    color="warning"
                  >
                    Edycja
                  </Button>
                </div>{" "}
                <span>Data: {val.data}</span>
                {props.status ? (
                  <div
                    style={{
                      color: "green",
                      display: "flex",

                      marginTop: "1rem",
                    }}
                  >
                    {props.statusOpiekuna == "statusOpiekunaU" ? (
                      <h6 style={{ color: "white", marginRight: "1rem" }}>
                        Status opiekuna uczelnianego:
                      </h6>
                    ) : (
                      <h6 style={{ color: "white", marginRight: "1rem" }}>
                        Status opiekuna zakładowego:
                      </h6>
                    )}{" "}
                    {val?.[props?.statusOpiekuna] === "Zaakceptowano" ? (
                      <h6> Zaakceptowano</h6>
                    ) : (
                      <h6 style={{ color: "#A52A2A" }}> Odrzucono</h6>
                    )}
                  </div>
                ) : null}
                <div
                  style={{ margin: "1rem 0 1rem 0", wordWrap: "break-word" }}
                >
                  Opis:{" "}
                  {val.opis?.length > 60
                    ? val.opis.substring(0, 60) + "..."
                    : val.opis}
                </div>{" "}
                <div style={{ marginBottom: "1rem" }}>
                  <span>Student: {val.user.login}</span>
                  {val.user.dane ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "1rem",
                      }}
                    >
                      <span style={{ marginBottom: "1rem" }}>
                        {" "}
                        Imię: {val.user.dane.imie}
                      </span>
                      <span> Nazwisko: {val.user.dane.nazwisko}</span>
                    </div>
                  ) : null}
                  {props.status
                    ? props.statusOpiekuna === "statusOpiekunaU"
                      ? OpiekunUcount(val.user.id)
                      : OpiekunZcount(val.user.id)
                    : null}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {val?.[props?.statusOpiekuna] === "Odrzucono" ||
                  val?.[props?.statusOpiekuna] === "Oczekiwanie" ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        props.changeStatus(val.id, "Zaakceptowano");
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

                  {val?.[props?.statusOpiekuna] === "Zaakceptowano" ||
                  val?.[props?.statusOpiekuna] === "Oczekiwanie" ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        props.changeStatus(val.id, "Odrzucono");
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
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default DzienniczekDni;
