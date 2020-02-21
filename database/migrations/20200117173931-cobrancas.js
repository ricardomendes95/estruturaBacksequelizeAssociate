module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cobrancas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nfat: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      vorig: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vdesc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vliq: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
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
    return queryInterface.dropTable('cobrancas');
  }
};
