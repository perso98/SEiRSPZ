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
} = require("../models");

const { Op } = require("Sequelize");

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
  