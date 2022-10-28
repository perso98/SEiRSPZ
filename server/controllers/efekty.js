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
    const listEfektyKierunki = await listaKierunkow.findAll({
      include: {
        model: listaSpecjalnosci,
        include: {
          model: efektyLista,
        },
      },
    });
  
    res.send(listEfektyKierunki);
  };

  exports.addKierunek = async (req, res) => {
     const { nazwaKierunku } = req.body;
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
  };

  exports.delKierunek = async (req, res) => {
    const id = req.params.id;
    try {
      await listaKierunkow.destroy({
        where: {
          id: id,
        },
      });
      res.send({ message: "Usunięto" });
    } catch (err) {
      res.send({ message: err.message });
    }
  };

  exports.dodanieSpecjalnosci = async (req, res) => {
    const { nazwaSpecjalnosci, id } = req.body;
   try {
       const newSpecjalnosc = await listaSpecjalnosci.create({
         nazwa: nazwaSpecjalnosci,
         listaKierunkowId: id
       });
       res.send({
         message: "Specjalność została pomyślnie dodana",
         id: newSpecjalnosc.id,
       });

   } catch (err) {
     res.send({ message: err.message });
   }
 };

  exports.addEfekt = async (req, res) => {
    const { nazwaEfektu, opisEfektu, id } = req.body;
   try {
       const newEfekt = await efektyLista.create({
         nazwa: nazwaEfektu,
         opis: opisEfektu,
         listaKierunkowId: id
       });
       res.send({
         message: "Efekt został pomyślnie dodany",
         id: newEfekt.id,
       });

   } catch (err) {
     res.send({ message: err.message });
   }
 };

 exports.delEfekt = async (req, res) => {
   const id = req.params.id;
   try {
     await efektyLista.destroy({
       where: {
         id: id,
       },
     });
     res.send({ message: "Usunięto" });
   } catch (err) {
     res.send({ message: err.message });
   }
 };
 