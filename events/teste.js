const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');

module.exports = (emitter, models) => {
  emitter.on('teste::createA', async (params, callback) => {
    const { A } = models;

    let a;

    try {
      a = await A.create({
        name: params.name,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, a.id);
  });

  emitter.on('teste::createB2', async (params, callback) => {
    const { B } = models;

    let b;

    try {
      b = await B.create({
        name: params.name,
        a_id: 1,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, a.id);
  });

  emitter.on('teste::create', async (params, callback) => {
    const { A } = models;

    let b;

    try {
      b = await A.create(params);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, b.id);
  });

  emitter.on('teste::createB', async (params, callback) => {
    const { A, B } = models;

    let a;
    let b;

    try {
      a = await A.create({
        name: params.name,
      });
      console.log(a.id);

      b = await B.create({
        name: params.b.name,
        a_id: a.id,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, a.id);
  });

  emitter.on('teste::createAll', async (params, callback) => {
    const { A, B, C } = models;

    let a;
    let b;
    let c;

    try {
      a = await A.create({
        name: params.name,
      });
      console.log(a.id);

      b = await B.create({
        name: params.b.name,
        a_id: a.id,
      });

      for (const item of params.b.c) {
        await C.create({
          name: item.name,
          b_id: b.id
        })
      }


    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, a.id);
  });

  emitter.on('office::update', async (params, callback) => {
    const { Office } = models;

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

  emitter.on('teste::findById', async (params, callback) => {
    const { A, B } = models;

    let a;

    try {
      a = await A.findByPk(params.id, {
        include: [
          { all: true, nested: true },
        ],

      });
      // a = await A.findAll();
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, a);
  });

  emitter.on('teste::findById2', async (params, callback) => {
    const { A, B, C } = models;

    let a;

    try {
      a = await A.findByPk(params.id, {
        attributes: ['id', 'name'],
        include: [
          {
            model: B,
            attributes: ['id', 'name'],
            require: true,
            as: 'table_B',
            include: [{
              attributes: ['id', 'name'],
              model: C,
              as: 'table_C',
              require: true,
            }]
          }
        ],

      });
      // a = await A.findAll();
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, a);
  });

  emitter.on('teste::delete', async (params, callback) => {
    const { A, B } = models;

    try {
      await A.destroy({
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

};
