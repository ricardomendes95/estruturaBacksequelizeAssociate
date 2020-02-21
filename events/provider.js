const _ = require('lodash');
const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');
const { Sequelize, Op } = require('sequelize');
const { cnpj, cpf } = require('cpf-cnpj-validator');

module.exports = (emitter, models) => {
  emitter.on('provider::create', async (params, callback) => {
    const { Address, Provider } = models;

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

    const documentExists = await Provider.findOne({
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

    try {
      const provider = await Provider.create({
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

      callback(null, provider.id);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });

  emitter.on('provider::update', async (params, callback) => {
    const { Address, Provider } = models;

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

    const provider = await Provider.findOne({
      where: { id: params.id },
    });

    if (!provider) {
      callback({
        id: 'Fornecedor não encontrado',
      });

      return;
    }

    if (provider.cnpj_cpf !== params.cnpjCpf) {
      const documentExists = await Provider.findOne({
        where: { cnpj_cpf: params.cnpjCpf },
      });

      if (documentExists) {
        callback({
          cnpjCpf: 'Já existe um cadastro para este documento',
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
      await Provider.update({
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
      }, {
        where: { id: params.id },
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }

    callback(null, true);
  });

  emitter.on('provider::toggleStatus', async (params, callback) => {
    const { Provider } = models;

    try {
      await Provider.update({
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

  emitter.on('provider::nextId', async (params, callback) => {
    const { Provider } = models;

    try {
      const lastProvider = await Provider.findOne({
        attributes: ['id'],
        order: [['id', 'DESC']],
        raw: true,
      });

      if (lastProvider) {
        callback(null, lastProvider.id + 1);
        return;
      }

      callback(null, 1);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });

  emitter.on('provider::findById', async ({ id }, callback) => {
    const { Provider, Address } = models;

    try {
      const provider = await Provider.findOne({
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

      if (!provider) {
        callback({
          id: 'Fornecedor não encontrado',
        });

        return;
      }

      const address = await Address.findOne({
        where: { id: provider.addressId },
        attributes: [
          'id', ['logradouro', 'street'], ['numero', 'number'],
          ['bairro', 'district'], ['municipio', 'city'], 'uf', ['pais', 'country'],
          'cep', ['complemento', 'complement'],
        ],
        raw: true,
      });

      provider.address = address;

      callback(null, provider);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });

  emitter.on('provider::all', async ({ search, active }, callback) => {
    const { Address, Provider } = models;

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
      const providers = await Provider.findAll({
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

      await Promise.all(providers.map(async (provider) => {
        provider.address = await Address.findOne({
          where: { id: provider.addressId },
          attributes: [
            'id', ['logradouro', 'street'], ['numero', 'number'],
            ['bairro', 'district'], ['municipio', 'city'], 'uf', ['pais', 'country'],
            'cep', ['complemento', 'complement'],
          ],
          raw: true,
        });
      }));

      callback(null, providers);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });
};
