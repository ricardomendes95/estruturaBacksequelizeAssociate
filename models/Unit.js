module.exports = (sequelize, DataTypes) => sequelize.define('Unit',
  {
    sigla: DataTypes.STRING,
    descricao: DataTypes.STRING,
    padrao: DataTypes.BOOLEAN,
  },
  {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    freezeTableName: true,
    tableName: 'unidades',
  },
);
