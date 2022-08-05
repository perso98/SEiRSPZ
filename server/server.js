const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const db = require("./models");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { student, dziennik, efektUczeniaSie } = require("./models");
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
  var id_student = 0;
  const loginChecker = await student.findOne({
    where: {
      login: login,
    },
  });

  if (loginChecker == null) {
    if (password == password2) {
      const hashedPassword = await bcrypt.hash(password, 10);
      // try {
      //   await db.sequelize.transaction(async function (t) {
      await student
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
          const id_student_get = await student.findOne({
            attributes: ["id"],
            where: {
              login: login,
            },
          });
          console.log("-----------------------");
          console.log(id_student_get.toJSON().id);
          id_student = id_student_get.toJSON().id;
        })
        .then(async () => {
          console.log(id_student);
          var itemArray = [];
          for (i = 1; i <= 70; i++) {
            encja1 = {
              id_student: id_student,
              dzien: "" + i,
              data: null,
              ilosc_godzin: null,
              opis: null,
              efekt_uczenia: null,
              zatwierdzenie: null,
            };
            itemArray.push(encja1);
          }
          return await dziennik.bulkCreate(itemArray);
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

  const checkLogin = await student.findOne({
    where: {
      login: login,
    },
  });
  if (checkLogin == null) {
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
  const listStudent = await student.findAll();

  res.send(listStudent);
});

app.get("/api/getDziennik", async (req, res) => {
  const listDziennik = await dziennik.findAll(
    {
    where: { id_student : req.session.user.id}
  }
  );

  res.send(listDziennik);
});

app.get("/api/getEfektUczenia", async (req, res) => {
  const listEfektUczenia = await efektUczeniaSie.findAll();

  res.send(listEfektUczenia);
});


app.post("/api/changePasswordToAccount", async (req, res) => {
  const { changePassword, changePassword2 } = req.body;
  if (changePassword == changePassword2) {
    const hashedPassword = await bcrypt.hash(changePassword, 10);
    await student.update(
      { haslo: hashedPassword },
      { where: { login: req.session.user.login } }
    );
    res.send({ message: "Pomyślnie zmieniono hasło do konta" });
  } else res.send({ message: "Hasła się nie zgadzają" });
});

app.post("/api/createForm", async (req, res) => {
  try {
    //await db.sequelize.transaction(async function (t) {
    const {
      login,
      haslo,
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
      rola,
    } = req.body;

    student.create(
      {
        login: login,
        haslo: await bcrypt.hash(haslo, 10),
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
        rola: rola,
      }
      // , {
      //     transaction: t,
      // }
    );
    console.log("Wysłano");
    res.send({
      message: "pomyślnie wysłano ;)",
      //});
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
  updatedStudent = await student.update(
    { [action]: type },
    { where: { id: id } }
  );
  res.send(updatedStudent);
});

//Utworzenie konta w admin panelu
app.post("/api/createAccount2", async (req, res) => {
  const { userObject } = req.body;
  try {
    const checkLogin = await student.findOne({
      where: {
        login: userObject.login,
      },
    });
    if (checkLogin == null) {
      const hashed = await bcrypt.hash(userObject.password, 10);
      const newAcc = await student.create({
        login: userObject.login,
        haslo: hashed,
        isOpiekunZakl: userObject.opiekunZ,
        isStudent: userObject.student,
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
    await student.update(
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
app.post('/api/createDay',async  (req,res)=>{
  const {dayObject} = req.body
  try {
  const checkDay = await dziennik.findOne({
    where: {
      dzien: dayObject.dzien,
    },
  });
  if (checkDay == null) {
    const newDay = await dziennik.create({
      id_student:req.session.user.id,  
      dzien:dayObject.dzien,
      data:dayObject.data,
      ilosc_godzin:dayObject.iloscGodzin,
      opis:dayObject.opis,
      efekt_uczenia:dayObject.demoSimpleSelect,
      zatwierdzenie:"Nie zatwierdzono"
      // potrzebna zmiana w bazie na bool
      })
     
      res.send({
        message: "Dzień został pomyślnie dodany",
        id:newDay.id
        
      });
    }
    else {
      res.send({message:'Jest już taki dzień'})
    }
  }
  catch (err){
    res.send({message:err.message})
  }
})

//Usuwanie w panelu admina użytkowników
app.delete("/api/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await student.destroy({
      where: {
        id: id,
      },
    });
    res.send({ message: "Usunięto" });
  } catch (err) {
    res.send({ message: err.message });
  }
});
