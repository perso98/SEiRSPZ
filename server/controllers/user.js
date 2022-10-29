const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  user,
  efektyLista,
  efektyStudent,
  dane,
  listaKierunkow,
} = require("../models");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testmailerxx12345@gmail.com",
    pass: "swgptddnhsclpbjk",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.changePasswordToAccount = async (req, res) => {
  const { changePassword, changePassword2 } = req.body;
  if (changePassword == changePassword2) {
    const hashedPassword = await bcrypt.hash(changePassword, 10);
    await user.update(
      { haslo: hashedPassword },
      { where: { login: req.session.user.login } }
    );
    res.send({ message: "Pomyślnie zmieniono hasło do konta" });
  } else res.send({ message: "Hasła się nie zgadzają" });
};

exports.changeDaneToAccount = async (req, res) => {
  const {
    imie,
    nazwisko,
    studia,
    kierunek,
    specjalnosc,
    rokStudiow,
    rodzajStudiow,
    telefon,
  } = req.body;

  // First try to find the record

  const foundItem = await user.findOne({
    where: { login: req.session.user.login },
  });

  if (foundItem.daneId == null) {
    try {
      const createDane = await dane.create({
        imie: imie,
        nazwisko: nazwisko,
        studia: studia,
        kierunek: kierunek,
        specjalnosc: specjalnosc,
        rok_studiow: rokStudiow,
        rodzaj_studiow: rodzajStudiow,
        telefon: telefon,
      });

      await user.update(
        {
          daneId: createDane.id,
        },
        {
          where: { id: foundItem.id },
        }
      );

      const numerKuerunku = await listaKierunkow.findOne({
        where: { nazwa: specjalnosc },
      });
      const listaEfektow = await efektyLista.findAll({
        where: { listaKierunkowId: numerKuerunku },
      });
      listaEfektow.forEach(async (element) => {
        await efektyStudent.create({
          efektyListumId: element.id,
          userId: req.session.user.id,
        });
      });

      res.send({
        message: "Pomyślnie zmieniono dane do konta",
        updateDane: createDane,
      });
    } catch (err) {
      res.send({ message: err.message });
    }
  } else {
    try {
      let czyNull = null;
      if (specjalnosc != null) {
        czyNull = specjalnosc;
      }
      const updateDane = await dane.update(
        {
          imie: imie,
          nazwisko: nazwisko,
          studia: studia,
          kierunek: kierunek,
          specjalnosc: czyNull,
          rok_studiow: rokStudiow,
          rodzaj_studiow: rodzajStudiow,
          telefon: telefon,
        },
        { where: { id: foundItem.daneId } }
      );

      if (specjalnosc != null) {
        const numerKierunku = await listaKierunkow.findOne({
          where: { nazwa: czyNull },
        });
        const listaEfektow = await efektyLista.findAll({
          where: { listaKierunkowId: numerKierunku.id },
        });

        await efektyStudent.destroy({
          where: { userId: req.session.user.id },
        });

        listaEfektow.forEach(async (element) => {
          await efektyStudent.create({
            efektyListumId: element.id,
            userId: req.session.user.id,
          });
        });
      } else {
        await efektyStudent.destroy({
          where: { userId: req.session.user.id },
        });
      }

      // const createEfektyEmpty = await efektyStudent.create({
      //   efektyListumId: ,
      //   userId: req.session.user.id,

      // })
      res.send({
        message: "Pomyślnie zmieniono dane do konta",
        updateDane: updateDane,
      });
    } catch (err) {
      res.send({ message: err.message });
    }
  }
};

exports.getloginToAccount = async (req, res) => {
  if (req.session.user) {
    res.send({ logged: true, user: req.session.user });
  } else {
    res.send({ logged: false });
  }
};

exports.loginToAccount = async (req, res) => {
  const { login, password } = req.body;

  const checkLogin = await user.findOne({
    where: {
      login: login,
    },
  });
  if (!checkLogin) {
    res.send({
      message: "Błędny login lub hasło",
    });
  }
  if (!checkLogin.confirmation) {
    res.send({
      message: "Musisz najpierw potwierdzić konto na swoim mailu",
    });
  }
  if (checkLogin) {
    if (await bcrypt.compare(password, checkLogin.haslo)) {
      req.session.user = checkLogin;
      req.session.logged = true;
      res.send({
        logged: true,
        user: checkLogin,
      });
    } else {
      res.send({
        message: "Błędny login lub hasło",
      });
    }
  }
};

exports.logoutFromAccount = async (req, res) => {
  if (!req.session.user) {
    res.send({ message: "Sesja utracona, zaloguj się ponownie" });
  } else {
    req.session.destroy();
    res.clearCookie("user");
    res.end();
  }
};
exports.confirmMail = async (req, res) => {
  try {
    const { userId: id } = jwt.verify(req.params.token, "SECRETKEY");
    const userConfirm = await user.findOne({ where: { id: id } });
    if (userConfirm.confirmation)
      res.send({
        message: "Te konto już zostało zweryfikowane",
        info: true,
      });

    await user.update({ confirmation: 1 }, { where: { id: id } });
    res.send({
      message: "Weryfikacja przeszła pomyślnie, zaloguj się teraz do konta",
      info: true,
    });
  } catch (err) {
    res.send({ message: "Błąd w weryfikacji...", info: false });
  }
};

exports.resetPasswordForUser = async (req, res) => {
  const { password, password2 } = req.body;

  if (password != password2)
    res.send({ message: "Hasła sie nie zgadzają", info: false });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { userId: id } = jwt.verify(req.params.token, "SECRETKEY");

    await user.update({ haslo: hashedPassword }, { where: { id: id } });
    res.send({ message: "Hasło zrestartowane", info: true });
  } catch (err) {
    console.log(err);
    res.send({ message: "Błąd w restartowaniu hasła", info: false });
  }
};
exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  const userId = await user.findOne({ where: { login: email } });
  if (!userId) {
    res.send({
      message: "Nie ma takiego użytkownika w bazie danych",
      info: false,
    });
  }
  if (!userId.confirmation) {
    res.send({
      message: "Najpierw potwierdź konto",
      info: false,
    });
  } else {
    jwt.sign(
      { userId: userId.id },
      "SECRETKEY",
      {
        expiresIn: "3d",
      },
      (err, token) => {
        const url = `http://localhost:3000/restartpassword/${token}`;
        const options = {
          from: "testmailerxx12345@gmail.com",
          to: email,
          subject: "Reset hasła do aplikacji SEiRSPZ",
          html: `Witaj ${email}, oto twój link do aktywacji zrestartowania hasła, do aplikacji 'SEiRSPZ' wspomagającej praktyki dla ANS Elbląg:
        <a href="${url}">${url}</a> (czas wygaśnięcia : 3dni)`,
        };

        transporter.sendMail(options, function (err, info) {
          if (err) {
            console.log(err);
          }
        });
      }
    );

    res.send({ message: "Link do resetowania hasła przesłany", info: true });
  }
};
exports.resendMail = async (req, res) => {
  const { email } = req.body;

  const userId = await user.findOne({ where: { login: email } });
  if (!userId) {
    res.send({
      message: "Nie ma takiego użytkownika w bazie danych",
      info: false,
    });
  } else if (userId.confirmation == 1) {
    res.send({
      message: "Ten użytkownik ma już potwierdzone konto",
      info: false,
    });
  } else {
    jwt.sign(
      { userId: userId.id },
      "SECRETKEY",
      {
        expiresIn: "3d",
      },
      (err, token) => {
        const url = `http://localhost:3000/confirm/${token}`;
        const options = {
          from: "testmailerxx12345@gmail.com",
          to: email,
          subject: "Potwierdź swój mail, aby korzystać z aplikacji SEiRSPZ",
          html: `Witaj ${email}, oto twój link do aktywacji konta, aby móć korzystać z aplikacji 'SEiRSPZ' wspomagającej praktyki dla ANS Elbląg:
        <a href="${url}">${url}</a> (czas wygaśnięcia : 3dni)`,
        };

        transporter.sendMail(options, function (err, info) {
          if (err) {
            console.log(err);
          }
        });
      }
    );

    res.send({ message: "Link do ponownej aktywacji przesłany", info: true });
  }
};
exports.createAccount = async (req, res) => {
  const { login, password, password2 } = req.body;
  const loginChecker = await user.findOne({
    where: {
      login: login,
    },
  });

  if (!loginChecker) {
    if (password == password2) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await user.create({
        login: login,
        haslo: hashedPassword,
      });

      jwt.sign(
        { userId: newUser.id },
        "SECRETKEY",
        {
          expiresIn: "3d",
        },
        (err, token) => {
          const url = `http://localhost:3000/confirm/${token}`;
          const options = {
            from: "testmailerxx12345@gmail.com",
            to: login,
            subject: "Potwierdź swój mail, aby korzystać z aplikacji SEiRSPZ",
            html: `Witaj ${login}, oto twój link do aktywacji konta, aby móć korzystać z aplikacji 'SEiRSPZ' wspomagającej praktyki dla ANS Elbląg:
            <a href="${url}">${url}</a> (czas wygaśnięcia : 3dni)`,
          };
          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log(err);
            }
          });
        }
      );

      res.send({
        message: "Konto zostało pomyślnie utworzone",
        register: true,
      });
    } else
      res.send({
        message: "Hasła się nie zgadzają",
      });
  } else
    res.send({
      message: "Niestety taki e-mail jest już zajęty",
    });
};

exports.getListaKierunkow = async (req, res) => {
  const lista = await listaKierunkow.findAll();
  res.send(lista);
};

exports.getUserSesionId = async (req, res) => {
  const lista = await user.findOne({ where: { id: req.session.user.id } });
  const userDane = await dane.findOne({
    where: { id: lista.daneId },
  });

  res.send(userDane);
};
