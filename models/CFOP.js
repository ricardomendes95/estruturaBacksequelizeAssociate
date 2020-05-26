module.exports = (sequelize, DataTypes) => sequelize.define('CFOP',
  {
    cfop: DataTypes.INTEGER,
    descricao: DataTypes.STRING,
  },
  {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    freezeTableName: true,
    tableName: 'cfops',
  },
);
