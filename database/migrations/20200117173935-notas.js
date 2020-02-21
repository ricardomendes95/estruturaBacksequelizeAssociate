'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('notas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      chave: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },

      vtottrib: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ismanual: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },

      type_note: {
        type: Sequelize.STRING,
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

      fornecedor_id: {
        type: Sequelize.INTEGER, 
        references: {
          key: 'id',
          model: {
            tableName: 'fornecedores',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      icms_total_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          key: 'id',
          model: {
            tableName: 'icms_totais',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      identificacao_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          key: 'id',
          model: {
            tableName: 'identificacoes',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      transporte_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'transportes_notas',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      inf_adic_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'informacoes_adicionais',
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
    return queryInterface.dropTable('notas');
  }
};
