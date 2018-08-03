'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('folders', {
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
          name: {
            type: Sequelize.STRING
          },
          order: {
            allowNull: false,
            autoIncrement: true,
            type: Sequelize.INTEGER
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('folders');
  }
};