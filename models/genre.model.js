'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Genre extends Model {
  static associate(models) {
    this.hasOne(models.musictrack)
  }
}
Genre.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  sequelize,
  modelName: 'genre',
});

module.exports = Genre;
