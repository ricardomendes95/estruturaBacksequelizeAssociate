module.exports = (sequelize, DataTypes) => {
    const Charge = sequelize.define('Charge', {
      nfat: DataTypes.STRING,
      vorig: DataTypes.DECIMAL(12, 4),
      vdesc: DataTypes.DECIMAL(12, 4),
      vliq: DataTypes.DECIMAL(12, 4),    
    }, {
        freezeTableName: true,
        tableName: 'cobrancas',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
    });
    Charge.associate = models => {
        Charge.hasMany(models.Duplicate, { foreignKey: 'cobranca_id', as: 'duplicates' });
        // Charge.hasOne(models.Note, { foreignKey: 'cobranca_id', as: 'note' });
      };

    return Charge;
};