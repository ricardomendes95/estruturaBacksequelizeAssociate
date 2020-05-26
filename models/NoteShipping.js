
module.exports = (sequelize, DataTypes) => {
    const NoteShipping = sequelize.define('NoteShipping', {
      modfrete: DataTypes.STRING,
    }, {
      freezeTableName: true,
      tableName: 'transportes_notas',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    });
  
    NoteShipping.associate = models => {
        NoteShipping.belongsTo(models.Carrier,  { foreignKey: 'transportadora_id', as: 'carrier' });
        NoteShipping.belongsTo(models.TransportVehicle,  { foreignKey: 'veiculo_transporte_id', as: 'transportVehicle' });
        NoteShipping.belongsTo(models.IcmsTransport,  { foreignKey: 'icms_transporte_id', as: 'icmsTransport' });
        NoteShipping.belongsTo(models.NoteVolume,  { foreignKey: 'volumes_nota_id', as: 'noteVolume' });
        NoteShipping.hasOne( models.Note, { foreignKey: 'transporte_id', as: 'note'})
    } 
  
    return NoteShipping;
  };