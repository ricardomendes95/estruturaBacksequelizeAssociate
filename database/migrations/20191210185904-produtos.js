module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('produtos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      referencia: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      codigo_fornecedor: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      unidade_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: {
            tableName: 'unidades',
          },
        },
      },

      unidade_fornecedor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: 'id',
          model: {
            tableName: 'unidades',
          },
        },
      },

      quantidade: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: false,
      },

      quantidade_fornecedor: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
      },

      ncm: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cest: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      grupo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: 'id',
          model: {
            tableName: 'grupos',
          },
        },
      },

      subgrupo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: 'id',
          model: {
            tableName: 'subgrupos',
          },
        },
      },

      departamento_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: 'id',
          model: {
            tableName: 'departamentos',
          },
        },
      },

      preco_custo: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },

      preco_venda: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },

      margem: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },

      peso_liquido: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },

      peso_bruto: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },

      produto_balanca: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      etiqueta_balanca: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cst_csosn: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cfop_entrada: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      cfop_saida: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      cst_pis_cofins_entrada: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cst_pis_cofins_saida: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      natureza_receita: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      pis_entrada: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },

      pis_saida: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },

      cofins_entrada: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },

      cofins_saida: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },

      cst_ipi_entrada: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cst_ipi_saida: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      ipi_entrada: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      ipi_saida: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },

      ipi_enquadramento: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      tipo_mercadoria: {
        type: Sequelize.ENUM('REVENDA', 'SERVICO', 'PRODUTO_ACABADO', 'MATERIA_PRIMA'),
        allowNull: true,
      },

      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    return queryInterface.dropTable('produtos');
  },
};
