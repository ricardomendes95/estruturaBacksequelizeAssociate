const _ = require('lodash');
const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');
const { Sequelize, Op } = require('sequelize');
const { cnpj, cpf } = require('cpf-cnpj-validator');

module.exports = (emitter, models) => {
  emitter.on('client::create', async (params, callback) => {
    const { Address, Client } = models;

    const sanitizeRules = {
      street: 'trim|upper_case',
      number: 'trim|upper_case',
      district: 'trim|upper_case',
      city: 'trim|upper_case',
      uf: 'trim|upper_case',
      country: 'trim|upper_case',
      cep: 'trim',
      complement: 'trim|upper_case',
      reasonName: 'trim|upper_case',
      fantasy: 'trim|upper_case',
      cnpjCpf: 'trim',
      ieRg: 'trim',
      municipalRegistration: 'trim',
      email: 'trim|lower_case',
      emailSecondary: 'trim|lower_case',
      phone: 'trim',
      cell: 'trim',
      contactName: 'trim|upper_case',
    };

    const rules = {
      street: 'required',
      number: 'required',
      district: 'required',
      city: 'required',
      uf: 'required',
      country: 'required',
      cep: 'required',
      reasonName: 'required',
      cnpjCpf: 'required',
      email: 'required|email',
    };

    const messages = {
      required: 'Você deve preencher este campo',
      email: 'Informe um endereço de e-mail válido',
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

    if (!cnpj.isValid(params.cnpjCpf) && !cpf.isValid(params.cnpjCpf)) {
      callback({
        cnpjCpf: 'Este não é um formato valido',
      });

      return;
    }

    params.cnpjCpf = cnpj.format(params.cnpjCpf);

    if (!params.cnpjCpf.match(/-/g)) {
      params.cnpjCpf = cpf.format(params.cnpjCpf);
    }

    const documentExists = await Client.findOne({
      where: { cnpj_cpf: params.cnpjCpf },
    });

    if (documentExists) {
      callback({
        cnpjCpf: 'Já existe um cadastro para este documento',
      });

      return;
    }

    let address;

    try {
      address = await Address.create({
        logradouro: params.street,
        numero: params.number,
        bairro: params.district,
        municipio: params.city,
        uf: params.uf,
        pais: params.country,
        cep: params.cep,
        complemento: params.complement,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    let client;

    try {
      client = await Client.create({
        nome_razao: params.reasonName,
        fantasia: params.fantasy,
        cnpj_cpf: params.cnpjCpf,
        ie_rg: params.ieRg,
        inscricao_municipal: params.municipalRegistration,
        email: params.email,
        email_secundario: params.emailSecondary,
        telefone: params.phone,
        celular: params.cell,
        nome_contato: params.contactName,
        endereco_id: address.id,
        ativo: true,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, client.id);
  });

  emitter.on('client::update', async (params, callback) => {
    const { Address, Client } = models;

    const sanitizeRules = {
      street: 'trim|upper_case',
      number: 'trim|upper_case',
      district: 'trim|upper_case',
      city: 'trim|upper_case',
      uf: 'trim|upper_case',
      country: 'trim|upper_case',
      cep: 'trim',
      complement: 'trim|upper_case',
      reasonName: 'trim|upper_case',
      fantasy: 'trim|upper_case',
      cnpjCpf: 'trim',
      ieRg: 'trim',
      municipalRegistration: 'trim',
      email: 'trim|lower_case',
      emailSecondary: 'trim|lower_case',
      phone: 'trim',
      cell: 'trim',
      contactName: 'trim|upper_case',
    };

    const rules = {
      street: 'required',
      number: 'required',
      district: 'required',
      city: 'required',
      uf: 'required',
      country: 'required',
      cep: 'required',
      reasonName: 'required',
      cnpjCpf: 'required',
      email: 'required|email',
    };

    const messages = {
      required: 'Você deve preencher este campo',
      email: 'Informe um endereço de e-mail válido',
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

    if (!cnpj.isValid(params.cnpjCpf) && !cpf.isValid(params.cnpjCpf)) {
      callback({
        cnpjCpf: 'Este não é um formato valido',
      });

      return;
    }

    params.cnpjCpf = cnpj.format(params.cnpjCpf);

    if (!params.cnpjCpf.match(/-/g)) {
      params.cnpjCpf = cpf.format(params.cnpjCpf);
    }

    const client = await Client.findOne({
      where: { id: params.id },
    });

    if (!client) {
      callback({
        id: 'Cliente não encontrado',
      });

      return;
    }

    if (client.cnpj_cpf !== params.cnpjCpf) {
      const documentExists = await Client.findOne({
        where: { cnpj_cpf: params.cnpjCpf },
      });

      if (documentExists) {
        callback({
          cnpjCpf: 'Já existe um cadastrado para este documento',
        });

        return;
      }
    }

    try {
      await Address.update({
        logradouro: params.street,
        numero: params.number,
        bairro: params.district,
        municipio: params.city,
        uf: params.uf,
        pais: params.country,
        cep: params.cep,
        complemento: params.complement,
      }, {
        where: { id: params.addressId },
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    try {
      await client.update({
        nome_razao: params.reasonName,
        fantasia: params.fantasy,
        cnpj_cpf: params.cnpjCpf,
        ie_rg: params.ieRg,
        inscricao_municipal: params.municipalRegistration,
        email: params.email,
        email_secundario: params.emailSecondary,
        telefone: params.phone,
        celular: params.cell,
        nome_contato: params.contactName,
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, true);
  });

  emitter.on('client::toggleStatus', async (params, callback) => {
    const { Client } = models;

    try {
      await Client.update({
        ativo: Sequelize.literal('NOT ativo'),
      }, {
        where: { id: params.id },
      });

      callback(null, true);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });

  emitter.on('client::nextId', async (params, callback) => {
    const { Client } = models;

    try {
      const lastClient = await Client.findOne({
        attributes: ['id'],
        order: [['id', 'DESC']],
        raw: true,
      });

      if (lastClient) {
        callback(null, lastClient.id + 1);
        return;
      }

      callback(null, 1);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });

  emitter.on('client::findById', async ({ id }, callback) => {
    const { Client, Address } = models;

    try {
      const client = await Client.findOne({
        where: { id, ativo: true },
        attributes: [
          'id', ['nome_razao', 'reasonName'], ['fantasia', 'fantasy'],
          ['cnpj_cpf', 'cnpjCpf'], ['ie_rg', 'ieRg'],
          ['inscricao_municipal', 'municipalRegistration'], 'email',
          ['email_secundario', 'emailSecondary'], ['telefone', 'phone'],
          ['celular', 'cell'], ['nome_contato', 'contactName'], ['endereco_id', 'addressId'],
          ['ativo', 'active'],
        ],
        raw: true,
      });

      if (!client) {
        callback({
          id: 'Cliente não encontrado',
        });

        return;
      }

      const address = await Address.findOne({
        where: { id: client.addressId },
        attributes: [
          'id', ['logradouro', 'street'], ['numero', 'number'],
          ['bairro', 'district'], ['municipio', 'city'], 'uf', ['pais', 'country'],
          'cep', ['complemento', 'complement'],
        ],
        raw: true,
      });

      client.address = address;

      callback(null, client);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });

  emitter.on('client::all', async ({ search, active }, callback) => {
    const { Address, Client } = models;

    const where = {
      [Op.or]: [
        { id: _.toInteger(search) || 0 },
        { nome_razao: { [Op.like]: `%${_.toUpper(_.toString(search))}%` } },
        { fantasia: { [Op.like]: `%${_.toUpper(_.toString(search))}%` } },
        { cnpj_cpf: { [Op.like]: `${_.toString(search)}%` } },
        { ie_rg: { [Op.like]: `${_.toString(search)}%` } },
        { inscricao_municipal: { [Op.like]: `${_.toString(search)}%` } },
        { email: { [Op.like]: `${_.toLower(_.toString(search))}%` } },
        { email_secundario: { [Op.like]: `${_.toLower(_.toString(search))}%` } },
      ],
    };

    if (typeof active === 'boolean') {
      where.ativo = active;
    }

    try {
      const clients = await Client.findAll({
        where,
        attributes: [
          'id', ['nome_razao', 'reasonName'], ['fantasia', 'fantasy'],
          ['cnpj_cpf', 'cnpjCpf'], ['ie_rg', 'ieRg'],
          ['inscricao_municipal', 'municipalRegistration'], 'email',
          ['email_secundario', 'emailSecondary'], ['telefone', 'phone'],
          ['celular', 'cell'], ['nome_contato', 'contactName'], ['endereco_id', 'addressId'],
          ['ativo', 'active'],
        ],
        order: [['id', 'ASC']],
        raw: true,
      });

      await Promise.all(clients.map(async (client) => {
        client.address = await Address.findOne({
          where: { id: client.addressId },
          attributes: [
            'id', ['logradouro', 'street'], ['numero', 'number'],
            ['bairro', 'district'], ['municipio', 'city'], 'uf', ['pais', 'country'],
            'cep', ['complemento', 'complement'],
          ],
          raw: true,
        });
      }));

      callback(null, clients);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });
};
