import {STRING, INTEGER, MODEL, DataTypes } from 'sequelize';
import db from '.';

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */

const salesProductSchema=(Sequelize, DataTypes) => {
  const SalesProducts = Sequelize.define('SalesProducts', {
    sale_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    product_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }},
    {
      timestamps: false,
      tableName: 'salesProducts',
      underscored: true,
    });
    SalesProducts.associate = (models) => {
      models.Products.belongsToMany(models.Sales, {
        as: 'sales',
        through: SalesProducts,
        foreignKey: 'product_id',
        otherKey: 'sale_id'
      });
      models.Sales.belongsToMany(models.Products, {
        as: 'products',
        through: SalesProducts,
        foreignKey: 'sale_id',
        otherKey: 'product_id'
      });
      
    }
    return SalesProducts;
}

module.exports = salesProductSchema;

