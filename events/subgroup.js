const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');

module.exports = (emitter, models) => {
  emitter.on('subgroup::create', async (params, callback) => {
    const { Subgroup } = models;

    const sanitizeRules = {
      name: 'trim|upper_case',
    };

    const rules = {
      groupId: 'required|integer',
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

    let subgroup;

    try {
      subgroup = await Subgroup.create({
        grupo_id: params.groupId,
        nome: params.name,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, subgroup.id);
  });

  emitter.on('subgroup::update', async (params, callback) => {
    const { Subgroup } = models;

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
      await Subgroup.update({
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

  emitter.on('subgroup::findById', async (params, callback) => {
    const { Subgroup } = models;

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

    let subgroup;

    try {
      subgroup = await Subgroup.findOne({
        where: { id: params.id },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, subgroup);
  });

  emitter.on('subgroup::findByGroupId', async (params, callback) => {
    const { Subgroup } = models;

    let subgroups;

    try {
      subgroups = await Subgroup.findAll({
        where: { grupo_id: params.id },
        attributes: ['id', ['grupo_id', 'groupId'], ['nome', 'name']],
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, subgroups);
  });

  emitter.on('subgroup::all', async (params, callback) => {
    const { Subgroup } = models;

    let subgroups;

    try {
      subgroups = await Subgroup.findAll({
        attributes: ['id', ['grupo_id', 'groupId'], ['nome', 'name']],
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, subgroups);
  });
};
