import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogOpiekunZ from "./DialogOpiekunZ";
import { useState } from "react";
import "../App.css";

function DzienniczekDni(props) {
  const OpiekunUcount = (userId) => {
    let za = 0;
    let Od = 0;
    let Oc = 0;
    props.dzienniczek.map((val) => {
      if (val.userId === userId) {
        if (val.statusOpiekunaU === "Zaakceptowano") {
          za++;
        }
        if (val.statusOpiekunaU === "Odrzucono") {
          Od++;
        }
        if (val.statusOpiekunaU === "Oczekiwanie") {
          Oc++;
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            color: "green",
            marginRight: "0.5rem",
          }}
        >
          {" "}
          <div>
            Zatwierdzone<div style={{ textAlign: "center" }}> {za}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: "0.5rem",
          }}
        >
          {" "}
          <div>
            Oczekiwane<div style={{ textAlign: "center" }}> {Oc}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <div style={{ color: "#A52A2A" }}>
            Odrzucone<div style={{ textAlign: "center" }}> {Od}</div>
          </div>
        </div>
      </div>
    );
  };

  const OpiekunZcount = (userId) => {
    let za = 0;
    let Od = 0;
    let Oc = 0;
    props.dzienniczek.map((val) => {
      if (val.userId === userId) {
        if (val.statusOpiekunaZ === "Zaakceptowano") {
          za++;
        }
        if (val.statusOpiekunaZ === "Odrzucono") {
          Od++;
        }
        if (val.statusOpiekunaZ === "Oczekiwanie") {
          Oc++;
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            color: "green",
            marginRight: "0.5rem",
          }}
        >
          {" "}
          <div>
            Zatwierdzone<div style={{ textAlign: "center" }}> {za}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: "0.5rem",
          }}
        >
          {" "}
          <div>
            Oczekiwane<div style={{ textAlign: "center" }}> {Oc}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <div style={{ color: "#A52A2A" }}>
            Odrzucone<div style={{ textAlign: "center" }}> {Od}</div>
          </div>
        </div>
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
                  <h6 style={{ textAlign: "center" }}>Dzień: {val.dzien}</h6>{" "}
                  <h6 style={{ textAlign: "center" }}>Data: {val.data}</h6>
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
                <div style={{ margin: "0 0 1rem 0" }}>
                  Student: {val.user.login}{" "}
                  {props.statusOpiekuna === "statusOpiekunaU"
                    ? OpiekunUcount(val.user.id)
                    : OpiekunZcount(val.user.id)}
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
