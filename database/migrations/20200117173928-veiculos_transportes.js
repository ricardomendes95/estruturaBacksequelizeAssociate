module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('veiculos_transportes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      placa: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      uf: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      rntc: {
        type: Sequelize.STRING,
        allowNull: true
      },

      placa_reboque: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      uf_reboque: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      rntc_reboque: {
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable('veiculos_transportes');
  }
};
