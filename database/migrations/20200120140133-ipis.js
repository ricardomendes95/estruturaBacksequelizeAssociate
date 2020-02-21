
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ipis', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      cst: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cnpjprod: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cenq: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cselo: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      pipi: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      qselo: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      qunid: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      
      vbc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vipi: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vunid: {
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
    return queryInterface.dropTable('ipis');
  }
};
