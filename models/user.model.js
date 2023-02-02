'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {

  static associate(models) {
    this.belongsTo(models.role)
  }
}

User.init({
  alias: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;

