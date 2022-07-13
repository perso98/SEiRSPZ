const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const db = require("./models");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { student, dziennik } = require("./models");
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
    methods: ["GET", "POST","PUT","DELETE"],
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
  const { registerLogin, registerPassword, registerPassword2 } = req.body;
  var id_student = 0
  const loginChecker = await student.findOne({
    where: {
      login: registerLogin,
    },
  });
  
  if (loginChecker == null) {
    if (registerPassword == registerPassword2) {
      const hashedPassword = await bcrypt.hash(registerPassword, 10);
      // try {
      //   await db.sequelize.transaction(async function (t) {
          await student.create({
            login: registerLogin,
            haslo: hashedPassword,
          }
          // ,{
          //   transaction: t,
          // }
          )
          .then(async () => {
            const id_student_get = await student.findOne({
              attributes: ['id'],
              where:{
                login: registerLogin,
              }
            })
            console.log("-----------------------")
            console.log(id_student_get.toJSON().id)
            id_student = id_student_get.toJSON().id
          })
          .then(async () => {
            console.log(id_student)
            var itemArray=[];
            for(i=1; i<=70; i++){
              encja1={
                id_student: id_student,
                dzien: "" + i,
                data: null,
                ilosc_godzin: null,
                opis: null,
                efekt_uczenia: null,
                zatwierdzenie: null,
              }
              itemArray.push(encja1);
            }
            return await dziennik.bulkCreate(itemArray)
          })
        
        res.send({
          message: "Konto zostało pomyślnie utworzone",
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
  const { loginLogin, loginPassword } = req.body;

  const checkLogin = await student.findOne({
    where: {
      login: loginLogin,
    },
  });
  if (checkLogin == null) {
    req.session.logged = false;
    res.send({
      message: "Błędny login",
    });
  } else if (checkLogin) {
    if (await bcrypt.compare(loginPassword, checkLogin.haslo)) {
      req.session.user = checkLogin;
      req.session.logged = true;
      res.send({
        message: "Pomyślne zalogowanie",
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
  updatedStudent = await student.update({ [action]: type }, { where: { id: id } });
  res.send(updatedStudent);
});


//Utworzenie konta w admin panelu
app.post('/api/createAccount2',async  (req,res)=>{
        const {login,password,admin,student2,opiekunZ,opiekunU,dyrektor,dziekanat}=req.body
        try {
        const checkLogin = await student.findOne({
          where: {
            login: login,
          },
        });
        if (checkLogin == null) {
            const hashed = await bcrypt.hash(password, 10);
         await student.create({
              login:login,
              haslo:hashed,
              isStudent:student2,
              isDyrektor:dyrektor,
              isDziekanat:dziekanat,
              isOpiekunZakl:opiekunZ,
              isOpiekun:opiekunU,
              isAdmin:admin,
            })
            res.send({
              message: "Konto zostało pomyślnie utworzone"
            });
          }
          else {
            res.send({message:'Login jest już zajęty'})
          }
        }
        catch (err){
          res.send({message:err.message})
        }
})
//Zmiana informacji o użytkowniku w panelu admina(ediirButton)
app.put('/api/changeUserInfo',async (req,res)=>{

  const {id,changeLogin}=req.body

  try {
  await student.update({
    login:changeLogin,
  },
  {
  where:{
    id:id

  }})
  res.send({message:'Zmiana przeszła pomyślnie...'})
}
catch(err){
  res.send({message:err.message})
}

})
//Usuwanie w panelu admina użytkowników
app.delete('/api/deleteUser/:id', async (req,res)=>{
  const id= req.params.id
  try {
  await student.destroy({where:{
    id:id,
  }})
  res.send({message:'Usunięto'})
}
  catch (err){
    res.send({message:err.message})
  }



})

