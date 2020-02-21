module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('cfops', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      cfop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },

      descricao: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('cfops');
  },
};
