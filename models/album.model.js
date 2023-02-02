'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Album extends Model {
  static associate(models) {
    this.belongsTo(models.artist)
    this.hasOne(models.musictrack)
  }
}
Album.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: DataTypes.STRING
}, {
  sequelize,
  modelName: 'album',
});

module.exports = Album;
