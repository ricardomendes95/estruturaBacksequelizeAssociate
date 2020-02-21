
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pis', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      cst: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ppis: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      qbcprod: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      valiqprod: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      
      vbc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vpis: {
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
    return queryInterface.dropTable('pis');
  }
};
