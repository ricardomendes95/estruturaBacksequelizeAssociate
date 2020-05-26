module.exports = (sequelize, DataTypes) => sequelize.define('Client', {
  nome_razao: DataTypes.STRING,
  fantasia: DataTypes.STRING,
  cnpj_cpf: DataTypes.STRING,
  ie_rg: DataTypes.STRING,
  inscricao_municipal: DataTypes.STRING,
  email: DataTypes.STRING,
  email_secundario: DataTypes.STRING,
  telefone: DataTypes.STRING,
  celular: DataTypes.STRING,
  nome_contato: DataTypes.STRING,
  endereco_id: DataTypes.INTEGER,
  ativo: DataTypes.BOOLEAN,
}, {
  freezeTableName: true,
  tableName: 'clientes',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em',
});
