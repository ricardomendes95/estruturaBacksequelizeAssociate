module.exports = (sequelize, DataTypes) => {
  const Pis = sequelize.define('Pis', {
    cst: DataTypes.STRING,
    ppis: DataTypes.DECIMAL(12, 4),
    qbcprod: DataTypes.DECIMAL(12, 4),
    valiqprod: DataTypes.DECIMAL(12, 4),
    vbc: DataTypes.DECIMAL(12, 4),
    vpis: DataTypes.DECIMAL(12, 4),
  }, {
    freezeTableName: true,
    tableName: 'pis',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
  });
  Pis.associate = models => {
    Pis.hasOne(models.ProductNote, { foreignKey: 'pis_id', as: 'productNote' });
  };

  return Pis;
};