;

module.exports = (sequelize, DataTypes) => {
  const Ipi = sequelize.define('Ipi', {
    cst: DataTypes.STRING,
    cnpjprod: DataTypes.STRING,
    cenq: DataTypes.STRING,
    cselo: DataTypes.STRING,
    pipi: DataTypes.DECIMAL(12, 4),
    qselo: DataTypes.DECIMAL(12, 4),
    qunid: DataTypes.DECIMAL(12, 4),
    vbc: DataTypes.DECIMAL(12, 4),
    vipi: DataTypes.DECIMAL(12, 4),
    vunid: DataTypes.DECIMAL(12, 4),
  }, {
    freezeTableName: true,
    tableName: 'ipis',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
  });
  Ipi.associate = models => {
    Ipi.hasOne(models.ProductNote, { foreignKey: 'ipi_id', as: 'productNote' });
  };

  return Ipi;
};