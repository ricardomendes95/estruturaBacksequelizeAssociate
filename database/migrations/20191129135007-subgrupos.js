module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('subgrupos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      grupo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: 'grupos',
          },
        },
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
    return queryInterface.dropTable('subgrupos');
  },
};
