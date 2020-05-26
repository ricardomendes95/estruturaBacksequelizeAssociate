module.exports = (sequelize, DataTypes) => sequelize.define('User',
  {
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    cargo_id: DataTypes.INTEGER,
    ativo: DataTypes.BOOLEAN,
  },
  {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    freezeTableName: true,
    tableName: 'usuarios',
  },
);
