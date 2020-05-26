module.exports = (sequelize, DataTypes) => {
    const Duplicate = sequelize.define('Duplicate', {
      ndup: DataTypes.STRING,
      dvenc: DataTypes.DATE,
      vdup: DataTypes.DECIMAL(12, 4),        
    }, {
        freezeTableName: true,
        tableName: 'duplicatas',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
    });
    Duplicate.associate = models => {
        Duplicate.belongsTo(models.Charge, { foreignKey: 'cobranca_id', as: 'charge' });
        Duplicate.hasOne(models.Note, { foreignKey: 'cobranca_id', as: 'Note' });
      };

    return Duplicate;
};