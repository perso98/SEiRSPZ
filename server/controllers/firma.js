const {
    user,
    dziennik,
    efektyLista,
    efektyStudent,
    dane,
    firma,
    komentarze,
  } = require("../models");

  exports.getOpiekuni = async (req, res) => {
    const listOpiekun = await user.findAll({
      where: { isOpiekun: 1 },
    });
  
    const listStudentsO = await user.findAll({
      where: {
        [Op.or]: [{ id_opiekunZ: null }, { id_opiekunU: null }],
        [Op.and]: [{ isStudent: 1 }],
      },
    });
  
    res.send(listOpiekun, listStudentsO);
  };


  exports.getOpiekunId = async (req, res) => {
    const id = req.params.id;
  
    const Opiekun = await dane.findOne({
      where: { id: id },
    });
  
    res.send(Opiekun);
  };


  exports.getDane = async (req, res) => {
    const listDane = await dane.findAll();
  
    res.send(listDane);
  };

  exports.getUser = async (req, res) => {
    const listUser = await user.findAll();
  
    res.send(listUser);
  };
  


  exports.getFirma = async (req, res) => {
    const listUser = await firma.findAll();
  
    res.send(listUser);
  };



  exports.createFirma = async (req, res) => {
    const { firmaObject } = req.body;
    try {
      const checkFirma = await firma.findOne({
        where: {
          nazwa: firmaObject.nazwa,
        },
      });
      if (checkFirma == null) {
        const newFirma = await firma.create({
          nazwa: firmaObject.nazwa,
          opis: firmaObject.opis,
        });
  
        res.send({
          message: "Zakład został dodany",
          id: newFirma.id,
        });
      } else {
        res.send({ message: "Jest już taki zakład" });
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  };


  exports.addOpiekunFirma = async (req, res) => {
    const { id, firmaId } = req.body;
    updateOpiekun = await user.update(
      {
        firmaId: firmaId,
      },
      {
        where: { id: id },
      }
    );
    res.send(updateOpiekun);
  };

  exports.delOpiekunFirma = async (req, res) => {
    const { id, firmaId } = req.body;
    updateOpiekun = await user.update(
      {
        firmaId: null,
      },
      {
        where: { id: id },
      }
    );
    res.send(updateOpiekun);
  };


  exports.updateFirma = async (req, res) => {
    const { id, changeNazwa } = req.body;
  
    try {
      await firma.update(
        {
          nazwa: changeNazwa,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const editFirma = await firma.findOne({
        where: {
          id: id,
        },
      });
  
      res.send({
        message: "Zmiana przeszła pomyślnie...",
        editNazwa: editFirma.nazwa,
      });
    } catch (err) {
      res.send({ message: err.message });
    }
  };
