const {
    user,
    dziennik,
    efektyLista,
    efektyStudent,
    dane,
    firma,
    komentarze,
    dzienZalaczniki,
  } = require("../models");
  
  exports.getDziennik = async (req, res) => {
    const listDziennik = await dziennik.findAll({
      where: { userId: req.session.user.id },
      // include: {
      //   model: dzienZalaczniki,
      // },
    });
  
    res.send(listDziennik);
  };

//Utworzenie Dnia w dzienniczku
  exports.createDay = async (req, res) => {
    const { dayObject } = req.body;
    try {
      const checkDay = await dziennik.findOne({
        where: {
          dzien: dayObject.dzien,
          userId: req.session.user.id,
        },
      });
      if (checkDay == null) {
        const newDay = await dziennik.create({
          userId: req.session.user.id,
          dzien: dayObject.dzien,
          data: dayObject.data,
          ilosc_godzin: dayObject.iloscGodzin,
          opis: dayObject.opis,
          efekt_uczenia: dayObject.demoSimpleSelect,
          statusOpiekunaU: "Oczekiwanie",
          statusOpiekunaZ: "Oczekiwanie",
          // potrzebna zmiana w bazie na bool
        });
  
        res.send({
          message: "Dzień został pomyślnie dodany",
          id: newDay.id,
        });
      } else {
        res.send({ message: "Jest już taki dzień" });
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  };

  exports.createDay2 = async (req, res) => {
    try {
        const newDay = await dziennik.create({
          userId: req.session.user.id,
          dzien: "",
          data: "",
          ilosc_godzin: "",
          opis: "",
          statusOpiekunaU: "Nie wysłano",
          statusOpiekunaZ: "Nie wysłano",
          // potrzebna zmiana w bazie na bool
        });
        res.send({
          message: "Dzień został pomyślnie dodany",
          id: newDay.id,
        });

    } catch (err) {
      res.send({ message: err.message });
    }
  };

 // Edycja dnia w dzienniczku
  exports.createEditDay = async (req, res) => {
    const { id, changeOpis, changeDzien, changeData, changeIloscGodzin } =
      req.body;
    try {
      await dziennik.update(
        {
          dzien: changeDzien,
          data: changeData,
          ilosc_godzin: changeIloscGodzin,
          opis: changeOpis,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const editDay = await dziennik.findOne({
        where: {
          id: id,
        },
      });
      res.send({
        message: "Zmiana przeszła pomyślnie...",
        editDzien: editDay.dzien,
        editData: editDay.data,
        editIlosc_godzin: editDay.ilosc_godzin,
        editOpis: editDay.opis,
      });
    } catch (err) {
      res.send({ message: err.message });
    }
  };

//Usuwanie dnia z dzinniczka
  exports.deleteDay = async (req, res) => {
    const id = req.params.id;
    try {
      await dziennik.destroy({
        where: {
          id: id,
        },
      });
      res.send({ message: "Usunięto" });
    } catch (err) {
      res.send({ message: err.message });
    }
  };


exports.getEfektUczenia = async (req, res) => {
    const listaEfektow = await efektyLista.findAll();
  
    res.send(listaEfektow);
  };


  exports.listEfektyStudent = async (req, res) => {
    const listEfektyStudent = await efektyStudent.findAll({
      where: { userId: req.session.user.id },
    });
  
    res.send(listEfektyStudent);
  };


  exports.createUzasadnienieEfektu = async (req, res) => {
    const { id, komentarz } = req.body;
    const uzasadnienieEfektu = await efektyStudent.create({
      komentarz: komentarz,
      efektyListumId: id,
      userId: req.session.user.id,
    });
    res.send(uzasadnienieEfektu);
  };


  exports.updateUzasadnienieEfektu = async (req, res) => {
    const { id, komentarz } = req.body;
    const uzasadnienieEfektu = await efektyStudent.update(
      {
        komentarz: komentarz,
      },
      {
        where: {
          userId: req.session.user.id,
          efektyListumId: id,
        },
      }
    );
    res.send(uzasadnienieEfektu);
  };


  exports.IdUser = async (req, res) => {
    const idUser = await user.findOne({
      where: { id: req.session.user.id },
    });
  
    res.send(idUser);
  };


  exports.createZalacznik = async (req, res) => {
      try {
        const {
          zalacznik,
          idDay,
        } = req.body;
        console.log("data")
        console.log(zalacznik)

        await dzienZalaczniki.create({
          zalacznik: zalacznik,
          dziennikId: idDay,
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

    exports.getZalacznik = async (req, res) => {
      const zalaczniki = await dzienZalaczniki.findAll({
      });

      res.send(zalaczniki);
    };



    exports.deleteZalacznik = async (req, res) => {
      const id = req.params.id;
      try {
        await dzienZalaczniki.destroy({
          where: {
            id: id,
          },
        });
        res.send({ message: "Usunięto" });
      } catch (err) {
        res.send({ message: err.message });
      }
    };