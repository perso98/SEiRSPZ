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
    await user.destroy({
      where: {
        id: id,
      },
    });
    res.send({ message: "Usunięto" });
  } catch (err) {
    res.send({ message: err.message });
  }
};

exports.changeUserInfo = async (req, res) => {
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
};

exports.createAccount = async (req, res) => {
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
        isStudent: userObject.student,
        isDyrektor: userObject.dyrektor,
        isAdmin: userObject.admin,
        isDziekanat: userObject.dziekanat,
        isOpiekun: userObject.opiekunU,
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
};

exports.changeRole = async (req, res) => {
  const { action, type, id } = req.body;
  updatedStudent = await user.update({ [action]: type }, { where: { id: id } });
  res.send(updatedStudent);
};

exports.getStudents = async (req, res) => {
  const listStudent = await user.findAll();

  res.send(listStudent);
};
