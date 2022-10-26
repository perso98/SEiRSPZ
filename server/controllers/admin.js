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

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      await user.destroy({
        where: {
          id: id,
        },
      });
      res.send({ message2: "Usunięto" });
    }
  } catch (err) {
    res.send({ message2: err.message });
  }
};

exports.changeUserInfo = async (req, res) => {
  const { id, changeLogin } = req.body;

  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
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
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.createAccount = async (req, res) => {
  const { userObject } = req.body;
  try {
    if (!req.session.user)
      res.send({ message1: "Sesja utracona, zaloguj się ponownie" });
    else {
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
          isStudent: userObject.student,
          isDyrektor: userObject.dyrektor,
          isAdmin: userObject.admin,
          isDziekanat: userObject.dziekanat,
          isOpiekun: userObject.opiekunU,
        });

        res.send({
          message2: "Konto zostało pomyślnie utworzone",
          id: newAcc.id,
        });
      } else {
        res.send({ message2: "Login jest już zajęty" });
      }
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.changeRole = async (req, res) => {
  const { action, type, id } = req.body;
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      updatedStudent = await user.update(
        { [action]: type },
        { where: { id: id } }
      );
      res.send(updatedStudent);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getStudents = async (req, res) => {
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      const listStudent = await user.findAll();
      res.send(listStudent);
    }
  } catch (err) {
    console.log(err);
  }
};
