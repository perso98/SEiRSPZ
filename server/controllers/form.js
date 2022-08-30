const {
    user,
    dziennik,
    efektyLista,
    efektyStudent,
    dane,
    firma,
    komentarze,
  } = require("../models");

  exports.createForm = async (req, res) => {
    try {
      const {
        imie,
        nazwisko,
        indeks,
        studia,
        kierunek,
        specjalnosc,
        rok_studiow,
        rodzaj_studiow,
        telefon,
        email,
      } = req.body;
  
      await dane.create({
        imie: imie,
        nazwisko: nazwisko,
        indeks: indeks,
        studia: studia,
        kierunek: kierunek,
        specjalnosc: specjalnosc,
        rok_studiow: rok_studiow,
        rodzaj_studiow: rodzaj_studiow,
        telefon: telefon,
        email: email,
      });
      console.log("Wysłano");
      res.send({
        message: "pomyślnie wysłano ;)",
      });
    } catch {
      console.log("Błąd");
      res.send({
        message: "Błąd ;)",
      });
    }
  };