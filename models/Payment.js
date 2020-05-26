module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    indpag: DataTypes.STRING,
    tpag: DataTypes.STRING(2),
    vpag: DataTypes.DECIMAL(15,2),
    vtroco: DataTypes.DECIMAL(15,2),

  }, {
    freezeTableName: true,
    tableName: 'pagamentos',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
  });

  Payment.associate = models => {
    Payment.hasMany(models.Card, { foreignKey: 'pagamento_id', as: 'card' })
    Payment.belongsTo(models.Note, { foreignKey: 'nota_id', as: 'note' })
  }

  return Payment;
};