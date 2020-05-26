module.exports = (sequelize, DataTypes) => sequelize.define('Office',
  {
    nome: DataTypes.STRING,
  },
  {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    freezeTableName: true,
    tableName: 'cargos',
  },
);
