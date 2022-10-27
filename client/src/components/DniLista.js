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
                {props.status &&
                  (val.statusOpiekunaZ == "Zaakceptowano" ? (
                    <div
                      style={{
                        color: "green",
                        display: "flex",
                        gap: "0.4rem",
                        marginTop: "1rem",
                      }}
                    >
                      <h6 style={{ color: "white" }}>
                        Status opiekuna zakładowego:
                      </h6>
                      <h6>{val.statusOpiekunaZ}</h6>
                    </div>
                  ) : (
                    <div
                      style={{
                        color: "#A52A2A",
                        display: "flex",
                        gap: "0.4rem",
                        marginTop: "1rem",
                      }}
                    >
                      <h6 style={{ color: "white" }}>
                        Status opiekuna zakładowego:
                      </h6>
                      <h6>{val.statusOpiekunaZ}</h6>
                    </div>
                  ))}
                {props.status &&
                  (val.statusOpiekunaU == "Zaakceptowano" ? (
                    <div
                      style={{
                        color: "green",
                        display: "flex",
                        gap: "0.4rem",
                        marginTop: "1rem",
                      }}
                    >
                      <h6 style={{ color: "white" }}>
                        Status opiekuna uczelnianego:
                      </h6>
                      <h6>{val.statusOpiekunaU}</h6>
                    </div>
                  ) : (
                    <div
                      style={{
                        color: "#A52A2A",
                        display: "flex",
                        gap: "0.4rem",
                        marginTop: "1rem",
                      }}
                    >
                      <h6 style={{ color: "white" }}>
                        Status opiekuna uczelnianego:
                      </h6>
                      <h6>{val?.statusOpiekunaU}</h6>
                    </div>
                  ))}
                <div
                  style={{ margin: "1rem 0 1rem 0", wordWrap: "break-word" }}
                >
                  Opis:{" "}
                  {val.opis?.length > 60
                    ? val.opis.substring(0, 60) + "..."
                    : val.opis}
                </div>{" "}
                <div style={{ margin: "0 0 1rem 0" }}>
                  Student: {val.user.login}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {val?.[props?.statusOpiekuna] === "Odrzucono" ? (
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
                    <div />
                  )}

                  {val?.[props?.statusOpiekuna] === "Zaakceptowano" ? (
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
                    <div />
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
