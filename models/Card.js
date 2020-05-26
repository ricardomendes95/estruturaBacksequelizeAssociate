module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    cnpj: DataTypes.STRING,
    caut: DataTypes.STRING,
    tband: DataTypes.DECIMAL(15,2),
    tpintegra: DataTypes.STRING,
  }, {
    freezeTableName: true,
    tableName: 'cartoes',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
  });

  Card.associate = models => {
    Card.belongsTo(models.Payment, { foreignKey: 'pagamento_id', as: 'payment' })
  }

  return Card;
};