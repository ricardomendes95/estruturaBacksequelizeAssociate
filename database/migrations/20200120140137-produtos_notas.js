module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produto_nota', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      cest_opc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cnpjfab_opc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      di: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      detespecifico: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      nve_opc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cbenef_opc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cbenef_opc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cean: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ceantrib: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cprod: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cfop: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      detexport_opc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      indtot: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      margem: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      nfci_opc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      nitemped: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ncm: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      precovenda: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      qcom: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      qtrib: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      rastro_opc: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ucom: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      utrib: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      vdesc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vfrete: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vdesc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      voutro: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vdesc: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vprod: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vseg: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vuncom: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      vuntrib: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },

      xped: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      xprod: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cofins_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          key: 'id',
          model: {
            tableName: 'cofins',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      icms_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          key: 'id',
          model: {
            tableName: 'icms',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      identificacao_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'identificacoes',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      ipi_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          key: 'id',
          model: {
            tableName: 'ipis',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      pis_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          key: 'id',
          model: {
            tableName: 'pis',
          },
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      produto_id: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: {
            tableName: 'produtos',
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
    return queryInterface.dropTable('produto_nota');
  }
};
