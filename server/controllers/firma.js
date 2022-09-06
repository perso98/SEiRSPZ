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
    const { id, jakiOpiekun } = req.body;
    console.log("Usuwanko")
    console.log(jakiOpiekun)
    updateOpiekun = await user.update(
      {
        firmaId: null,
      },
      {
        where: { id: id },
      }
    );
    if (jakiOpiekun == 1){
      await user.update(
        {
          id_opiekunZ: null,
        },
        {
          where: { id_opiekunZ: id },
        }
      )
    }
    if (jakiOpiekun == 0){
      console.log("Usuwanko")
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
    console.log(jakiOpiekun)
    console.log(idOpiekuna)
    if (jakiOpiekun == 1){
      console.log(firmaId)
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
      console.log(firmaId)
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
    console.log(jakiOpiekun)
    if (jakiOpiekun == 1){
      console.log("111111111111UsuwanieZ")
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
      console.log("111111111111UsuwanieU")
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
