'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Portfolio, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });      
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    balance: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};