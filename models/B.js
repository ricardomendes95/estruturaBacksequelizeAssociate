
module.exports = (sequelize, DataTypes) => {
    const B = sequelize.define('B', {
      name: DataTypes.STRING,      
    }, {
      freezeTableName: true,
      tableName: 'B',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    });
  
    B.associate = models => {
        B.belongsTo(models.A,  { foreignKey: 'a_id', as: 'table_A' })
        B.hasMany( models.C, { foreignKey: 'b_id', as: 'table_C'})
    } 
  
    return B;
  };