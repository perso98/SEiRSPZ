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
    // const listDziennik = await dane.findAll({
       
    //   include: {
    //     model: user,
    //     as: 'user',
    //     where: { isOpiekun: { [Op.ne]: 0 } },
    //   },
    // });

    const listDziennik2 = await dane.findAll({
        include: {
            model: user,
          },
       
    });
  
    res.send(listDziennik2);
  };


  exports.getListaZastepstw = async (req, res) => {
    const listZastepstw = await zastepstwa.findAll({
      
    });
  
    res.send(listZastepstw);
  };
