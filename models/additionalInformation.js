module.exports = (sequelize, DataTypes) => {
    const AdditionalInformation = sequelize.define('AdditionalInformation', {
      infadfisco:DataTypes.STRING,
      ifcpl:DataTypes.STRING,
      xcampo:DataTypes.STRING,
      xtexto:DataTypes.STRING,      
      nproc:DataTypes.STRING,
      indproc:DataTypes.INTEGER,    
    }, {
        freezeTableName: true,
        tableName: 'informacoes_adicionais',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
    });
    AdditionalInformation.associate = models => {
      AdditionalInformation.hasOne(models.Note, { foreignKey: 'inf_adic_id', as: 'note' });
      };

    return AdditionalInformation;
};