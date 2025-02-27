"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Teachers", [
      {
        email: "teacherken@gmail.com",
      },
      {
        email: "teacherjoe@gmail.com",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Teachers", null, {});
  },
};
