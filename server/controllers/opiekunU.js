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
exports.getEffectsOpiekunU = async (req, res) => {
  try {
    const getEffects = await user.findAll({
      where: {
        id_opiekunU: req.session.user.id,
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
//pobieranie efektow uczenia dla opiekunow

exports.getDaysOpiekunUStatus = async (req, res) => {
  try {
    const getDays = await dziennik.findAll({
      where: { statusOpiekunaU: { [Op.ne]: "Oczekiwanie" } },

      include: [
        {
          model: user,
          where: {
            id_opiekunU: req.session.user.id,
          },
        },
        {
          model: komentarze,
          where: { userId: req.session.user.id },
          required: false,
        },
      ],
    });
    res.send(getDays);
  } catch (err) {
    console.log(err);
  }
};

exports.getDaysOpiekunU = async (req, res) => {
  try {
    const getDays = await dziennik.findAll({
      where: { statusOpiekunaU: { [Op.eq]: "Oczekiwanie" } },
      include: [
        {
          model: user,
          where: {
            id_opiekunU: req.session.user.id,
          },
        },
        {
          model: komentarze,
          where: { userId: req.session.user.id },
          required: false,
        },
      ],
    });

    res.send(getDays);
  } catch (err) {
    console.log(err);
  }
};
