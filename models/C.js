
module.exports = (sequelize, DataTypes) => {
    const C = sequelize.define('C', {
      name: DataTypes.STRING,      
    }, {
      freezeTableName: true,
      tableName: 'C',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    });
  
    C.associate = models => {
        C.belongsTo(models.B,  { foreignKey: 'b_id', as: 'table_B' })
    }

    return C;
  };