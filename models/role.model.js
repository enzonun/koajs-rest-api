// 'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Role extends Model {

  static associate(models) {
    this.hasOne(models.user)
  }
  
}

Role.init({
  rolename: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: DataTypes.STRING,
  another: DataTypes.STRING
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'role' // We need to choose the model name
});

module.exports = Role;
