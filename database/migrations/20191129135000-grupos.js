module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('grupos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    return queryInterface.dropTable('grupos');
  },
};
