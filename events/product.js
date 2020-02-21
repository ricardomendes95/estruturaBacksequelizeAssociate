const _ = require('lodash');
const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');
const { Sequelize, Op } = require('sequelize');

module.exports = (emitter, models) => {
  emitter.on('product::create', async (params, callback) => {
    const { Product, Barcode } = models;

    const sanitizeRules = {
      description: 'trim|upper_case',
      reference: 'trim|upper_case',
      providerCode: 'trim',
      ncm: 'trim',
      cest: 'trim',
      scaleLabel: 'trim|upper_case',
      cstCsosn: 'trim',
      cstPisCofinsEntry: 'trim',
      cstPisCofinsOutput: 'trim',
      cstIpiEntry: 'trim',
      cstIpiOutput: 'trim',
      ipiFraming: 'trim',
      merchandiseType: 'trim|upper_case',
    };

    const rules = {
      description: 'required',
      unitId: 'required|integer',
      ncm: 'required',
      scaleProduct: 'boolean',
      cstCsosn: 'required',
      cfopEntry: 'required|integer|under:4000',
      cfopOutput: 'required|integer|above:4999',
      cstPisCofinsEntry: 'required',
      cstPisCofinsOutput: 'required',
      barcodes: 'required|array',
    };

    const messages = {
      required: 'Você deve preencher este campo',
      under: (field, rule, number) => 'Este número não corresponde a um cfop de entrada',
      above: (field, rule, number) => 'Este número não corresponde a um cfop de saída',
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

    let transaction;

    try {
      transaction = await models.sequelize.transaction();

      const product = await Product.create({
        descricao: params.description,
        referencia: params.reference || null,
        codigo_fornecedor: params.providerCode || null,
        unidade_id: params.unitId,
        unidade_fornecedor_id: params.unitProviderId || null,
        quantidade: params.amount || 0,
        quantidade_fornecedor: params.amountProvider || null,
        ncm: _.toString(params.ncm).replace(/\D/g, ''),
        cest: params.cest || null,
        grupo_id: params.groupId || null,
        subgrupo_id: params.subgroupId || null,
        departamento_id: params.departmentId || null,
        preco_custo: params.priceCost || null,
        preco_venda: params.salePrice || null,
        margem: params.margin || null,
        peso_liquido: params.netWeight || null,
        peso_bruto: params.grossWeight || null,
        produto_balanca: params.scaleProduct || false,
        etiqueta_balanca: params.scaleLabel || null,
        cst_csosn: params.cstCsosn,
        cfop_entrada: params.cfopEntry,
        cfop_saida: params.cfopOutput,
        cst_pis_cofins_entrada: params.cstPisCofinsEntry,
        cst_pis_cofins_saida: params.cstPisCofinsOutput,
        natureza_receita: params.natureRecipe || null,
        pis_entrada: params.pisEntry || null,
        pis_saida: params.pisOutput || null,
        cofins_entrada: params.cofinsEntry || null,
        cofins_saida: params.cofinsOutput || null,
        cst_ipi_entrada: params.cstIpiEntry,
        cst_ipi_saida: params.cstIpiOutput,
        ipi_entrada: params.ipiEntry || 0,
        ipi_saida: params.ipiOutput || 0,
        ipi_enquadramento: params.ipiFraming,
        tipo_mercadoria: params.merchandiseType,
        ativo: true,
      }, { transaction });

      for (const barcode of params.barcodes) {
        await Barcode.create({
          produto_id: product.id,
          codigo: barcode.barcode,
          principal: barcode.main,
          quantidade: barcode.amount,
          preco: _.toString(barcode.price).replace(/[^0-9,]/g, '').replace(',', '.'),
        }, { transaction });
      }

      await transaction.commit();
      callback(null, product.id);
    } catch (err) {
      callback('Algo não saiu como esperado');

      if (transaction) {
        await transaction.rollback();
      }

      throw err;
    }
  });

  emitter.on('product::update', async (params, callback) => {
    const { Product, Barcode } = models;

    const sanitizeRules = {
      description: 'trim|upper_case',
      reference: 'trim|upper_case',
      providerCode: 'trim',
      ncm: 'trim',
      cest: 'trim',
      scaleLabel: 'trim|upper_case',
      cstCsosn: 'trim',
      cstPisCofinsEntry: 'trim',
      cstPisCofinsOutput: 'trim',
      cstIpiEntry: 'trim',
      cstIpiOutput: 'trim',
      ipiFraming: 'trim',
      merchandiseType: 'trim|upper_case',
    };

    const rules = {
      id: 'required|integer',
      description: 'required',
      unitId: 'required|integer',
      ncm: 'required',
      scaleProduct: 'boolean',
      cstCsosn: 'required',
      cfopEntry: 'required|integer|under:4000',
      cfopOutput: 'required|integer|above:4999',
      cstPisCofinsEntry: 'required',
      cstPisCofinsOutput: 'required',
      barcodes: 'required|array',
    };

    const messages = {
      required: 'Você deve preencher este campo',
      under: (field, rule, number) => 'Este número não corresponde a um cfop de entrada',
      above: (field, rule, number) => 'Este número não corresponde a um cfop de saída',
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

    const product = await Product.findOne({
      where: { id: params.id },
    });

    if (!product) {
      callback({
        id: 'Produto não encontrado',
      });

      return;
    }

    let transaction;

    try {
      transaction = await models.sequelize.transaction();

      await product.update({
        descricao: params.description,
        referencia: params.reference || null,
        codigo_fornecedor: params.providerCode || null,
        unidade_id: params.unitId,
        unidade_fornecedor_id: params.unitProviderId || null,
        quantidade: params.amount || 0,
        quantidade_fornecedor: params.amountProvider || null,
        ncm: _.toString(params.ncm).replace(/\D/g, ''),
        cest: params.cest || null,
        grupo_id: params.groupId || null,
        subgrupo_id: params.subgroupId || null,
        departamento_id: params.departmentId || null,
        preco_custo: params.priceCost || null,
        preco_venda: params.salePrice || null,
        margem: params.margin || null,
        peso_liquido: params.netWeight || null,
        peso_bruto: params.grossWeight || null,
        produto_balanca: params.scaleProduct || false,
        etiqueta_balanca: params.scaleLabel || null,
        cst_csosn: params.cstCsosn,
        cfop_entrada: params.cfopEntry,
        cfop_saida: params.cfopOutput,
        cst_pis_cofins_entrada: params.cstPisCofinsEntry,
        cst_pis_cofins_saida: params.cstPisCofinsOutput,
        natureza_receita: params.natureRecipe || null,
        pis_entrada: params.pisEntry || null,
        pis_saida: params.pisOutput || null,
        cofins_entrada: params.cofinsEntry || null,
        cofins_saida: params.cofinsOutput || null,
        cst_ipi_entrada: params.cstIpiEntry,
        cst_ipi_saida: params.cstIpiOutput,
        ipi_entrada: params.ipiEntry || 0,
        ipi_saida: params.ipiOutput || 0,
        ipi_enquadramento: params.ipiFraming,
        tipo_mercadoria: params.merchandiseType,
      }, { transaction });

      for (const barcode of params.barcodes) {
        barcode.barcode = _.toString(barcode.barcode).replace(/\D/g, '');

        if (barcode.barcode) {
          if (barcode.id) {
            await Barcode.update({
              codigo: barcode.barcode,
              principal: barcode.main,
              quantidade: barcode.amount,
              preco: _.toString(barcode.price).replace(/[^0-9,]/g, '').replace(',', '.'),
            }, {
              where: { id: barcode.id },
              transaction,
            });
          } else {
            await Barcode.create({
              produto_id: product.id,
              codigo: barcode.barcode,
              principal: barcode.main,
              quantidade: barcode.amount,
              preco: _.toString(barcode.price).replace(/[^0-9,]/g, '').replace(',', '.'),
            }, { transaction });
          }
        } else {
          await Barcode.destroy({
            where: {
              id: barcode.id,
            },
          }, { transaction });
        }
      }

      await transaction.commit();
      callback(null, true);
    } catch (err) {
      callback('Algo não saiu como esperado');

      if (transaction) {
        await transaction.rollback();
      }

      throw err;
    }
  });

  emitter.on('product::toggleStatus', async (params, callback) => {
    const { Product } = models;

    try {
      await Product.update({
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

  emitter.on('product::nextId', async (params, callback) => {
    const { Product } = models;

    try {
      const lastProduct = await Product.findOne({
        attributes: ['id'],
        order: [['id', 'DESC']],
        raw: true,
      });

      if (lastProduct) {
        callback(null, lastProduct.id + 1);
        return;
      }

      callback(null, 1);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });

  emitter.on('product::findByBarcode', async (params, callback) => {
    const { Barcode, Product, Unit, Group, Subgroup, Department } = models;

    const rules = {
      barcode: 'required',
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

    try {
      const barcode = await Barcode.findOne({
        where: { codigo: params.barcode },
        attributes: [
          'id', ['produto_id', 'productId'], ['codigo', 'barcode'], ['principal', 'main'],
          ['quantidade', 'amount'], ['preco', 'price'],
        ],
        raw: true,
      });

      if (!barcode) {
        callback({
          barcode: 'Código de barras não encontrado',
        });

        return;
      }

      const product = await Product.findOne({
        where: { id: barcode.productId },
        attributes: [
          'id', ['descricao', 'description'], ['referencia', 'reference'],
          ['codigo_fornecedor', 'providerCode'], ['unidade_id', 'unitId'],
          ['unidade_fornecedor_id', 'unitProviderId'], ['quantidade', 'amount'],
          ['quantidade_fornecedor', 'amountProvider'], 'ncm', 'cest',
          ['grupo_id', 'groupId'], ['subgrupo_id', 'subgroupId'], ['departamento_id', 'departmentId'],
          ['preco_custo', 'priceCost'], ['preco_venda', 'salePrice'], ['margem', 'margin'],
          ['peso_liquido', 'netWeight'], ['peso_bruto', 'grossWeight'],
          ['produto_balanca', 'scaleProduct'], ['etiqueta_balanca', 'scaleLabel'],
          ['cst_csosn', 'cstCsosn'], ['cfop_entrada', 'cfopEntry'],
          ['cfop_saida', 'cfopOutput'], ['cst_pis_cofins_entrada', 'cstPisCofinsEntry'],
          ['cst_pis_cofins_saida', 'cstPisCofinsOutput'], ['natureza_receita', 'natureRecipe'],
          ['pis_entrada', 'pisEntry'], ['pis_saida', 'pisOutput'],
          ['cofins_entrada', 'cofinsEntry'], ['cofins_saida', 'cofinsOutput'],
          ['cst_ipi_entrada', 'cstIpiEntry'], ['cst_ipi_saida', 'cstIpiOutput'],
          ['ipi_entrada', 'ipiEntry'], ['ipi_saida', 'ipiOutput'],
          ['ipi_enquadramento', 'ipiFraming'], ['tipo_mercadoria', 'merchandiseType'],
          ['ativo', 'active'],
        ],
        raw: true,
      });

      product.unit = await Unit.findOne({
        where: { id: product.unitId },
        attributes: ['id', ['sigla', 'initials'], ['descricao', 'description']],
        raw: true,
      });

      product.unitProvider = await Unit.findOne({
        where: { id: product.unitProviderId },
        attributes: ['id', ['sigla', 'initials'], ['descricao', 'description']],
        raw: true,
      });

      product.group = await Group.findOne({
        where: { id: product.groupId },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });

      product.subgroup = await Subgroup.findOne({
        where: { id: product.subgroupId },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });

      product.department = await Department.findOne({
        where: { id: product.departmentId },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });

      product.barcodes = await Barcode.findAll({
        where: { produto_id: product.id },
        attributes: [
          'id', ['produto_id', 'productId'], ['codigo', 'barcode'], ['principal', 'main'],
          ['quantidade', 'amount'], ['preco', 'price'],
        ],
        raw: true,
      });

      callback(null, product);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });

  emitter.on('product::findById', async (params, callback) => {
    const { Product, Unit, Group, Subgroup, Department, Barcode } = models;

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

    try {
      const product = await Product.findOne({
        where: { id: params.id },
        attributes: [
          'id', ['descricao', 'description'], ['referencia', 'reference'],
          ['codigo_fornecedor', 'providerCode'], ['unidade_id', 'unitId'],
          ['unidade_fornecedor_id', 'unitProviderId'], ['quantidade', 'amount'],
          ['quantidade_fornecedor', 'amountProvider'], 'ncm', 'cest',
          ['grupo_id', 'groupId'], ['subgrupo_id', 'subgroupId'], ['departamento_id', 'departmentId'],
          ['preco_custo', 'priceCost'], ['preco_venda', 'salePrice'], ['margem', 'margin'],
          ['peso_liquido', 'netWeight'], ['peso_bruto', 'grossWeight'],
          ['produto_balanca', 'scaleProduct'], ['etiqueta_balanca', 'scaleLabel'],
          ['cst_csosn', 'cstCsosn'], ['cfop_entrada', 'cfopEntry'],
          ['cfop_saida', 'cfopOutput'], ['cst_pis_cofins_entrada', 'cstPisCofinsEntry'],
          ['cst_pis_cofins_saida', 'cstPisCofinsOutput'], ['natureza_receita', 'natureRecipe'],
          ['pis_entrada', 'pisEntry'], ['pis_saida', 'pisOutput'],
          ['cofins_entrada', 'cofinsEntry'], ['cofins_saida', 'cofinsOutput'],
          ['cst_ipi_entrada', 'cstIpiEntry'], ['cst_ipi_saida', 'cstIpiOutput'],
          ['ipi_entrada', 'ipiEntry'], ['ipi_saida', 'ipiOutput'],
          ['ipi_enquadramento', 'ipiFraming'], ['tipo_mercadoria', 'merchandiseType'],
          ['ativo', 'active'],
        ],
        raw: true,
      });

      product.unit = await Unit.findOne({
        where: { id: product.unitId },
        attributes: ['id', ['sigla', 'initials'], ['descricao', 'description']],
        raw: true,
      });

      product.unitProvider = await Unit.findOne({
        where: { id: product.unitProviderId },
        attributes: ['id', ['sigla', 'initials'], ['descricao', 'description']],
        raw: true,
      });

      product.group = await Group.findOne({
        where: { id: product.groupId },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });

      product.subgroup = await Subgroup.findOne({
        where: { id: product.subgroupId },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });

      product.department = await Department.findOne({
        where: { id: product.departmentId },
        attributes: ['id', ['nome', 'name']],
        raw: true,
      });

      product.barcodes = await Barcode.findAll({
        where: { produto_id: product.id },
        attributes: [
          'id', ['produto_id', 'productId'], ['codigo', 'barcode'], ['principal', 'main'],
          ['quantidade', 'amount'], ['preco', 'price'],
        ],
        raw: true,
      });

      callback(null, product);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });

  emitter.on('product::all', async ({ search, active }, callback) => {
    const { Product, Barcode, Unit, Group, Subgroup, Department } = models;

    const where = {
      [Op.or]: [
        { id: _.toInteger(search) || 0 },
        { descricao: { [Op.like]: `%${_.toUpper(_.toString(search))}%` } },
        { referencia: { [Op.like]: `%${_.toLower(_.toString(search))}%` } },
        { codigo_fornecedor: { [Op.like]: `${_.toString(search)}%` } },
        { ncm: { [Op.like]: `${_.toString(search)}%` } },
      ],
    };

    const barcodes = await Barcode.findAll({
      where: { codigo: { [Op.like]: `%${_.toString(search)}%` } },

      attributes: [
        'id', ['produto_id', 'productId'], ['codigo', 'barcode'], ['principal', 'main'],
        ['quantidade', 'amount'], ['preco', 'price'],
      ],

      raw: true,
    });

    for (const barcode of barcodes) {
      where[Op.or].push({
        id: barcode.productId,
      });
    }

    if (typeof active === 'boolean') {
      where.ativo = active;
    }

    try {
      const products = await Product.findAll({
        where,
        attributes: [
          'id', ['descricao', 'description'], ['referencia', 'reference'],
          ['codigo_fornecedor', 'providerCode'], ['unidade_id', 'unitId'],
          ['unidade_fornecedor_id', 'unitProviderId'], ['quantidade', 'amount'],
          ['quantidade_fornecedor', 'amountProvider'], 'ncm', 'cest',
          ['grupo_id', 'groupId'], ['subgrupo_id', 'subgroupId'], ['departamento_id', 'departmentId'],
          ['preco_custo', 'priceCost'], ['preco_venda', 'salePrice'], ['margem', 'margin'],
          ['peso_liquido', 'netWeight'], ['peso_bruto', 'grossWeight'],
          ['produto_balanca', 'scaleProduct'], ['etiqueta_balanca', 'scaleLabel'],
          ['cst_csosn', 'cstCsosn'], ['cfop_entrada', 'cfopEntry'],
          ['cfop_saida', 'cfopOutput'], ['cst_pis_cofins_entrada', 'cstPisCofinsEntry'],
          ['cst_pis_cofins_saida', 'cstPisCofinsOutput'], ['natureza_receita', 'natureRecipe'],
          ['pis_entrada', 'pisEntry'], ['pis_saida', 'pisOutput'],
          ['cofins_entrada', 'cofinsEntry'], ['cofins_saida', 'cofinsOutput'],
          ['cst_ipi_entrada', 'cstIpiEntry'], ['cst_ipi_saida', 'cstIpiOutput'],
          ['ipi_entrada', 'ipiEntry'], ['ipi_saida', 'ipiOutput'],
          ['ipi_enquadramento', 'ipiFraming'], ['tipo_mercadoria', 'merchandiseType'],
          ['ativo', 'active'],
        ],
        order: [['id', 'ASC']],
        raw: true,
      });

      await Promise.all(products.map(async (product) => {
        product.unit = await Unit.findOne({
          where: { id: product.unitId },
          attributes: ['id', ['sigla', 'initials'], ['descricao', 'description']],
          raw: true,
        });

        product.unitProvider = await Unit.findOne({
          where: { id: product.unitProviderId },
          attributes: ['id', ['sigla', 'initials'], ['descricao', 'description']],
          raw: true,
        });

        product.group = await Group.findOne({
          where: { id: product.groupId },
          attributes: ['id', ['nome', 'name']],
          raw: true,
        });

        product.subgroup = await Subgroup.findOne({
          where: { id: product.subgroupId },
          attributes: ['id', ['nome', 'name']],
          raw: true,
        });

        product.department = await Department.findOne({
          where: { id: product.departmentId },
          attributes: ['id', ['nome', 'name']],
          raw: true,
        });

        product.barcodes = await Barcode.findAll({
          where: { produto_id: product.id },
          attributes: [
            'id', ['produto_id', 'productId'], ['codigo', 'barcode'], ['principal', 'main'],
            ['quantidade', 'amount'], ['preco', 'price'],
          ],
          raw: true,
        });
      }));

      callback(null, products);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });
};
