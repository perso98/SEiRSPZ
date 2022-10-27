const {
  user,
  dziennik,
  efektyLista,
  efektyStudent,
  dane,
  firma,
  komentarze,
  dzienZalaczniki,
  listaKierunkow,
} = require("../models");
const { Op } = require("sequelize");
const multer = require("multer");

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
    // const checkDay = await dziennik.findOne({
    //   where: {
    //     id: id,
    //   },
    // });
    // console.log("QQQQQQQQQ"+ checkDay.dzien )
    // if (checkDay.dzien == null) {
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
    // }
    // else {
    //   res.send({ message: "Jest już taki dzień" });
    // }
  } catch (err) {
    res.send({ message: "Wprawadź numer dnia" });
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

  try {
    const userId = await user.findOne({
      attributes: ['daneId'],
      where: {
        id: req.session.user.id,
      },
    })

    
    const specjalnosc = await dane.findOne({
      attributes: ['specjalnosc'],
      where: {
        id: userId.daneId,
      },
    })
    if(specjalnosc.specjalnosc !== null){
      const idSpecjalnosc = await listaKierunkow.findOne({
        attributes: ['id'],
        where: {
          nazwa: specjalnosc.specjalnosc,
        },
      })
      
      const listaEfektow = await efektyLista.findAll({
        where: {
        listaKierunkowId: idSpecjalnosc.id,
      },});
    
      res.send(listaEfektow);
    }
    else{
      res.send({
        message: "Wybierz specjalność",
      });
    }
    
  } 
  catch (err) {
  }
  };

exports.listEfektyStudent = async (req, res) => {
  const id = req.params.id;
  const listEfektyStudent = await efektyStudent.findOne({
    where: {
      [Op.and]: [{ userId: req.session.user.id }, { efektyListumId: id }],
    },
  });
  if (listEfektyStudent == null) {
    res.send(listEfektyStudent);
  } else {
    res.send(listEfektyStudent.komentarz);
  }
};

exports.updateUzasadnienieEfektu = async (req, res) => {
  const { id, komentarz } = req.body;
  const checkEfekt = await efektyStudent.findOne({
    where: { efektyListumId: id },
  });
  if (checkEfekt == null) {
    const uzasadnienieEfektu = await efektyStudent.create({
      komentarz: komentarz,
      efektyListumId: id,
      userId: req.session.user.id,
    });
    res.send(uzasadnienieEfektu);
  } else {
    const uzasadnienieEfektu = await efektyStudent.update(
      {
        komentarz: komentarz,
      },
      {
        where: { id: checkEfekt.id },
      }
    );
    res.send(uzasadnienieEfektu);
  }
};

exports.IdUser = async (req, res) => {
  const idUser = await user.findOne({
    where: { id: req.session.user.id },
  });

  res.send(idUser);
};

exports.createZalacznik = async (req, res) => {
  try {
    const { zalacznik, idDay } = req.body;

    await dzienZalaczniki.create({
      zalacznik: zalacznik,
      dziennikId: idDay,
    });
    res.send({
      message: "pomyślnie wysłano ;)",
    });
  } catch {
    res.send({
      message: "Błąd ;)",
    });
  }
};

exports.getZalacznik = async (req, res) => {
  const zalaczniki = await dzienZalaczniki.findAll({});

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

exports.upload = async (req, res) => {
  console.log("server/upload");
  const idDay = req.params.idDay;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "user_files");
    },
    filename: async (req, file, cb) => {
      const nowDate = Date.now() + "-" + file.originalname;
      cb(null, nowDate);
      const dzienZalacznik = await dzienZalaczniki.create({
        zalacznik: nowDate,
        dziennikId: idDay,
      });
      res.send(dzienZalacznik);
    },
  });

  const upload = multer({ storage }).array("file");
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    // return res.status(200).send(req.files)
  });
};

exports.sendDay = async (req, res) => {
  try {
    const { id } = req.body;

    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQ")
    const check = await dziennik.findOne({
      where:{id: id}
    })

      if(check.statusOpiekunaU === "Zaakceptowano"){
        await dziennik.update(
          {
            statusOpiekunaU: "Zaakceptowano",
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      else{
        await dziennik.update(
          {
            statusOpiekunaU: "Oczekiwanie",
          },
          {
            where: {
              id: id,
            },
          }
        );
    
      }

      if(check.statusOpiekunaZ === "Zaakceptowano"){
        await dziennik.update(
          {
            statusOpiekunaZ: "Zaakceptowano",
          },
          {
            where: {
              id: id,
            },
          }
        );
    
        
      }
      else{
        await dziennik.update(
          {
            statusOpiekunaZ: "Oczekiwanie",
          },
          {
            where: {
              id: id,
            },
          }
        );
    
        
      }
      res.send({
        message: "Wysłano",
      });

  } catch {
    res.send({
      message: "Błąd",
    });
  }
};
