'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Trade, { foreignKey: 'shareId' });

    }
  }
  Share.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Z]{3}$/
      }
    },
    rate: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Share',
    tableName: 'shares'
  });

  Share.sync({});

  return Share;
};