const bcrypt = require("bcrypt");
const {
  user,
  dziennik,
  efektyLista,
  efektyStudent,
  dane,
  firma,
  komentarze,
  listaKierunkow,
} = require("../models");

exports.changePasswordToAccount = async (req, res) => {
  const { changePassword, changePassword2 } = req.body;
  if (changePassword == changePassword2) {
    const hashedPassword = await bcrypt.hash(changePassword, 10);
    await user.update(
      { haslo: hashedPassword },
      { where: { login: req.session.user.login } }
    );
    res.send({ message: "Pomyślnie zmieniono hasło do konta" });
  } else res.send({ message: "Hasła się nie zgadzają" });
};

exports.changeDaneToAccount = async (req, res) => {
  const { imie, nazwisko, studia, kierunek, specjalnosc, rokStudiow, rodzajStudiow, telefon } = req.body;

    // First try to find the record

   const foundItem = await user.findOne({
    where: {login: req.session.user.login}})

  if (foundItem.daneId == null) {
    try{
      const createDane = await dane.create({ 
        imie: imie,
        nazwisko: nazwisko,
        studia: studia,
        kierunek: kierunek, 
        specjalnosc: specjalnosc, 
        rok_studiow: rokStudiow, 
        rodzaj_studiow: rodzajStudiow, 
        telefon: telefon, 
      })
      
      await user.update({ 
        daneId: createDane.id,
      },{ 
        where: { id: foundItem.id} 
      })

      const numerKuerunku = await listaKierunkow.findOne({ 
        where: { nazwa: specjalnosc} 
     })
      const listaEfektow = await efektyLista.findAll({ 
         where: { listaKierunkowId: numerKuerunku} 

      })
      listaEfektow.forEach(element => {
        console.log(element)
        // const createEfektyEmpty = await efektyStudent.create({ 
        //   efektyListumId: element,
        //   userId: req.session.user.id,

        // })
      });
        // const createEfektyEmpty = await efektyStudent.create({ 
        //   efektyListumId: ,
        //   userId: req.session.user.id,

        // })
      res.send({ message: "Pomyślnie zmieniono dane do konta" ,
      updateDane: createDane});
    }
    catch (err) {
      res.send({ message: err.message });
    }
  }
    else{
      try{
        const updateDane = await dane.update({ 
          imie: imie,
          nazwisko: nazwisko,
          studia: studia,
          kierunek: kierunek, 
          specjalnosc: specjalnosc, 
          rok_studiow: rokStudiow, 
          rodzaj_studiow: rodzajStudiow, 
          telefon: telefon, 
          },
          { where: { id: foundItem.daneId } }
        );

        const numerKierunku = await listaKierunkow.findOne({ 
          where: { nazwa: specjalnosc} 
        })
        const listaEfektow = await efektyLista.findAll({ 
          where: { listaKierunkowId: numerKierunku.id} 
        })

        
        await efektyStudent.destroy({ 
          where:{userId: req.session.user.id,}
        })
        listaEfektow.forEach(async element => {

          await efektyStudent.create({ 
            efektyListumId: element.id,
            userId: req.session.user.id,

          })
        });
        
          // const createEfektyEmpty = await efektyStudent.create({ 
          //   efektyListumId: ,
          //   userId: req.session.user.id,

          // })
        res.send({ message: "Pomyślnie zmieniono dane do konta",
        updateDane: updateDane });
      }
      catch (err) {
        res.send({ message: err.message });
      }
    }
    
};

exports.getloginToAccount = async (req, res) => {
  if (req.session.user) {
    res.send({ logged: true, user: req.session.user });
  } else {
    res.send({ logged: false });
  }
};

exports.loginToAccount = async (req, res) => {
  const { login, password } = req.body;

  const checkLogin = await user.findOne({
    where: {
      login: login,
    },
  });
  if (!checkLogin) {
    res.send({
      message: "Błędny login lub hasło",
    });
  }
  if (checkLogin) {
    if (await bcrypt.compare(password, checkLogin.haslo)) {
      req.session.user = checkLogin;
      req.session.logged = true;
      res.send({
        logged: true,
        user: checkLogin,
      });
    } else {
      res.send({
        message: "Błędny login lub hasło",
      });
    }
  }
};

exports.logoutFromAccount = async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie("user");
    res.end();
  }
};

exports.createAccount = async (req, res) => {
  const { login, password, password2 } = req.body;
  const loginChecker = await user.findOne({
    where: {
      login: login,
    },
  });

  if (!loginChecker) {
    if (password == password2) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await user.create({
        login: login,
        haslo: hashedPassword,
      });

      res.send({
        message: "Konto zostało pomyślnie utworzone",
        register: true,
      });
    } else
      res.send({
        message: "Hasła się nie zgadzają",
      });
  } else
    res.send({
      message: "Niestety taki e-mail jest już zajęty",
    });
};

exports.getListaKierunkow = async (req, res) => {
    const lista = await listaKierunkow.findAll();
  res.send(lista);
};

exports.getUserSesionId = async (req, res) => {
  const lista = await user.findOne(
    {where: {id: req.session.user.id}}
  );
  const userDane = await dane.findOne({
    where: { id: lista.daneId },
  });


res.send(userDane);
};

