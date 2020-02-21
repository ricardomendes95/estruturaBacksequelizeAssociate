const _ = require('lodash');
const Sequelize = require('sequelize');
const Umzug = require('umzug');
const pg = require('pg');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { version } = require('../package.json');

const { env, writabledir } = global;

module.exports = (emitter, models) => {
  emitter.on('util::version', (params, callback) => {
    callback(null, version);
  });

  emitter.on('util::migrate', () => {
    const databases = env.get('databases');

    for (const db of databases) {
      db.dialectModule = pg;

      db.define = {
        timestamps: true,
        underscoredAll: true,
        underscored: true,
      };

      const sequelize = new Sequelize(
        db.database,
        db.username,
        db.password,
        db,
      );

      const umzug = new Umzug({
        storage: 'sequelize',

        storageOptions: {
          sequelize,
        },

        migrations: {
          path: './database/migrations/',
          pattern: /\.js$/,
          params: [
            sequelize.getQueryInterface(),
            sequelize.constructor,
            () => {
              throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            },
          ],
        },
      });

      umzug.up();
    }
  });

  emitter.on('util::checkCnpj', async ({ cnpj }, callback) => {
    let response;

    cnpj = _.toString(cnpj).replace(/\D/g, '');

    try {
      response = (await axios.get(
        `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
      )).data;
    } catch (err) {
      callback('Aguarde um instante e tente novamente');
      throw err;
    }

    if (response.status === 'ERROR') {
      callback({
        cnpj: 'Não foi possível encontrar este CNPJ',
      });

      return;
    }

    const situation = {
      status: response.situacao,
      reason: response.motivo_situacao,
      lastUpdate: response.data_situacao,
    };

    const address = {
      cep: response.cep.replace(/\D/g, ''),
      street: response.logradouro,
      number: response.numero,
      district: response.bairro,
      city: response.municipio,
      uf: response.uf,
      complement: response.complemento,
      country: 'BRASIL',
    };

    callback(null, {
      name: response.nome,
      fantasy: response.fantasia,
      phone: response.telefone.split(' / '),
      email: response.email,
      situation,
      address,
    });
  });

  emitter.on('util::checkCep', async ({ cep }, callback) => {
    let response;

    cep = _.toString(cep).replace(/\D/g, '');

    try {
      response = (await axios.get(
        `https://viacep.com.br/ws/${cep}/json/`,
      )).data;
    } catch (err) {
      callback('Verifique sua conexão com a internet');
      throw err;
    }

    if (response.erro) {
      callback({
        cep: 'Não foi possível encontrar este CEP',
      });

      return;
    }

    callback(null, {
      street: response.logradouro,
      district: response.bairro,
      city: response.localidade,
      uf: response.uf,
    });
  });

  emitter.on('util::countries', async (params, callback) => {
    callback(null, JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'storage', 'countries.json'),
        'utf8',
      ),
    ).map(country => country.name).sort());
  });

  emitter.on('util::states', (params, callback) => {
    let states;

    try {
      states = JSON.parse(
        fs.readFileSync(
          path.join(writabledir, 'states.json'),
          'utf8',
        ),
      );
    } catch (err) {
      states = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, '..', 'storage', 'states.json'),
          'utf8',
        ),
      );
    }

    callback(null, states.map(state => state.sigla).sort());
  });

  emitter.on('util::cities', (params, callback) => {
    let cities;

    try {
      cities = JSON.parse(
        fs.readFileSync(
          path.join(writabledir, 'cities.json'),
          'utf8',
        ),
      );
    } catch (err) {
      cities = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, '..', 'storage', 'cities.json'),
          'utf8',
        ),
      );
    }

    callback(null, cities.map(city => ({
      name: city.nome,
      uf: city.microrregiao.mesorregiao.UF.sigla,
    })).sort());
  });
};
