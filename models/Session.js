module.exports = (sequelize, DataTypes) => sequelize.define('Session',
  {
    usuario_id: DataTypes.INTEGER,
    token: DataTypes.UUID,
    ativo: DataTypes.BOOLEAN,
  },
  {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    freezeTableName: true,
    tableName: 'sessoes',
  },
);
