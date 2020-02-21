module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('B', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      a_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: 'A',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('B');
  }
};
