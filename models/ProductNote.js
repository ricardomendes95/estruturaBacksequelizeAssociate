module.exports = (sequelize, DataTypes) => {
  const ProductNote = sequelize.define('ProductNote', {
    cest_opc: DataTypes.STRING,
    cnpjfab_opc: DataTypes.STRING,
    di: DataTypes.STRING,
    detespecifico: DataTypes.STRING,
    nve_opc: DataTypes.STRING,
    cbenef_opc: DataTypes.STRING,
    cbenef_opc: DataTypes.STRING,
    cean: DataTypes.STRING,
    ceantrib: DataTypes.STRING,
    cprod: DataTypes.STRING,
    cfop: DataTypes.STRING,
    detexport_opc: DataTypes.STRING,
    indtot: DataTypes.STRING,
    margem: DataTypes.STRING,
    nfci_opc: DataTypes.STRING,
    nitemped: DataTypes.STRING,
    ncm: DataTypes.STRING,
    precovenda: DataTypes.STRING,
    qcom: DataTypes.STRING,
    qtrib: DataTypes.STRING,
    rastro_opc: DataTypes.STRING,
    ucom: DataTypes.STRING,
    utrib: DataTypes.STRING,
    vdesc: DataTypes.DECIMAL(12, 4),
    vfrete: DataTypes.DECIMAL(12, 4),
    vdesc: DataTypes.DECIMAL(12, 4),
    voutro: DataTypes.DECIMAL(12, 4),
    vdesc: DataTypes.DECIMAL(12, 4),
    vprod: DataTypes.DECIMAL(12, 4),
    vseg: DataTypes.DECIMAL(12, 4),
    vuncom: DataTypes.DECIMAL(12, 4),
    vuntrib: DataTypes.DECIMAL(12, 4),
    xped: DataTypes.STRING,
    xprod: DataTypes.STRING,

  }, {
    freezeTableName: true,
    tableName: 'produto_nota',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
  });

  ProductNote.associate = models => {
    ProductNote.belongsTo(models.Identification, { foreignKey: 'identificacao_id', as: 'identification' })
    ProductNote.belongsTo(models.Ipi, { foreignKey: 'ipi_id', as: 'ipi' })
    ProductNote.belongsTo(models.Cofins, { foreignKey: 'cofins_id', as: 'cofins' })
    ProductNote.belongsTo(models.Icms, { foreignKey: 'icms_id', as: 'icms' })
    ProductNote.belongsTo(models.Pis, { foreignKey: 'pis_id', as: 'pis' })
    ProductNote.belongsTo(models.Product, { foreignKey: 'produto_id', as: 'product' })
  }

  return ProductNote;
};