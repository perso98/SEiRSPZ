import React, { useEffect } from "react";
import DniLista from "./DniLista";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import DialogOpiekunZ from "./DialogOpiekunZ";
import * as axios from "axios";

function OpiekunZ() {
  const [dzienniczek, setDzienniczek] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/getDaysOpiekunZ").then((res) => {
      setDzienniczek(res.data);
    });
  }, []);

  return (
    <>
      <Container style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <DniLista dzienniczek={dzienniczek} />
      </Container>
    </>
  );
}

export default OpiekunZ;
