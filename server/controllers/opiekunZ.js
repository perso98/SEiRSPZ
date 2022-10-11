const { Op } = require("sequelize");
const {
  user,
  dziennik,
  efektyLista,
  efektyStudent,
  dane,
  firma,
  komentarze,
  dzienZalaczniki,
} = require("../models");
//pobieranie efektow uczenia dla opiekunow

exports.getDaysOpiekunZStatus = async (req, res) => {
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      const getDays = await dziennik.findAll({
        where: { statusOpiekunaZ: { [Op.ne]: "Oczekiwanie" } },
        include: [
          {
            model: user,
            where: {
              id_opiekunZ: req.session.user.id,
            },
          },
          {
            model: komentarze,
            where: { userId: req.session.user.id },
            required: false,
          },
          {
            model: dzienZalaczniki,
            required: false,
          },
        ],
      });

      res.send(getDays);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getDaysOpiekunZ = async (req, res) => {
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      const getDays = await dziennik.findAll({
        where: { statusOpiekunaZ: { [Op.eq]: "Oczekiwanie" } },
        include: [
          {
            model: user,
            where: {
              id_opiekunZ: req.session.user.id,
            },
          },
          {
            model: komentarze,
            where: { userId: req.session.user.id },
            required: false,
          },
          {
            model: dzienZalaczniki,
            required: false,
          },
        ],
      });

      res.send(getDays);
    }
  } catch (err) {
    console.log(err);
  }
};
