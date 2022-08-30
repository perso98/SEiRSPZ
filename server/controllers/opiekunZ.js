const { Op } = require("sequelize");
const {
  user,
  dziennik,
  efektyLista,
  efektyStudent,
  dane,
  firma,
  komentarze,
} = require("../models");
//pobieranie efektow uczenia dla opiekunow

exports.getEffectsOpiekunZ = async (req, res) => {
  try {
    const getEffects = await user.findAll({
      where: {
        id_opiekunZ: req.session.user.id,
      },
      include: {
        model: efektyStudent,
        include: {
          model: efektyLista,
        },
      },
    });

    res.send(getEffects);
  } catch (err) {
    console.log(err);
  }
};

exports.getDaysOpiekunZStatus = async (req, res) => {
  try {
    const getDays = await dziennik.findAll({
      where: { statusOpiekunaZ: { [Op.ne]: "Oczekiwanie" } },
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
};

exports.getDaysOpiekunZ = async (req, res) => {
  try {
    const getDays = await dziennik.findAll({
      where: { statusOpiekunaZ: { [Op.eq]: "Oczekiwanie" } },
      include: { model: user, where: { id_opiekunZ: req.session.user.id } },
    });

    res.send(getDays);
  } catch (err) {
    console.log(err);
  }
};
