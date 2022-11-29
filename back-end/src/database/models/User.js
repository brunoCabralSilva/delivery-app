import {STRING, INTEGER, MODEL, DataTypes } from 'sequelize';
import db from '.';

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */

const userSchema=(Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }},
    {
      timestamps: false,
      tableName: 'users',
    });
    User.associate = (models) => {
      User.hasMany(models.Sales,
        { foreignKey: 'user_id', as: 'users'},
        { foreignKey: 'seller_id', as: 'sellers'},
        );
    }

    return User;
}

module.exports = userSchema;


// {
//   "authorId": 2,
//   "name": "Rachel de Queiroz",
//   "books": [
//   {
//   "title": "O Quinze",
//   "releaseYear": 1930
//   },
//   {
//   "title": "As três marias",
//   "releaseYear": 1939
//   }
//   ]
//   } 