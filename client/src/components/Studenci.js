import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function Studenci(props) {
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
                Login : {val.login}
                {val.efektyStudents.length > 0 ? (
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      width: "10rem",
                      marginTop: "1rem",
                      margin: "auto",
                    }}
                    onClick={() => {
                      props.setEfekt(0);
                      props.handleOpen(val);
                      props.setOpis(val.efektyStudents[0].komentarz);
                    }}
                  >
                    Sprawdź
                  </Button>
                ) : (
                  <div style={{ color: "red" }}>Brak efektów u studenta</div>
                )}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Studenci;
