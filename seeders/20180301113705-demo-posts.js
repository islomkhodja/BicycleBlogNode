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
   return queryInterface.bulkInsert('posts', [{
      post_title:       chance.sentence({words: 5}),
      post_content:      `<p>
            ${chance.paragraph({sentences: 7})}
          </p>
          <p>
          ${chance.paragraph({sentences: 7})}
          </p>
          <p>
          ${chance.paragraph({sentences: 7})}
          </p>`,
      url_slug:        chance.word(),
      post_type:       "post",
      post_status:   "publish",
      post_created_time:  new Date(),
      post_modified_time: new Date(),
      userUserId: 1
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
