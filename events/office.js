const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');

module.exports = (emitter, models) => {
  emitter.on('office::create', async (params, callback) => {
    const { Office } = models;

    const sanitizeRules = {
      name: 'trim|upper_case',
    };

    const rules = {
      name: 'required',
    };

    const messages = {
      required: 'Você deve preencher este campo',
    };

    params = sanitize(params, sanitizeRules);

    try {
      await validateAll(params, rules, messages);
    } catch (err) {
      const errors = {};

      for (const error of err) {
        errors[error.field] = error.message;
      }

      callback(errors);
      return;
    }

    let office;

    try {
      office = await Office.create({
        nome: params.name,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, office.id);
  });

  emitter.on('office::update', async (params, callback) => {
    const { Office } = models;

    const sanitizeRules = {
      name: 'trim|upper_case',
    };

    const rules = {
      id: 'integer',
      name: 'required',
    };

    const messages = {
      required: 'Você deve preencher este campo',
    };

    params = sanitize(params, sanitizeRules);

    try {
      await validateAll(params, rules, messages);
    } catch (err) {
      const errors = {};

      for (const error of err) {
        errors[error.field] = error.message;
      }

      callback(errors);
      return;
    }

    try {
      await Office.update({
        nome: params.name,
      }, {
        where: {
          id: params.id,
        },
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, true);
  });

  emitter.on('office::findById', async (params, callback) => {
    const { Office } = models;

    const rules = {
      id: 'integer',
    };

    try {
      await validateAll(params, rules);
    } catch (err) {
      const errors = {};

      for (const error of err) {
        errors[error.field] = error.message;
      }

      callback(errors);
      return;
    }

    let office;

    try {
      office = await Office.findOne({
        where: { id: params.id },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, office);
  });

  emitter.on('office::all', async (params, callback) => {
    const { Office } = models;

    let offices;

    try {
      offices = await Office.findAll({
        attributes: ['id', ['nome', 'name']],
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, offices);
  });
};
