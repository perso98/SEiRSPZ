'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {

    //admin
    await queryInterface.bulkInsert(
      'users',
      [
        {
          login: 'admin3',
          haslo: await bcrypt.hash('admin', 10),
          isStudent: 0,
          confirmation: 1,
          isAdmin: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

 // Wstawienie listy kierunków (bez id, które jest automatycznie generowane)
    await queryInterface.bulkInsert(
      'listakierunkows',
      [
        { nazwa: 'Informatyka', createdAt: new Date(), updatedAt: new Date() },
        { nazwa: 'Budownictwo', createdAt: new Date(), updatedAt: new Date() },
        { nazwa: 'Mechanika i budowa maszyn', createdAt: new Date(), updatedAt: new Date() },
        { nazwa: 'Administracja', createdAt: new Date(), updatedAt: new Date() },
        { nazwa: 'Ekonomia', createdAt: new Date(), updatedAt: new Date() },
        { nazwa: 'Filologia polska', createdAt: new Date(), updatedAt: new Date() },
        { nazwa: 'Filologia angielska', createdAt: new Date(), updatedAt: new Date() },
        { nazwa: 'Kosmetologia', createdAt: new Date(), updatedAt: new Date() },
        { nazwa: 'Logistyka', createdAt: new Date(), updatedAt: new Date() },
        { nazwa: 'Pedagogika', createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );

    // Pobranie ID kierunku "Informatyka"
    const kierunki = await queryInterface.sequelize.query(
      `SELECT id FROM listakierunkows WHERE nazwa = 'Informatyka'`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const informatykaId = kierunki[0].id;

    // Wstawienie specjalności związanych z Informatyką
    await queryInterface.bulkInsert(
      'listaspecjalnoscis',
      [
        {
          nazwa: 'Projektowanie baz danych i oprogramowanie użytkowe',
          createdAt: new Date(),
          updatedAt: new Date(),
          listaKierunkowId: informatykaId,
        },
        {
          nazwa: 'Modelowanie 3D w zastosowaniach medycznych, prototypowaniu i mediach interaktywnych',
          createdAt: new Date(),
          updatedAt: new Date(),
          listaKierunkowId: informatykaId,
        },
        {
          nazwa: 'Administracja systemów i sieci komputerowych',
          createdAt: new Date(),
          updatedAt: new Date(),
          listaKierunkowId: informatykaId,
        },
      ],
      {}
    );

    // Pobranie ID specjalności
    const specjalnosci = await queryInterface.sequelize.query(
      `SELECT id, nazwa FROM listaspecjalnoscis WHERE listaKierunkowId = ${informatykaId}`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const PBDiOU_Id = specjalnosci.find((s) => s.nazwa === 'Projektowanie baz danych i oprogramowanie użytkowe').id;

    // Wstawienie efektów dla specjalności
    await queryInterface.bulkInsert(
      'efektylista',
      [
        {
          nazwa: 'Efekt 1',
          opis: 'Opis Efekt 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          listaSpecjalnosciId: PBDiOU_Id,
        },
      ],
      {}
    );
   
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
