'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('link_on_folders', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          folder_id: {
            type: Sequelize.UUID,
            references: {model: 'folders', key: 'id'}
          },
          link_id: {
            type: Sequelize.UUID,
            references: {model: 'links', key: 'id'}
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
    return queryInterface.dropTable('link_on_folders');
  }
};