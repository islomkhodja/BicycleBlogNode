'use strict';
var chance = require('chance');
var md5 = require('md5');
var config = require('../config/config.json');

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
            user_name: config.app.admin.username,
            user_email: config.app.admin.email,
            user_pass: md5(config.app.admin.password),
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
