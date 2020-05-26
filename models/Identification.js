module.exports = (sequelize, DataTypes) => {
    const Identification = sequelize.define('Identification', {
        cdv: DataTypes.INTEGER,
        cmunfg: DataTypes.STRING,
        cnf: DataTypes.INTEGER,
        cuf: DataTypes.INTEGER,
        dhcont: DataTypes.STRING,
        dhemi: DataTypes.STRING,
        dhsaient: DataTypes.STRING,
        finnfe: DataTypes.STRING,
        iddest: DataTypes.INTEGER,
        indfinal: DataTypes.INTEGER,
        indpres: DataTypes.INTEGER,
        mod: DataTypes.INTEGER,
        nnf: DataTypes.INTEGER,
        nfref: DataTypes.STRING,
        natop: DataTypes.STRING,
        procemi: DataTypes.INTEGER,
        serie: DataTypes.INTEGER,
        tpamb: DataTypes.INTEGER,
        tpemis: DataTypes.INTEGER,
        tpimp: DataTypes.INTEGER,
        dhcont: DataTypes.STRING,
        tpnf: DataTypes.INTEGER,
        verproc: DataTypes.STRING,
        x: DataTypes.STRING,
        xjust: DataTypes.STRING,

    }, {
        freezeTableName: true,
        tableName: 'identificacoes',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
    });

    Identification.associate = models => {
        Identification.hasOne(models.Note, { foreignKey: 'identificacao_id', as: 'note' });
        Identification.hasMany(models.ProductNote, { foreignKey: 'identificacao_id', as: 'productNote' });
      };


    return Identification;
};