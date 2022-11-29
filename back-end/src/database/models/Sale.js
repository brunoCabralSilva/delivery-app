import {STRING, INTEGER, MODEL, DataTypes } from 'sequelize';
import db from '.';

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */

const saleSchema=(Sequelize, DataTypes) => {
  const Sales = Sequelize.define('Sales', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,  
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    delivery_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sale_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }},
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    });

    Sales.associate = (models) => { Sales.belongsTo(
      models.User, 
      { foreignKey: "user_id", as: "users" },
      { foreignKey: "seller_id", as: "sellers" }); 
    return Sales;
}
}

module.exports = saleSchema;
