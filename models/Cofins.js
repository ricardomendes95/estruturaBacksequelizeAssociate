module.exports = (sequelize, DataTypes) => {
    const Cofins = sequelize.define('Cofins', {
      cst: DataTypes.STRING,
      pcofins: DataTypes.DECIMAL(12, 4),
      qbcprod: DataTypes.DECIMAL(12, 4),
      valiqprod: DataTypes.DECIMAL(12, 4),
      vbc: DataTypes.DECIMAL(12, 4),      
      vcofins: DataTypes.DECIMAL(12, 4),
    }, {
        freezeTableName: true,
        tableName: 'cofins',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
    });
    Cofins.associate = models => {
        Cofins.hasOne(models.ProductNote, { foreignKey: 'cofins_id', as: 'productNote' });
      };

    return Cofins;
};