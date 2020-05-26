
module.exports = (sequelize, DataTypes) => {
    const IcmsTotal = sequelize.define('IcmsTotal', {
        vbc: DataTypes.DECIMAL(12, 4),
        vbcst: DataTypes.DECIMAL(12, 4),
        vcofins: DataTypes.DECIMAL(12, 4),
        vdesc: DataTypes.DECIMAL(12, 4),
        vfcp: DataTypes.DECIMAL(12, 4),
        vfcpst: DataTypes.DECIMAL(12, 4),
        vfcpstret: DataTypes.DECIMAL(12, 4),
        vfcpufdest_opc: DataTypes.DECIMAL(12, 4),
        vfcpufdest_opc: DataTypes.DECIMAL(12, 4),
        vfrete: DataTypes.DECIMAL(12, 4),
        vicms: DataTypes.DECIMAL(12, 4),
        vicmsdeson: DataTypes.DECIMAL(12, 4),
        vicmsufdest_opc: DataTypes.DECIMAL(12, 4),
        vicmsufremet_opc: DataTypes.DECIMAL(12, 4),
        vii: DataTypes.DECIMAL(12, 4),
        vipi: DataTypes.DECIMAL(12, 4),
        vipidevol: DataTypes.DECIMAL(12, 4),
        vnf: DataTypes.DECIMAL(12, 4),
        voutro: DataTypes.DECIMAL(12, 4),
        vpis: DataTypes.DECIMAL(12, 4),
        vprod: DataTypes.DECIMAL(12, 4),
        vst: DataTypes.DECIMAL(12, 4),
        vseg: DataTypes.DECIMAL(12, 4),
        vtottrib: DataTypes.DECIMAL(12, 4),

    }, {
        freezeTableName: true,
        tableName: 'icms_totais',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
    });
    IcmsTotal.associate = models => {
        IcmsTotal.hasOne(models.Note, { foreignKey: 'icms_total_id', as: 'note' });
      };

    return IcmsTotal;
};