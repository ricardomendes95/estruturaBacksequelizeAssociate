module.exports = (sequelize, DataTypes) => sequelize.define('Barcode', {
  produto_id: DataTypes.INTEGER,
  codigo: DataTypes.STRING,
  principal: DataTypes.BOOLEAN,
  quantidade: DataTypes.DECIMAL,
  preco: DataTypes.DECIMAL,
}, {
  freezeTableName: true,
  tableName: 'codigos_barras',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em',
});
