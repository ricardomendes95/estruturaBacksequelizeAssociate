module.exports = (sequelize, DataTypes) => sequelize.define('Address', {
  logradouro: DataTypes.STRING,
  numero: DataTypes.STRING,
  bairro: DataTypes.STRING,
  municipio: DataTypes.STRING,
  uf: DataTypes.STRING,
  pais: DataTypes.STRING,
  cep: DataTypes.STRING,
  complemento: DataTypes.STRING,
}, {
  freezeTableName: true,
  tableName: 'enderecos',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em',
});
