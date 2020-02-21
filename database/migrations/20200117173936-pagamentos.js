module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pagamentos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      indpag: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      tpag: {
        type: Sequelize.STRING(2),
        allowNull: true,
      },

      vpag: {
        type: Sequelize.DECIMAL(15,2),
        allowNull: true,
      },

      vtroco: {
        type: Sequelize.DECIMAL(15,2),
        allowNull: true,
      },

      nota_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          key: 'id',
          model: {
            tableName: 'notas',
          },
        },
      },

      criado_em: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      atualizado_em: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pagamento');
  }
};
