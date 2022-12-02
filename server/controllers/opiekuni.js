const { Op } = require("sequelize");
const {
  dziennik,

  efektyStudent,

  komentarze,
} = require("../models");
//pobieranie efektow uczenia dla opiekunow

exports.changeStatusEdit = async (req, res) => {
  const { id, opis, komentarz, status, statusOpiekuna } = req.body;
  const lastStatus = "Last" + statusOpiekuna;
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      await dziennik
        .update(
          {
            [statusOpiekuna]: status,
            opis: opis,
            [lastStatus]: req.session.user.login,
          },
          { where: { id: id } }
        )
        .then(async () => {
          if (komentarz?.length) {
            const comment = await komentarze.create({
              dziennikId: id,
              userId: req.session.user.id,
              komentarz: komentarz,
            });

            await res.send({
              success: true,
              status: statusOpiekuna,
              commentId: comment.id,
              lastOpiekun: req.session.user.login,
            });
          } else
            await res.send({
              success: true,
              status: statusOpiekuna,
              lastOpiekun: req.session.user.login,
            });
        });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      const id = req.params.id;

      await komentarze.destroy({ where: { id: id } }).then(res.send(id));
    }
  } catch (err) {
    console.log(err);
  }
};
exports.downloadFile = async (req, res) => {
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      const name = req.params.name;

      await res.download("./user_files/" + name);
    }
  } catch (err) {
    res.send(err);
  }
};
exports.changeStatus = async (req, res) => {
  const { id, status, statusOpiekuna } = req.body;
  const lastStatus = "Last" + statusOpiekuna;
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      await dziennik
        .update(
          { [statusOpiekuna]: status, [lastStatus]: req.session.user.login },
          { where: { id: id } }
        )
        .then(
          res.send({
            success: true,
            status: statusOpiekuna,
            lastOpiekun: req.session.user.login,
          })
        );
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateEffects = async (req, res) => {
  const { id, opis, status } = req.body;

  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
      await efektyStudent
        .update(
          {
            komentarz: opis,
            status: status,
          },
          {
            where: {
              id: id,
            },
          }
        )
        .then(res.send({ opis: opis, status: status }));
    }
  } catch (err) {
    res.send(err);
  }
};
