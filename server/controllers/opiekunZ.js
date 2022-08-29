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
