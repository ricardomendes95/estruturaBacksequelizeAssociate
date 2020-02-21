module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('enderecos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      municipio: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      uf: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      pais: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      complemento: {
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

  down(queryInterface) {
    return queryInterface.dropTable('enderecos');
  },
};
