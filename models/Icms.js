module.exports = (sequelize, DataTypes) => {
    const Icms = sequelize.define('Icms', {
      cst: DataTypes.STRING,
      ufst: DataTypes.STRING,
      modbc: DataTypes.INTEGER,
      modbcst: DataTypes.INTEGER,
      motdesicms: DataTypes.INTEGER,
      orig: DataTypes.STRING,
      pbcop: DataTypes.DECIMAL(12, 4),
      pcredsn: DataTypes.DECIMAL(12, 4),
      pdif: DataTypes.DECIMAL(12, 4),
      pfcp: DataTypes.DECIMAL(12, 4),
      pfcpst: DataTypes.DECIMAL(12, 4),
      pfcpstret: DataTypes.DECIMAL(12, 4),
      picms: DataTypes.DECIMAL(12, 4),
      picmsst: DataTypes.DECIMAL(12, 4),
      pmvast: DataTypes.DECIMAL(12, 4),
      predbc: DataTypes.DECIMAL(12, 4),
      predbcst: DataTypes.DECIMAL(12, 4),
      pst: DataTypes.DECIMAL(12, 4),
      vbc: DataTypes.DECIMAL(12, 4),
      vbcfcp: DataTypes.DECIMAL(12, 4),      
      vbcfcpst: DataTypes.DECIMAL(12, 4),
      vbcfcpstret: DataTypes.DECIMAL(12, 4),
      vbcst: DataTypes.DECIMAL(12, 4),      
      vbcstdest: DataTypes.DECIMAL(12, 4),
      vbcstret: DataTypes.DECIMAL(12, 4),
      vcredicmssn: DataTypes.DECIMAL(12, 4),
      vfcp: DataTypes.DECIMAL(12, 4),
      vfcpst: DataTypes.DECIMAL(12, 4),
      vfcpstret: DataTypes.DECIMAL(12, 4),
      vicms: DataTypes.DECIMAL(12, 4),
      vicmsdeson: DataTypes.DECIMAL(12, 4),
      vicmsdif: DataTypes.DECIMAL(12, 4),
      vicmsop: DataTypes.DECIMAL(12, 4),
      vicmsst: DataTypes.DECIMAL(12, 4),
      vicmsstdest: DataTypes.DECIMAL(12, 4),
      vicmsstret: DataTypes.DECIMAL(12, 4),
    }, {
        freezeTableName: true,
        tableName: 'icms',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
    });
    Icms.associate = models => {
        Icms.hasOne(models.ProductNote, { foreignKey: 'icms_id' });
      };

    return Icms;
};