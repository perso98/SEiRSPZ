const {
    user,
    dziennik,
    efektyLista,
    efektyStudent,
    dane,
    firma,
    komentarze,
  } = require("../models");
  const { Op } = require("sequelize");

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
    
    const listDane = await dane.findAll({
      include: {
        model: user,
        include: {
          model: firma,
        },
      },
    });
  
    res.send(listDane);
  };

  exports.getUser = async (req, res) => {
    const listUser = await user.findAll();
    res.send(listUser);
  };

  exports.getFirma = async (req, res) => {
    const listUser = await firma.findAll(
    );
  
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
    const { id, isOpiekun, isOpiekunZakl } = req.body;
    updateOpiekun = await user.update(
      {
        firmaId: null,
      },
      {
        where: { id: id },
      }
    );
    if (isOpiekunZakl == 1){
      console.log("Usuwanie")
      await user.update(
        {
          id_opiekunZ: null,
          firmaId: null
        },
        {
          where: { 
            [Op.and]: [
            { id_opiekunZ: id },
            { id_opiekunU: null }
            ]
          }
        }
      )

      await user.update(
        {
          id_opiekunZ: null,
        },
        {
          where: { id_opiekunZ: id },
        }
      )
      
    }
    if (isOpiekun == 1){
      console.log("Usuwanie")
      await user.update(
        {
          id_opiekunU: null,
          firmaId: null
        },
        {
          where: { 
            [Op.and]: [
            { id_opiekunU: id },
            { id_opiekunZ: null }
            ]
          }
        }
      )
      await user.update(
        {
          id_opiekunU: null,
        },
        {
          where: { id_opiekunU: id },
        }
      )
    }

    res.send(updateOpiekun);
  };

  
  exports.addStudentFirma = async (req, res) => {
    const { id, firmaId, idOpiekuna, jakiOpiekun } = req.body;
    console.log(id, firmaId, idOpiekuna, jakiOpiekun )
    if (jakiOpiekun == 1){
      updateStudent = await user.update(
        {
          firmaId: firmaId,
          id_opiekunZ: idOpiekuna
        },
        {
          where: { id: id },
        }
      );
    }
    else {
      updateStudent = await user.update(
        {
          firmaId: firmaId,
          id_opiekunU: idOpiekuna
        },
        {
          where: { id: id },
        }
      );
    }
    
    res.send(updateStudent);
  };

  exports.delStudentFirma = async (req, res) => {
    const { id, jakiOpiekun } = req.body;
    if (jakiOpiekun == 1){
    updateOpiekun = await user.update(
      {
        id_opiekunZ: null,
      },
      {
        where: { id: id },
      }
    );
    
    }
    else{
      updateOpiekun = await user.update(
        {
          id_opiekunU: null,
        },
        {
          where: { id: id },
        }
      );
    }
    await user.update(
      {
        firmaId: null,
      },
      {
        where: { 
          id: id ,
          id_opiekunZ: null,
          id_opiekunU: null,
        },
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


  exports.deleteFirmaId = async (req, res) => {
    const { id } = req.params.id;
  
    try {
      await firma.delete(
        {
          where: {
            id: id,
          },
        }
      );
  
      res.send({
        message: "Pomyślnie usunięto",
      });
    } catch (err) {
      res.send({ message: err.message });
    }
  };


  exports.updateStudentPorozumienie = async (req, res) => {
    const { id, changeNP, changeCTP, changePO, changePD, changeDP } = req.body;
  console.log(id)

    try {
      if(changeNP == "")
      {
        await dane.update(
          {
            numerPorozumienia:null,
            czasTrwaniaPraktyki:changeCTP,
            porozumienieOd:changePO,
            porozumienieDo:changePD,
            dataPorozumienia: changeDP,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      else{
        await dane.update(
          {
            numerPorozumienia:changeNP,
            czasTrwaniaPraktyki:changeCTP,
            porozumienieOd:changePO,
            porozumienieDo:changePD,
            dataPorozumienia: changeDP,
          },
          {
            where: {
              id: id,
            },
          }
        );
      }
      const editStudent = await firma.findOne({
        where: {
          id: id,
        },
      });
  
      res.send({
        message: "Zmiana przeszła pomyślnie...",
        editStudent: editStudent.numerPorozumienia,
      });
    } catch (err) {
      res.send({ message: err.message });
    }
  };