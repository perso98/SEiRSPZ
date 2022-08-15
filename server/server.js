const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const db = require("./models");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Op } = require("sequelize");

const { user, dziennik, efektUczeniaSie, dane, komentarze,  } = require("./models");
const cors = require("cors");
const bcrypt = require("bcrypt");

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

app.post("/api/createAccount", async (req, res) => {
  const { login, password, password2 } = req.body;
  var id_user = 0;
  const loginChecker = await user.findOne({
    where: {
      login: login,
    },
  });

  if (!loginChecker) {
    if (password == password2) {
      const hashedPassword = await bcrypt.hash(password, 10);
      // try {
      //   await db.sequelize.transaction(async function (t) {
      await user
        .create(
          {
            login: login,
            haslo: hashedPassword,
          }
          // ,{
          //   transaction: t,
          // }
        )
        .then(async () => {
          const id_user_get = await user.findOne({
            attributes: ["id"],
            where: {
              login: login,
            },
          });
          console.log("-----------------------");
          console.log(id_user_get.toJSON().id);
          id_user = id_user_get.toJSON().id;
        });

      res.send({
        message: "Konto zostało pomyślnie utworzone",
        register: true,
      });
      // }
      // )}
      // catch{
      //   res.send({
      //     message: "Błąd ",
      //   });
      // }
    } else
      res.send({
        message: "Hasła się nie zgadzają",
      });
  } else
    res.send({
      message: "Niestety taki login jest już zajęty",
    });
});

app.get("/api/loginToAccount", (req, res) => {
  if (req.session.user) {
    res.send({ logged: true, user: req.session.user });
  } else {
    res.send({ logged: false });
  }
});

app.post("/api/loginToAccount", async (req, res) => {
  const { login, password } = req.body;

  const checkLogin = await user.findOne({
    where: {
      login: login,
    },
  });
  if (!checkLogin) {
    req.session.logged = false;
    res.send({
      message: "Błędny login",
    });
  } else if (checkLogin) {
    if (await bcrypt.compare(password, checkLogin.haslo)) {
      req.session.user = checkLogin;
      req.session.logged = true;
      res.send({
        logged: true,
      });
    } else {
      res.send({
        message: "Hasło nie jest poprawne",
      });
      req.session.logged = false;
    }
  }
});

app.post("/api/logoutFromAccount", (req, res) => {
  req.session.destroy();
  res.clearCookie("key");
  res.end();
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
  const listEfektUczenia = await efektUczeniaSie.findAll();

  res.send(listEfektUczenia);
});


app.get("/api/getOpiekuni", async (req, res) => {
  const listOpiekun = await user.findAll({
    where: { isOpiekun: 1 },
  })

  const listStudentsO = await user.findAll({
    where: 
    {
      [Op.or]: [
        { id_opiekunZ: null },
        { id_opiekunU: null }
      ],
      [Op.and]: [
        { isStudent: 1 },
      ],
    }
  });

  res.send(listOpiekun, listStudentsO);
});

app.get("/api/getOpiekun/:id", async (req, res) => {
  const id = req.params.id;

  const Opiekun = await dane.findOne({
    where: { id: id },
  })

  res.send(Opiekun);
});

app.get("/api/getStudentsO", async (req, res) => {
  const { Op } = require("sequelize");
  const listStudentsO = await user.findAll({
    where: 
    {
      [Op.or]: [
        { id_opiekunZ: null },
        { id_opiekunU: null }
      ],
      [Op.and]: [
        { isStudent: 1 },
      ],
    }
  });
  console.log(listStudentsO)
  res.send(listStudentsO);
});

app.get("/api/getStudentsNO", async (req, res) => {
  const listDziennik = await dziennik.findAll({
    where: { userId: req.session.user.id },
  });

  res.send(listDziennik);
});



app.post("/api/changePasswordToAccount", async (req, res) => {
  const { changePassword, changePassword2 } = req.body;
  if (changePassword == changePassword2) {
    const hashedPassword = await bcrypt.hash(changePassword, 10);
    await user.update(
      { haslo: hashedPassword },
      { where: { login: req.session.user.login } }
    );
    res.send({ message: "Pomyślnie zmieniono hasło do konta" });
  } else res.send({ message: "Hasła się nie zgadzają" });
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

    await dane.create(
      {
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
      }
    );
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

//Zmiana ról w panelu administratora

app.put("/api/changeRole", async (req, res) => {
  const { action, type, id } = req.body;
  updatedStudent = await user.update({ [action]: type }, { where: { id: id } });
  res.send(updatedStudent);
});

//Utworzenie konta w admin panelu
app.post("/api/createAccount2", async (req, res) => {
  const { userObject } = req.body;
  try {
    const checkLogin = await user.findOne({
      where: {
        login: userObject.login,
      },
    });
    if (checkLogin == null) {
      const hashed = await bcrypt.hash(userObject.password, 10);
      const newAcc = await user.create({
        login: userObject.login,
        haslo: hashed,
        isOpiekunZakl: userObject.opiekunZ,
        isStudent: userObject.user,
        isDyrektor: userObject.dyrektor,
        isAdmin: userObject.admin,
        isDziekanat: userObject.dziekanat,
        isOpiekun: userObject.opuekunU,
      });

      res.send({
        message: "Konto zostało pomyślnie utworzone",
        id: newAcc.id,
      });
    } else {
      res.send({ message: "Login jest już zajęty" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
});
//Zmiana informacji o użytkowniku w panelu admina(ediirButton)
app.put("/api/changeUserInfo", async (req, res) => {
  const { id, changeLogin } = req.body;

  try {
    await user.update(
      {
        login: changeLogin,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.send({ message: "Zmiana przeszła pomyślnie..." });
  } catch (err) {
    res.send({ message: err.message });
  }
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

//Usuwanie w panelu admina użytkowników
app.delete("/api/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await user.destroy({
      where: {
        id: id,
      },
    });
    res.send({ message: "Usunięto" });
  } catch (err) {
    res.send({ message: err.message });
  }
});
//pobieranie dni dla opiekunaZ

app.get("/api/getDaysOpiekunZ", async (req, res) => {
  if (req.session.user.isOpiekunZakl)
    try {
      const getDays = await dziennik.findAll({
        where: { statusOpiekunaZ: { [Op.eq]: null } },
        include: { model: user, where: { id_opiekunZ: req.session.user.id } },
      });
      res.send(getDays);
    } catch (err) {
      console.log(err);
    }

  if (req.session.user.isOpiekun)
    try {
      const getDays = await dziennik.findAll({
        where: { statusOpiekunaU: { [Op.eq]: null } },
        include: { model: user, where: { id_opiekunU: req.session.user.id } },
      });
      res.send(getDays);
    } catch (err) {
      console.log(err);
    }
});

app.post("/api/acceptStatus", async (req, res) => {
  const { id } = req.body;
  if (req.session.user.isOpiekunZakl)
    try {
      await dziennik
        .update({ statusOpiekunaZ: "Zaakceptowano" }, { where: { id: id } })
        .then(res.send({ success: true, status: "statusOpiekunaZ" }));
    } catch (err) {
      console.log(err);
    }
  if (req.session.user.isOpiekun)
    try {
      await dziennik
        .update({ statusOpiekunaU: "Zaakceptowano" }, { where: { id: id } })
        .then(res.send({ success: true, status: "statusOpiekunaU" }));
    } catch (err) {
      console.log(err);
    }
});

app.post("/api/declineStatus", async (req, res) => {
  const { id } = req.body;

  if (req.session.user.isOpiekunZakl)
    try {
      await dziennik
        .update({ statusOpiekunaZ: "Odrzucono" }, { where: { id: id } })
        .then(res.send({ success: true, status: "statusOpiekunaZ" }));
    } catch (err) {
      console.log(err);
    }

  if (req.session.user.isOpiekun)
    try {
      await dziennik
        .update({ statusOpiekunaU: "Odrzucono" }, { where: { id: id } })
        .then(res.send({ success: true, status: "statusOpiekunaU" }));
    } catch (err) {
      console.log(err);
    }
});

//wziecie wszystkich dni z dzienniczka juz z statusem
app.get("/api/getDaysOpiekunStatus", async (req, res) => {
  if (req.session.user.isOpiekunZakl)
    try {
      const getDays = await dziennik.findAll({
        where: { statusOpiekunaZ: { [Op.ne]: null } },
        include: {
          model: user,
          where: {
            id_opiekunZ: req.session.user.id,
          },
        },
      });
      res.send(getDays);
    } catch (err) {
      console.log(err);
    }

  if (req.session.user.isOpiekun)
    try {
      const getDays = await dziennik.findAll({
        where: { statusOpiekunaU: { [Op.ne]: null } },
        include: {
          model: user,
          where: {
            id_opiekunU: req.session.user.id,
          },
        },
      });
      res.send(getDays);
    } catch (err) {
      console.log(err);
    }
});
