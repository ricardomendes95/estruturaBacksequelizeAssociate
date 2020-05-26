module.exports = (sequelize, DataTypes) => sequelize.define('Subgroup',
  {
    grupo_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
  },
  {
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    freezeTableName: true,
    tableName: 'subgrupos',
  },
);
