const fs = require('fs');
const path = require('path');
const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');

module.exports = (emitter, models) => {
  setTimeout(async () => {
    const { Unit } = models;

    let transaction;

    try {
      const lastUnit = await Unit.findOne({
        attributes: ['id'],
        order: [['id', 'DESC']],
        raw: true,
      });

      if (lastUnit) {
        return;
      }

      const units = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, '..', 'storage', 'units.json'),
          'utf8',
        ),
      );

      transaction = await models.sequelize.transaction();

      for (const unit of units) {
        await Unit.create({
          sigla: unit.initials,
          descricao: unit.description,
          padrao: true,
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

  emitter.on('unit::create', async (params, callback) => {
    const { Unit } = models;

    const sanitizeRules = {
      initials: 'trim|upper_case',
      description: 'trim',
    };

    const rules = {
      initials: 'required',
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

    let unit;

    try {
      unit = await Unit.create({
        sigla: params.initials,
        descricao: params.description,
        padrao: false,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, unit.id);
  });

  emitter.on('unit::update', async (params, callback) => {
    const { Unit } = models;

    const sanitizeRules = {
      initials: 'trim|upper_case',
      description: 'trim',
    };

    const rules = {
      id: 'integer',
      initials: 'required',
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

    const unit = await Unit.findOne({
      where: { id: params.id },
    });

    if (!unit) {
      callback({
        id: 'Unidade não encontrada',
      });

      return;
    }

    if (unit.padrao) {
      callback({
        initials: 'Esta unidade não pode ser alterada',
      });

      return;
    }

    if (unit.sigla !== params.initials) {
      const initialsExists = await Unit.findOne({
        where: { sigla: params.initials },
      });

      if (initialsExists) {
        callback({
          initials: 'Já existe uma unidade com esta sigla',
        });

        return;
      }
    }

    try {
      await unit.update({
        sigla: params.initials,
        descricao: params.description,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, true);
  });

  emitter.on('unit::findById', async (params, callback) => {
    const { Unit } = models;

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

    let unit;

    try {
      unit = await Unit.findOne({
        where: { id: params.id },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, unit);
  });

  emitter.on('unit::all', async (params, callback) => {
    const { Unit } = models;

    let units;

    try {
      units = await Unit.findAll({
        attributes: ['id', ['sigla', 'initials'], ['descricao', 'description'], ['padrao', 'default']],
        order: [['id', 'ASC']],
        raw: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, units);
  });
};
