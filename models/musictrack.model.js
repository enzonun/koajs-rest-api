'use strict';

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Musictrack extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.genre)
    this.belongsTo(models.album)
  }
}
Musictrack.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  composer: DataTypes.STRING,
  description: DataTypes.STRING
}, {
  sequelize,
  modelName: 'musictrack',
});

module.exports = Musictrack;