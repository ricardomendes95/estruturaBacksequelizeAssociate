const fs = require('fs');
const path = require('path');

const { writabledir } = global;
const envPath = path.join(writabledir, 'env.json');

const defaultEnvironment = {
  databases: [
    {
      host: '127.0.0.1',
      port: '5432',
      username: 'postgres',
      password: 'system',
      database: 'jarpi',
      dialect: 'postgres',
      dialectModule: null,
      logging: false,
    },
  ],
};

function loadEnv() {
  let environment;

  try {
    environment = JSON.parse(
      fs.readFileSync(envPath, 'utf8'),
    );
  } catch (err) {
    if (!err.message.match(/no such file/gi)) {
      throw new Error(`Something did not go as expected when trying to read environment file: ${err.toString()}`);
    }

    environment = defaultEnvironment;
  }

  return environment;
}

global.env = {
  get(key, defaultValue) {
    if (typeof key !== 'string' || !key) {
      throw new Error('Argument key cannot be empty and must be of type string');
    }

    const environment = loadEnv();

    return typeof environment[key] !== 'undefined'
      ? environment[key]
      : defaultValue;
  },

  set(key, value) {
    if (typeof key !== 'string' || !key) {
      throw new Error('Argument key cannot be empty and must be of type string');
    }

    if (typeof value === 'undefined') {
      throw new Error('Argument value cannot be undefined');
    }

    const environment = loadEnv();
    environment[key] = value;

    fs.writeFileSync(
      envPath,
      JSON.stringify(environment, null, 2),
    );
  },
};
