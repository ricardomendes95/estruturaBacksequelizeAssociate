module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
      chave: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      ismanual: DataTypes.BOOLEAN,
      vtottrib: DataTypes.STRING,   
      type_note: DataTypes.STRING,   
      
    }, {
      freezeTableName: true,
      tableName: 'notas',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    });
  
    Note.associate = models => {
        Note.belongsTo(models.Identification,  { foreignKey: 'identificacao_id', as: 'identification' })
        Note.belongsTo(models.IcmsTotal,  { foreignKey: 'icms_total_id', as: 'icmstotal' })
        Note.belongsTo(models.Provider,  { foreignKey: 'fornecedor_id', as: 'provider' })
        Note.belongsTo(models.NoteShipping,  { foreignKey: 'transporte_id', as: 'noteShipping' })
        Note.belongsTo(models.Charge,  { foreignKey: 'cobranca_id', as: 'charge' })
        Note.belongsTo(models.AdditionalInformation,  { foreignKey: 'inf_adic_id', as: 'additionalInformation' })
        Note.hasMany(models.Payment,  { foreignKey: 'nota_id', as: 'payment' })
    }

  
    return Note;
  };