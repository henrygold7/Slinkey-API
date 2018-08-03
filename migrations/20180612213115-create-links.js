'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('links', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          user_id: {
            type: Sequelize.UUID,
            references: {model: 'users', key: 'id'}
          },
          url: {
            type: Sequelize.STRING
          },
          img: {
            type: Sequelize.STRING
          },
          headline: {
            type: Sequelize.STRING
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('links');
  }
};