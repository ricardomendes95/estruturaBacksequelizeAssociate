module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nome_razao: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      fantasia: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      cnpj_cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      ie_rg: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      inscricao_municipal: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email_secundario: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      celular: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      nome_contato: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      endereco_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          key: 'id',
          model: {
            tableName: 'enderecos',
          },
        },
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
    return queryInterface.dropTable('clientes');
  },
};
