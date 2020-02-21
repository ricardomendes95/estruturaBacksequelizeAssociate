module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cargo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: 'id',
          model: {
            tableName: 'cargos',
          },
        },
      },

      ativo: {
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
    return queryInterface.dropTable('usuarios');
  },
};
