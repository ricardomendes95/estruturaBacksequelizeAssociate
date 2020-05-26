module.exports = (sequelize, DataTypes) => sequelize.define('Department',
  {
    nome: DataTypes.STRING,
  },
  {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    freezeTableName: true,
    tableName: 'departamentos',
  },
);
