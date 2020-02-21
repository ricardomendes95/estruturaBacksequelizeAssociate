const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');
const { Op } = require('sequelize');

module.exports = (emitter, models) => {
  setTimeout(async () => {
    const { CFOP } = models;

    let transaction;

    try {
      const lastCFOP = await CFOP.findOne({
        attributes: ['id'],
        order: [['id', 'DESC']],
        raw: true,
      });

      if (lastCFOP) {
        return;
      }

      const cfops = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, '..', 'storage', 'cfops.json'),
          'utf8',
        ),
      );

      transaction = await models.sequelize.transaction();

      for (const cfop of cfops) {
        await CFOP.create({
          cfop: cfop.cfop,
          descricao: cfop.description,
        }, { transaction });
      }

      await transaction.commit();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }

      throw err;
    }
  }, 5000);

  emitter.on('cfop::create', async (params, callback) => {
    const { CFOP } = models;

    params.cfop = _.toString(params.cfop).replace(/\D/g, '');

    const sanitizeRules = {
      cfop: 'trim',
      description: 'trim',
    };

    const rules = {
      cfop: 'required|min:4|max:4',
      description: 'required',
    };

    const messages = {
      required: 'Você deve preencher este campo',
      min: (field, rule, length) => `Este campo precisa ter, no mínimo, ${length} caracteres`,
      max: (field, rule, length) => `Este campo não pode ter mais de ${length} caracteres`,
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

    let cfop;

    try {
      cfop = await CFOP.create({
        cfop: params.cfop,
        descricao: params.description,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, cfop.id);
  });

  emitter.on('cfop::update', async (params, callback) => {
    const { CFOP } = models;

    params.cfop = _.toString(params.cfop).replace(/\D/g, '');

    const sanitizeRules = {
      cfop: 'trim',
      description: 'trim',
    };

    const rules = {
      id: 'required|integer',
      cfop: 'required|min:4|max:4',
      description: 'required',
    };

    const messages = {
      required: 'Você deve preencher este campo',
      min: (field, rule, length) => `Este campo precisa ter, no mínimo, ${length} caracteres`,
      max: (field, rule, length) => `Este campo não pode ter mais de ${length} caracteres`,
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
      await CFOP.update({
        cfop: params.cfop,
        descricao: params.description,
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

  emitter.on('cfop::delete', async (params, callback) => {
    const { CFOP } = models;

    try {
      await CFOP.destroy({
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

  emitter.on('cfop::findById', async (params, callback) => {
    const { CFOP } = models;

    const rules = {
      id: 'required|integer',
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

    let cfop;

    try {
      cfop = await CFOP.findOne({
        where: { id: params.id },
        attributes: ['id', 'cfop', ['descricao', 'description']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, cfop);
  });

  emitter.on('cfop::entry', async (params, callback) => {
    const { CFOP } = models;

    let cfops;

    try {
      cfops = await CFOP.findAll({
        where: { cfop: { [Op.lte]: 4999 } },
        attributes: ['id', 'cfop', ['descricao', 'description']],
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, cfops);
  });

  emitter.on('cfop::output', async (params, callback) => {
    const { CFOP } = models;

    let cfops;

    try {
      cfops = await CFOP.findAll({
        where: { cfop: { [Op.gte]: 5000 } },
        attributes: ['id', 'cfop', ['descricao', 'description']],
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, cfops);
  });

  emitter.on('cfop::all', async (params, callback) => {
    const { CFOP } = models;

    let cfops;

    try {
      cfops = await CFOP.findAll({
        attributes: ['id', 'cfop', ['descricao', 'description']],
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, cfops);
  });
};
