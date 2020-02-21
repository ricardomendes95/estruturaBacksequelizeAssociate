module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('icms_totais', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      vbc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vbcst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vcofins: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vdesc: {
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

      vfcpufdest_opc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vfcpufdest_opc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vfrete: {
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

      vicmsufdest_opc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vicmsufremet_opc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vii: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vipi: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vipidevol: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vnf: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      voutro: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vpis: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      
      vprod: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vst: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vseg: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vtottrib: {
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

  down: (queryInterface) => {
    return queryInterface.dropTable('icms_totais');
  }
};
