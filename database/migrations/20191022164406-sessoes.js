module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('sessoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: 'usuarios',
          },
        },
      },

      token: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },

      ativo: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('sessoes');
  },
};
