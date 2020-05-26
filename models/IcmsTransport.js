
module.exports = (sequelize, DataTypes) => {
    const IcmsTransport = sequelize.define('IcmsTransport', {
      vserv: DataTypes.DECIMAL,
      vbcret: DataTypes.DECIMAL,
      picmsret: DataTypes.DECIMAL,
      vicmsret: DataTypes.DECIMAL,
      cfop: DataTypes.INTEGER,
      cmunfg: DataTypes.STRING,
   
    }, {
      freezeTableName: true,
      tableName: 'icms_transportes',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    });
  
    IcmsTransport.associate = models => {
        IcmsTransport.hasOne(models.NoteShipping,  { foreignKey: 'icms_transporte_id', as: 'noteShipping' })
    }

    return IcmsTransport;
  };