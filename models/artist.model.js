'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Artist extends Model {
  static associate(models) {
    
  }
}
Artist.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  sequelize,
  modelName: 'artist',
});

module.exports = Artist;
