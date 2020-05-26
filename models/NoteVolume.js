
module.exports = (sequelize, DataTypes) => {
    const NoteVolume = sequelize.define('NoteVolume', {
      qvol: DataTypes.STRING,
      esp: DataTypes.STRING,      
      marca: DataTypes.STRING,
      nvol: DataTypes.STRING,
      pesol: DataTypes.DECIMAL,
      pesob: DataTypes.DECIMAL,
       
    }, {
      freezeTableName: true,
      tableName: 'volumes_notas',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    });
  
    NoteVolume.associate = models => {
        NoteVolume.hasOne(models.NoteShipping,  { foreignKey: 'volumes_nota_id', as: 'noteShipping' })
    }

    return NoteVolume;
  };