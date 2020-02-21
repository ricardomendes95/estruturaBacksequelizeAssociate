module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cartoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      caut: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      tband: {
        type: Sequelize.DECIMAL(15,2),
        allowNull: true,
      },

      tpintegra: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      pagamento_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'pagamentos',
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
    return queryInterface.dropTable('cartoes');
  }
};
