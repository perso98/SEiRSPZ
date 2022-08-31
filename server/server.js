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

const opiekunZ_controller = require("./controllers/opiekunZ");
const opiekunU_controller = require("./controllers/opiekunU");
const opiekuni_controller = require("./controllers/opiekuni");
const admin_controller = require("./controllers/admin");
const user_controller = require("./controllers/user");
const dzienniczek_controller = require("./controllers/dzienniczek");
const firma_controller = require("./controllers/firma");
const form_controller = require("./controllers/form");
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

//        Dzienniczek
app.get("/api/getDziennik", dzienniczek_controller.getDziennik);
//Utworzenie Dnia w dzienniczku
app.post("/api/createDay", dzienniczek_controller.createDay);
// Edycja dnia w dzienniczku
app.post("/api/createEditDay", dzienniczek_controller.createEditDay);
//Usuwanie dnia z dzinniczka
app.delete("/api/deleteDay/:id", dzienniczek_controller.deleteDay);
app.get("/api/getEfektUczenia", dzienniczek_controller.getEfektUczenia);
app.get("/api/listEfektyStudent", dzienniczek_controller.listEfektyStudent);
app.put("/api/createUzasadnienieEfektu", dzienniczek_controller.createUzasadnienieEfektu);
app.put("/api/updateUzasadnienieEfektu", dzienniczek_controller.updateUzasadnienieEfektu);
app.get("/api/IdUser", dzienniczek_controller.IdUser);
app.post("/api/createZalacznik", dzienniczek_controller.createZalacznik);
//        Firma
app.get("/api/getOpiekuni", firma_controller.getOpiekuni);
app.get("/api/getOpiekun/:id", firma_controller.getOpiekunId);
app.get("/api/getDane", firma_controller.getDane);
app.get("/api/getUser", firma_controller.getUser);
app.get("/api/getFirma", firma_controller.getFirma);
//Dodanie zakładu
app.post("/api/createFirma", firma_controller.createFirma);
//Dodanie Opiekuna do zakladu
app.put("/api/addOpiekunFirma", firma_controller.addOpiekunFirma);
app.put("/api/delOpiekunFirma", firma_controller.delOpiekunFirma);
app.put("/api/addStudentFirma", firma_controller.addStudentFirma);
app.put("/api/delStudentFirma", firma_controller.delStudentFirma);
//Edit firma nazwa
app.put("/api/updateFirma", firma_controller.updateFirma);

//        Form
//Wprowadzanie danych
app.post("/api/createForm", form_controller.createForm);

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
//Pobranie listy studentów
app.get("/api/getStudents", admin_controller.getStudents);
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
