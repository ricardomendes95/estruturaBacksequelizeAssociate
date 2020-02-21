module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('unidades', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      sigla: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      descricao: {
        type: Sequelize.STRING,
      },

      padrao: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    return queryInterface.dropTable('unidades');
  },
};
