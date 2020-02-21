const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');

module.exports = (emitter, models) => {
  emitter.on('group::create', async (params, callback) => {
    const { Group } = models;

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

    let group;

    try {
      group = await Group.create({
        nome: params.name,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, group.id);
  });

  emitter.on('group::update', async (params, callback) => {
    const { Group } = models;

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
      await Group.update({
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

  emitter.on('group::findById', async (params, callback) => {
    const { Group } = models;

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

    let group;

    try {
      group = await Group.findOne({
        where: { id: params.id },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, group);
  });

  emitter.on('group::all', async (params, callback) => {
    const { Group } = models;

    let groups;

    try {
      groups = await Group.findAll({
        attributes: ['id', ['nome', 'name']],
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, groups);
  });
};
