module.exports = (sequelize, DataTypes) => sequelize.define('XmlCollector', {
  chave: DataTypes.STRING,
  nsu: DataTypes.STRING,
  status: DataTypes.ENUM('PENDENTE', 'IMPORTADA', 'CIENCIA_DA_OPERACAO', 'CONFIRMACAO_DA_OPERACAO', 'OPERACAO_NAO_REALIZADA', 'DESCONHECIMENTO_DA_OPERACAO'),
  justificativa: DataTypes.STRING,
  resumo: DataTypes.TEXT,
  xml: DataTypes.TEXT,
  json: DataTypes.TEXT,
}, {
  freezeTableName: true,
  tableName: 'xmls_coletados',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em',
});
