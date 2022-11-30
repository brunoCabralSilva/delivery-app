import {STRING, INTEGER, MODEL, DataTypes } from 'sequelize';
import db from '.';

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */

const productSchema=(Sequelize, DataTypes) => {
  const productTable = Sequelize.define('Product', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,  
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
    {
      timestamps: false,
      tableName: 'products',
      underscored: true,
    });
    return productTable;
}

module.exports = productSchema;

