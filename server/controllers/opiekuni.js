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

exports.changeStatusEdit = async (req, res) => {
  const { id, opis, komentarz, status, statusOpiekuna } = req.body;
  try {
    await dziennik
      .update({ [statusOpiekuna]: status, opis: opis }, { where: { id: id } })
      .then(async () => {
        if (komentarz.length > 2)
          await komentarze.create({
            dziennikId: id,
            userId: req.session.user.id,
            komentarz: komentarz,
          });
      })
      .then(res.send({ success: true, status: statusOpiekuna }));
  } catch (err) {
    console.log(err);
  }
};

exports.changeStatus = async (req, res) => {
  const { id, status, statusOpiekuna } = req.body;
  try {
    await dziennik
      .update({ [statusOpiekuna]: status }, { where: { id: id } })
      .then(res.send({ success: true, status: statusOpiekuna }));
  } catch (err) {
    console.log(err);
  }
};
