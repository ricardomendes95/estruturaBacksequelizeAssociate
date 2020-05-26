
module.exports = (sequelize, DataTypes) => {
    const A = sequelize.define('A', {
      name: DataTypes.STRING,      
    }, {
      freezeTableName: true,
      tableName: 'A',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em',
    });
  
    A.associate = models => {
        A.hasOne(models.B,  { foreignKey: 'a_id', as: 'table_B' })
    }

   
  
    return A;
  };