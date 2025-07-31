'use strict';
const fs = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let bookGenres = JSON.parse(await fs.readFile('./data/bookGenres.json', 'utf-8'))

    bookGenres = bookGenres.map(el => {
      el.createdAt = el.updatedAt = new Date()

      return el
    })

    // console.log(bookGenres);

    await queryInterface.bulkInsert('BookGenres', bookGenres, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('BookGenres', null, {});
  }
};
