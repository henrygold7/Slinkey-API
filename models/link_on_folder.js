'use strict';
module.exports = (sequelize, DataTypes) => {
  var link_on_folder = sequelize.define('link_on_folders', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    link_id: {
      type: Sequelize.UUID,
      references: {model: 'links', key: 'id'}
    },
    folder_id: {
      type: Sequelize.UUID,
      references: {model: 'folders', key: 'id'}
    },
    order: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    }
  }, {});
  link_on_folder.associate = function(models) {
    // associations can be defined here
  };
  return link_on_folder;
};