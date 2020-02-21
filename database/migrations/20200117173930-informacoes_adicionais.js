module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('informacoes_adicionais', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      infadfisco: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ifcpl: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      xcampo: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      xtexto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nproc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      indproc: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('informacoes_adicionais');
  }
};
