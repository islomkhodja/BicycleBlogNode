'use strict';
var chance = require('chance');
var md5 = require('md5');


chance = new chance();

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('users', [{
            user_name: "Islomkhodja",
            user_email: "hamidullakhodjaev@gmail.com",
            user_pass: md5("test"),
            user_register_time: new Date()
        }, {
          user_name: "Hamidullakhodja",
          user_email: "toshkentmetro@gmail.com",
          user_pass: md5("test"),
          user_register_time: new Date()
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   
   return queryInterface.bulkDelete('users', null, {});
  }
};
