'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trade.init({
    portfolioId: DataTypes.INTEGER,
    shareId: DataTypes.INTEGER,
    action: DataTypes.ENUM('BUY', 'SELL'),
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trade',
    tableName: 'trades'
  });
  return Trade;
};