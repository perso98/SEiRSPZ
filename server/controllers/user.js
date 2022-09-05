const bcrypt = require("bcrypt");
const {
  user,
  dziennik,
  efektyLista,
  efektyStudent,
  dane,
  firma,
  komentarze,
} = require("../models");

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
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie("user");
    res.end();
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

      await user.create({
        login: login,
        haslo: hashedPassword,
      });

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
      message: "Niestety taki login jest już zajęty",
    });
};