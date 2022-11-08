const bcrypt = require("bcrypt");
const {
  user,
  dziennik,
  efektyLista,
  efektyStudent,
  dane,
  firma,
  komentarze,
  zastepstwa,
  dzienZalaczniki,
} = require("../models");

const { Op } = require("sequelize");

  exports.getListaOpiekunow = async (req, res) => {

    const listDziennik = await dane.findAll({
       
      include: {
        model: user,
        where: { isOpiekun: { [Op.ne]: 0 } },
      },
    });

    // const listDziennik2 = await dane.findAll({
    //     include: {
    //         model: user,
    //       },
       
    // });
  
    res.send(listDziennik);
  };

  exports.getListaZastepstw = async (req, res) => {
    // const listZastepstw = await dane.findAll({
    //   include: {
    //     model: user,
    //     where: { isOpiekun: { [Op.ne]: 0 } },
    //   },
    // });
    const table = []
    try{
      const listZastepstw = await zastepstwa.findAll({
        where:{idDyrektora: req.session.user.id}
      })
      
      listZastepstw.forEach(async element => {
        table.push(await dane.findOne({ 
          attributes: ['imie', 'nazwisko'],
          include: {
            model: user,
            where: { id: element.userId },
          },
        }))
      }
      )
      console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQ")
      console.log(table)
    }catch (err) {
      res.send({ message: err.message });
    }
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQ")
    console.log(table)
    res.send(table);
  };

  exports.dodanieZastepstwa = async (req, res) => {
    const id = req.params.id;

    const listZastepstw = await zastepstwa.create({
      idDyrektora: req.session.user.id,
      userId: id,
    });
  
    res.send(listZastepstw);
  };

  exports.usuwanieZastepstwa = async (req, res) => {
    const id = req.params.id;
    try {
      await zastepstwa.destroy({
        where: {
          [Op.and]: [
            {idDyrektora: req.session.user.id},
            {userId: id},
          ]
        }
      });
      res.send({ message: "Usunięto" });
    } catch (err) {
      res.send({ message: err.message });
    }
  
  };
  
  
  

  //========================================================================      OpiekuniU

  exports.getEffectsOpiekunU = async (req, res) => {
    const id = req.params.id;
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    try {
      const getEffects = await user.findAll({
        where: {
          id_opiekunU: id,
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
    const id = req.params.id;
    try {
      if (!req.session.user)
        res.send({ message: "Sesja utracona, zaloguj się ponownie" });
      else {
        const getDays = await dziennik.findAll({
          where: { statusOpiekunaU: { [Op.ne]: "Oczekiwanie" } },
  
          include: [
            {
              model: user,
              where: {
                id_opiekunU: id,
              },
            },
            {
              model: komentarze,
              where: { userId: id },
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
  
  exports.getDaysOpiekunU = async (req, res) => {
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
    const id = req.params.id;
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
    console.log(id)
    try {
      if (!req.session.user)
        res.send({ message: "Sesja utracona, zaloguj się ponownie" });
      else {
        const getDays = await dziennik.findAll({
          where: { statusOpiekunaU: { [Op.eq]: "Oczekiwanie" } },
          include: [
            {
              model: user,
              where: {
                id_opiekunU: id,
              },
            },
            {
              model: komentarze,
              where: { userId: id },
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


  //=============================================   Opiekuni

  exports.changeStatusEdit = async (req, res) => {
    const { id, opis, komentarz, status, statusOpiekuna } = req.body;
  
    try {
      if (!req.session.user)
        res.send({ message: "Sesja utracona, zaloguj się ponownie" });
      else {
        await dziennik
          .update({ [statusOpiekuna]: status, opis: opis }, { where: { id: id } })
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
              });
            } else
              await res.send({
                success: true,
                status: statusOpiekuna,
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
    try {
      if (!req.session.user)
        res.send({ message: "Sesja utracona, zaloguj się ponownie" });
      else {
        await dziennik
          .update({ [statusOpiekuna]: status }, { where: { id: id } })
          .then(res.send({ success: true, status: statusOpiekuna }));
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
  