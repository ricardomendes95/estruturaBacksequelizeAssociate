module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transportes_notas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      modfrete: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      transportadora_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'transportadoras',
          },
        },
      },

      veiculo_transporte_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'veiculos_transportes',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      icms_transporte_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'icms_transportes',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      volumes_nota_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'volumes_notas',
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
    return queryInterface.dropTable('transportes_notas');
  }
};
