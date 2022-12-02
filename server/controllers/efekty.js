const {
  user,
  dziennik,
  efektyLista,
  efektyStudent,
  dane,
  firma,
  komentarze,
  listaKierunkow,
  listaSpecjalnosci,
} = require("../models");


exports.getEfektyKierunki = async (req, res) => {
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
    const listEfektyKierunki = await listaKierunkow.findAll({
      include: {
        model: listaSpecjalnosci,
        include: {
          model: efektyLista,
        },
      },
    });
  
    res.send(listEfektyKierunki);
  }}
  catch (err) {
  console.log(err);
  }
  };

  exports.addKierunek = async (req, res) => {
     const { nazwaKierunku } = req.body;
     try {
      if (!req.session.user)
        res.send({ message: "Sesja utracona, zaloguj się ponownie" });
      else {
    try {
        const newKierunek = await listaKierunkow.create({
          nazwa: nazwaKierunku,
        });
        res.send({
          message: "Kierunek został pomyślnie dodany",
          id: newKierunek.id,
        });

    } catch (err) {
      res.send({ message: err.message });
    }
  }
}
catch (err) {
console.log(err);
}
  };

  exports.delKierunek = async (req, res) => {
    const id = req.params.id;
    try {
      if (!req.session.user)
        res.send({ message: "Sesja utracona, zaloguj się ponownie" });
      else {
    try {
      await listaKierunkow.destroy({
        where: {
          id: id,
        },
      });

      const listEfektyKierunki = await listaKierunkow.findAll({
        include: {
          model: listaSpecjalnosci,
          include: {
            model: efektyLista,
          },
        },
      });

      res.send({ 
        message: "Usunięto",
        lista: listEfektyKierunki,
      });
    } catch (err) {
      res.send({ message: err.message });
    }
  }
}
catch (err) {
console.log(err);
}
  };

  exports.dodanieSpecjalnosci = async (req, res) => {
    const { nazwaSpecjalnosci, id } = req.body;
    try {
      if (!req.session.user)
        res.send({ message: "Sesja utracona, zaloguj się ponownie" });
      else {
   try {
       const newSpecjalnosc = await listaSpecjalnosci.create({
         nazwa: nazwaSpecjalnosci,
         listaKierunkowId: id
       });

       const listEfektyKierunki = await listaKierunkow.findAll({
        include: {
          model: listaSpecjalnosci,
          include: {
            model: efektyLista,
          },
        },
      });

       res.send({
         message: "Specjalność została pomyślnie dodana",
         id: newSpecjalnosc.id,
         lista: listEfektyKierunki
       });

   } catch (err) {
     res.send({ message: err.message });
   }
  }
}
catch (err) {
console.log(err);
}
 };

 exports.delSpecjalnosc = async (req, res) => {
  const id = req.params.id;
  try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
  console.log(id)
  try {
    await listaSpecjalnosci.destroy({
      where: {
        id: id,
      },
    });
    console.log("QQQQQQQQQQQQQQQ")
    const listEfektyKierunki = await listaKierunkow.findAll({
      include: {
        model: listaSpecjalnosci,
        include: {
          model: efektyLista,
        },
      },
    });

    res.send({ 
      message: "Usunięto",
      lista: listEfektyKierunki,
    });
  } catch (err) {
    res.send({ message: err.message });
  }
}
}
catch (err) {
console.log(err);
}
};



  exports.addEfekt = async (req, res) => {
    const { nazwaEfektu, opisEfektu, id } = req.body;
    try {
      if (!req.session.user)
        res.send({ message: "Sesja utracona, zaloguj się ponownie" });
      else {
   try {
      const efektId = await efektyLista.create({
         nazwa: nazwaEfektu,
         opis: opisEfektu,
         listaSpecjalnosciId: id
       });

       const listEfektyKierunki = await listaKierunkow.findAll({
        include: {
          model: listaSpecjalnosci,
          include: {
            model: efektyLista,
          },
        },
      });
    
       res.send({
         message: "Efekt został pomyślnie dodany",
         lista: listEfektyKierunki,
         id: efektId.id,
       });

   } catch (err) {
     res.send({ message: err.message });
   }
  }
}
catch (err) {
console.log(err);
}

 };

 exports.delEfekt = async (req, res) => {
   const id = req.params.id;
   try {
    if (!req.session.user)
      res.send({ message: "Sesja utracona, zaloguj się ponownie" });
    else {
   try {
    await efektyLista.destroy({
       where: {
         id: id,
       },
     });

    const listEfektyKierunki = await listaKierunkow.findAll({
      include: {
        model: listaSpecjalnosci,
        include: {
          model: efektyLista,
        },
      },
    });


    res.send({ 
      message: "Usunięto",
      lista: listEfektyKierunki, 
    });
   } catch (err) {
     res.send({ message: err.message });
   }
  }
}
catch (err) {
console.log(err);
}
 };
 