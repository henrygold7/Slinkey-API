'use strict';
module.exports = (sequelize, DataTypes) => {
  var links = sequelize.define('links', {
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
    url: DataTypes.STRING,
    img: DataTypes.STRING,
    headline: DataTypes.STRING
  }, {});
  links.associate = function(models) {
    // associations can be defined here
  };
  return links;
};