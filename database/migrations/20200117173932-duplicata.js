'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('duplicatas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      ndup: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      dvenc: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      vdup: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      cobranca_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'cobrancas',
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
    return queryInterface.dropTable('duplicata');
  }


};
