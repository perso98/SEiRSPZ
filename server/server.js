const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const db = require("./models");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Op } = require("sequelize");

const {
  user,
  dziennik,
  efektyLista,
  efektyStudent,
  dane,
  firma,
  komentarze,
} = require("./models");
const cors = require("cors");
const bcrypt = require("bcrypt");

const opiekunZ_controller = require("./controllers/opiekunZ");
const opiekunU_controller = require("./controllers/opiekunU");
const opiekuni_controller = require("./controllers/opiekuni");
const admin_controller = require("./controllers/admin");
const user_controller = require("./controllers/user");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    key: "user",
    secret: "adsadsadkisahduja92183782uiwejdhjlkjsandkjbnsa",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 48000,
    },
  })
);

db.sequelize.sync();

app.listen(5000, () => {
  console.log("Serwer uruchomiony na porcie 5000");
});

app.get("/api/getStudents", async (req, res) => {
  const listStudent = await user.findAll();

  res.send(listStudent);
});

app.get("/api/getDziennik", async (req, res) => {
  const listDziennik = await dziennik.findAll({
    where: { userId: req.session.user.id },
  });

  res.send(listDziennik);
});

app.get("/api/getEfektUczenia", async (req, res) => {
  const listaEfektow = await efektyLista.findAll();

  res.send(listaEfektow);
});

app.get("/api/listEfektyStudent", async (req, res) => {
  const listEfektyStudent = await efektyStudent.findAll({
    where: { userId: req.session.user.id },
  });

  res.send(listEfektyStudent);
});

app.put("/api/createUzasadnienieEfektu", async (req, res) => {
  const { id, komentarz } = req.body;
  const uzasadnienieEfektu = await efektyStudent.create({
    komentarz: komentarz,
    efektyListumId: id,
    userId: req.session.user.id,
  });
  res.send(uzasadnienieEfektu);
});

app.put("/api/updateUzasadnienieEfektu", async (req, res) => {
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
});

app.get("/api/IdUser", async (req, res) => {
  const idUser = await user.findOne({
    where: { id: req.session.user.id },
  });

  res.send(idUser);
});

app.get("/api/getOpiekuni", async (req, res) => {
  const listOpiekun = await user.findAll({
    where: { isOpiekun: 1 },
  });

  const listStudentsO = await user.findAll({
    where: {
      [Op.or]: [{ id_opiekunZ: null }, { id_opiekunU: null }],
      [Op.and]: [{ isStudent: 1 }],
    },
  });

  res.send(listOpiekun, listStudentsO);
});

app.get("/api/getOpiekun/:id", async (req, res) => {
  const id = req.params.id;

  const Opiekun = await dane.findOne({
    where: { id: id },
  });

  res.send(Opiekun);
});

app.get("/api/getDane", async (req, res) => {
  const listDane = await dane.findAll();

  res.send(listDane);
});

app.get("/api/getUser", async (req, res) => {
  const listUser = await user.findAll();

  res.send(listUser);
});

app.get("/api/getFirma", async (req, res) => {
  const listUser = await firma.findAll();

  res.send(listUser);
});

app.post("/api/createForm", async (req, res) => {
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
});

//Dodanie zakładu
app.post("/api/createFirma", async (req, res) => {
  const { firmaObject } = req.body;
  try {
    const checkFirma = await firma.findOne({
      where: {
        nazwa: firmaObject.nazwa,
      },
    });
    if (checkFirma == null) {
      const newFirma = await firma.create({
        nazwa: firmaObject.nazwa,
        opis: firmaObject.opis,
      });

      res.send({
        message: "Zakład został dodany",
        id: newFirma.id,
      });
    } else {
      res.send({ message: "Jest już taki zakład" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
});

//Dodanie Opiekuna do zakladu

app.put("/api/addOpiekunFirma", async (req, res) => {
  const { id, firmaId } = req.body;
  updateOpiekun = await user.update(
    {
      firmaId: firmaId,
    },
    {
      where: { id: id },
    }
  );
  res.send(updateOpiekun);
  console.log("1111111111111111111");
});

app.put("/api/delOpiekunFirma", async (req, res) => {
  const { id, firmaId } = req.body;
  updateOpiekun = await user.update(
    {
      firmaId: null,
    },
    {
      where: { id: id },
    }
  );
  res.send(updateOpiekun);
  console.log("1111111111111111111");
});

//Utworzenie Dnia w dzienniczku
app.post("/api/createDay", async (req, res) => {
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
});

// Edycja dnia w dzienniczku
app.post("/api/createEditDay", async (req, res) => {
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
});

//Usuwanie dnia z dzinniczka
app.delete("/api/deleteDay/:id", async (req, res) => {
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
});

//Edit firma nazwa
app.put("/api/updateFirma", async (req, res) => {
  const { id, changeNazwa } = req.body;

  try {
    await firma.update(
      {
        nazwa: changeNazwa,
      },
      {
        where: {
          id: id,
        },
      }
    );
    const editFirma = await firma.findOne({
      where: {
        id: id,
      },
    });

    res.send({
      message: "Zmiana przeszła pomyślnie...",
      editNazwa: editFirma.nazwa,
    });
  } catch (err) {
    res.send({ message: err.message });
  }
});

//Maciek
//User
//pobranie danych o sesji uzytkownika jesli jest zalogowany
app.get("/api/loginToAccount", user_controller.getloginToAccount);
//zmiana hasla do konta wlasciciela
app.post(
  "/api/changePasswordToAccount",
  user_controller.changePasswordToAccount
);
//zalogowanie sie do konta
app.post("/api/loginToAccount", user_controller.loginToAccount);
//wylogowanie się z konta
app.post("/api/logoutFromAccount", user_controller.logoutFromAccount);
//utworzenie konta
app.post("/api/createAccount", user_controller.createAccount);

//===========================================================

//Admin
//Usuwanie w panelu admina użytkowników
app.delete("/api/deleteUser/:id", admin_controller.deleteUser);
//Zmiana informacji o użytkowniku w panelu admina(editButton)
app.put("/api/changeUserInfo", admin_controller.changeUserInfo);
//Zmiana ról w panelu administratora
app.put("/api/changeRole", admin_controller.changeRole);
//Utworzenie konta w admin panelu
app.post("/api/createAccount2", admin_controller.createAccount);

//===========================================================

//Opiekun Zakladowy
//pobranie wszystkich dni z dzienniczka z historia opiekuna zakladowego
app.get(
  "/api/getDaysOpiekunZStatus",
  opiekunZ_controller.getDaysOpiekunZStatus
);
//pobieranie efektow uczenia dla opiekuna zakladowego
app.get("/api/getEffectsOpiekunZ", opiekunZ_controller.getEffectsOpiekunZ);
//pobieranie dni dzienniczka studentow dla opiekuna zakladowego
app.get("/api/getDaysOpiekunZ", opiekunZ_controller.getDaysOpiekunZ);
//===========================================================

//Opiekun uczelniany
//pobranie wszystkich dni z dzienniczka z historia opiekuna uczelnianego
app.get(
  "/api/getDaysOpiekunUStatus",
  opiekunU_controller.getDaysOpiekunUStatus
);
//pobieranie dni dzienniczka studentow dla opiekuna uczelnianego
app.get("/api/getDaysOpiekunU", opiekunU_controller.getDaysOpiekunU);
//===========================================================

//Opiekuni razem
//(historia dzienniczka)zmiana statusu w popupie
app.post("/api/changeStatusEdit", opiekuni_controller.changeStatusEdit);
//zmiana statusu akceptacji zaleznie od opiekuna
app.post("/api/changeStatus", opiekuni_controller.changeStatus);
//===========================================================
