/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
module.exports = (Sequelize, DataTypes) => {
  const Sale = Sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
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
    },
  }, {
    tableName: 'sales',
    timestamps: false,
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    Sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'sellers' });
  };

  return Sale;
};
