'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('People', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});

    await queryInterface.bulkInsert(
      "users",
      [
        {
          login: "admin",
          password: await bcrypt.hash("admin", 10),
          active: 1,
          edit:1,
          add: 1,
          delete: 1,
          power: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
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
