const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');

module.exports = (emitter, models) => {
  emitter.on('department::create', async (params, callback) => {
    const { Department } = models;

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

    let department;

    try {
      department = await Department.create({
        nome: params.name,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, department.id);
  });

  emitter.on('department::update', async (params, callback) => {
    const { Department } = models;

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
      await Department.update({
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

  emitter.on('department::findById', async (params, callback) => {
    const { Department } = models;

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

    let department;

    try {
      department = await Department.findOne({
        where: { id: params.id },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, department);
  });

  emitter.on('department::all', async (params, callback) => {
    const { Department } = models;

    let departments;

    try {
      departments = await Department.findAll({
        attributes: ['id', ['nome', 'name']],
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, departments);
  });
};
