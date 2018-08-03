'use strict';
module.exports = (sequelize, DataTypes) => {
  var folder = sequelize.define('folder', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.UUID,
      references: {model: 'users', key: 'id'}
    },
    name: {
      type: Sequelize.STRING,
    },
    order: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    }

  }, {});
  folder.associate = function(models) {
    // associations can be defined here
  };
  return folder;
};