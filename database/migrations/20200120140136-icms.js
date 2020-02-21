
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('icms', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      cst: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ufst: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      modbc: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      modbcst: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      motdesicms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      orig: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      pbcop: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      pcredsn: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      pdif: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      pfcp: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      pfcpst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      pfcpstret: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      picms: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      picmsst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      pmvast: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      predbc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      predbcst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      pst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vbc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vbcfcp: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      
      vbcfcpst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vbcfcpstret: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vbcst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      
      vbcstdest: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vbcstret: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vcredicmssn: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vfcp: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vfcpst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vfcpstret: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vicms: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vicmsdeson: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vicmsdif: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vicmsop: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vicmsst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vicmsstdest: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vicmsstret: {
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
    return queryInterface.dropTable('icms');
  }
};
