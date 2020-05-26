const fs = require('fs');
const path = require('path');
const pg = require('pg');
const Sequelize = require('sequelize');

const { env } = global;

const basename = path.basename(__filename);
const config = env.get('databases')[0];
const db = {};

config.dialectModule = pg;

config.define = {
  timestamps: true,
  underscoredAll: true,
  underscored: true,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

fs.readdirSync(__dirname).filter(file => (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')).forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
