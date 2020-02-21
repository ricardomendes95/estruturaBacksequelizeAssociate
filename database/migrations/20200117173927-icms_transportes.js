module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('icms_transportes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      vserv: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },

      vbcret: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      
      picmsret: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },

      vicmsret: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },

      cfop: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      cmunfg: {
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
    return queryInterface.dropTable('icms_transportes');
  }
};
