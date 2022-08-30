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

exports.getDaysOpiekunUStatus = async (req, res) => {
  try {
    const getDays = await dziennik.findAll({
      where: { statusOpiekunaU: { [Op.ne]: "Oczekiwanie" } },
      include: {
        model: user,
        where: {
          id_opiekunU: req.session.user.id,
        },
      },
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
      include: { model: user, where: { id_opiekunU: req.session.user.id } },
    });

    res.send(getDays);
  } catch (err) {
    console.log(err);
  }
};
