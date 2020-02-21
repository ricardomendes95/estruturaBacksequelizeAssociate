module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('identificacoes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      cdv: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      cmunfg: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cnf: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      cuf: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      dhcont: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      dhemi: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      dhsaient: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      finnfe: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      iddest: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      indfinal: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      indpres: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      mod: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      nnf: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      nfref: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      natop: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      procemi: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      serie: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      tpamb: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      tpemis: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      tpimp: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      dhcont: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      tpnf: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      verproc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      x: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      xjust: {
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
    return queryInterface.dropTable('identificacoes');
  }
};