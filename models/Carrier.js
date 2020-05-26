module.exports = (sequelize, DataTypes) => sequelize.define('Carrier', {
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
  codigo_antt: DataTypes.STRING,
  ativo: DataTypes.BOOLEAN,
}, {
  freezeTableName: true,
  tableName: 'transportadoras',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em',
});