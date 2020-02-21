module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('volumes_notas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      qvol: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      esp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      marca: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      nvol: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      pesol: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
      },

      pesob: {
        type: Sequelize.DECIMAL(12, 3),
        allowNull: true,
      },


      criado_em: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      atualizado_em: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('volumes_notas');
  }
};
