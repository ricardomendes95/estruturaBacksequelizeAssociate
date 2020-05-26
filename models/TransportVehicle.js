
module.exports = (sequelize, DataTypes) => {
    const TransportVehicle = sequelize.define('TransportVehicle', {
      placa: DataTypes.STRING,
      uf: DataTypes.STRING,
      rntc: DataTypes.STRING,
      placa_reboque: DataTypes.STRING,
      uf_reboque: DataTypes.STRING,
      rntc_reboque: DataTypes.STRING,     
    }, {
      freezeTableName: true,
      tableName: 'veiculos_transportes',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    });
  
    TransportVehicle.associate = models => {
        TransportVehicle.hasOne(models.NoteShipping,  { foreignKey: 'veiculo_transporte_id', as: 'noteShipping' })
    }

    return TransportVehicle;
  };