module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('codigos_barras', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      produto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: 'produtos',
          },
        },
      },

      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      principal: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      quantidade: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
      },

      preco: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
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

  down(queryInterface) {
    return queryInterface.dropTable('codigos_barras');
  },
};
