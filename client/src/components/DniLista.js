import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DialogOpiekunZ from "./DialogOpiekunZ";
import { useState } from "react";

function DzienniczekDni(props) {
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
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Dzień : {val.dzien} Data: {val.data}
                  <Button
                    onClick={() => {
                      props.handleOpen(val);
                    }}
                    variant="contained"
                    color="warning"
                  >
                    Szczegóły
                  </Button>
                </div>{" "}
                {val.statusOpiekunaZ != null &&
                val.statusOpiekunaZ == "Zaakceptowano" ? (
                  <div style={{ color: "green" }}>{val.statusOpiekunaZ}</div>
                ) : (
                  <div style={{ color: "#A52A2A" }}>{val.statusOpiekunaZ}</div>
                )}
                <div style={{ margin: "1rem 0 1rem 0" }}>Opis: {val.opis}</div>{" "}
                <div style={{ margin: "0 0 1rem 0" }}>
                  Student: {val.user.login}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => props.acceptStatus(val.id)}
                  >
                    Akceptuj
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => props.declineStatus(val.id)}
                  >
                    Odrzuć
                  </Button>
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
