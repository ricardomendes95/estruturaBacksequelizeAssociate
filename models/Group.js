module.exports = (sequelize, DataTypes) => sequelize.define('Group',
  {
    nome: DataTypes.STRING,
  },
  {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    freezeTableName: true,
    tableName: 'grupos',
  },
);
