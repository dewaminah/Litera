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
    let genres = JSON.parse(await fs.readFile('./data/genres.json', 'utf-8'))

    genres = genres.map(el => {
      el.createdAt = el.updatedAt = new Date()

      return el
    })

    // console.log(genres);

    await queryInterface.bulkInsert('Genres', genres, {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Genres', null, {});
  }
};
