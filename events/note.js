const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { sanitize } = require('indicative/sanitizer');
const { validateAll } = require('indicative/validator');
const { Sequelize, Op } = require('sequelize');
const xml2js = require('xml2js');
const { cnpj, cpf } = require('cpf-cnpj-validator');


module.exports = (emitter, models) => {
  const { Provider, Carrier, IcmsTotal, Charge, Identification,
    Note, NoteVolume, AdditionalInformation, NoteShipping,
    IcmsTransport, TransportVehicle, Payment, ProductNote,
    Ipi, Icms, Pis, Cofins, Duplicate, Card } = models;

  const sanitizeRules = {
    // note
    chave: 'trim',
    modFrete: 'trim',
    vtottrib: 'trim',
    Identification_id: 'trim',
    IcmsTotal_id: 'trim',
    Provider_id: 'trim',
    Carrier_id: 'trim',
    Charge_id: 'trim',
    Payment_id: 'trim',

    // icms total
    vbc: 'trim',
    vbcst: 'trim',
    vcofins: 'trim',
    vdesc: 'trim',
    vfcp: 'trim',
    vfcpst: 'trim',
    vfcpstret: 'trim',
    vfcpufdest_opc: 'trim',
    vfcpufdest_opc: 'trim',
    vfrete: 'trim',
    vicms: 'trim',
    vicmsdeson: 'trim',
    vicmsufdest_opc: 'trim',
    vicmsufremet_opc: 'trim',
    vii: 'trim',
    vipi: 'trim',
    vipidevol: 'trim',
    vnf: 'trim',
    voutro: 'trim',
    vpis: 'trim',
    vprod: 'trim',
    vst: 'trim',
    vseg: 'trim',
    vtottrib: 'trim',

    // provider
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

    // charge
    nfat: 'trim',
    vorig: 'trim',
    vdesc: 'trim',
    vliq: 'trim',

    // duplicate
    ndup: 'trim|upper_case',
    dvenc: 'trim',
    vdup: 'trim',
    cobranca_id: 'trim',

    // payment
    indpag_opc: 'trim|upper_case',
    tpag: 'trim|upper_case',
    vpag: 'trim',
    tpintegra_opc: 'trim|upper_case',
    cnpj_opc: 'trim|upper_case',
    tband_opc: 'trim|upper_case',
    caut_opc: 'trim|upper_case',
    vtroco_opc: 'trim',

    // card
    cnpj: 'trim|upper_case',
    caut: 'trim|upper_case',
    tband: 'trim',
    tpintegra: 'trim|upper_case',

    // identification
    dv: 'trim',
    cmunfg: 'trim|upper_case',
    cnf: 'trim',
    cuf: 'trim',
    dhcont: 'trim|upper_case',
    dhemi: 'trim|upper_case',
    dhsaient: 'trim|upper_case',
    finnfe: 'trim|upper_case',
    iddest: 'trim',
    indfinal: 'trim',
    indpres: 'trim',
    mod: 'trim',
    nnf: 'trim',
    nfref: 'trim|upper_case',
    natope: 'trim|upper_case',
    procemi: 'trim',
    serie: 'trim',
    tpamb: 'trim',
    tpemis: 'trim',
    tpimp: 'trim',
    dhcont: 'trim|upper_case',
    tpnf: 'trim',
    verproc: 'trim|upper_case',
    x: 'trim|upper_case',
    xjust: 'trim|upper_case',

    // product_note
    cest_opc: 'trim|upper_case',
    cnpjfab_opc: 'trim|upper_case',
    di: 'trim|upper_case',
    detespecifico: 'trim|upper_case',
    nve_opc: 'trim|upper_case',
    cbenef_opc: 'trim|upper_case',
    cbenef_opc: 'trim|upper_case',
    cean: 'trim|upper_case',
    ceantrib: 'trim|upper_case',
    cprod: 'trim|upper_case',
    cfop: 'trim|upper_case',
    detexport_opc: 'trim|upper_case',
    indtot: 'trim|upper_case',
    margem: 'trim|upper_case',
    nfci_opc: 'trim|upper_case',
    nitemped: 'trim|upper_case',
    ncm: 'trim|upper_case',
    precovenda: 'trim|upper_case',
    qcom: 'trim|upper_case',
    qtrib: 'trim|upper_case',
    rastro_opc: 'trim|upper_case',
    ucom: 'trim|upper_case',
    utrib: 'trim|upper_case',
    vdesc: 'trim',
    vfrete: 'trim',
    vdesc: 'trim',
    voutro: 'trim',
    vdesc: 'trim',
    vprod: 'trim',
    vseg: 'trim',
    vuncom: 'trim',
    vuntrib: 'trim',
    xped: 'trim|upper_case',
    xprod: 'trim|upper_case',

    // icms
    cst: 'trim|upper_case',
    ufst: 'trim|upper_case',
    modbc: 'trim',
    modbcst: 'trim',
    motdesicms: 'trim',
    orig: 'trim|upper_case',
    pbcop: 'trim',
    pcredsn: 'trim',
    pdif: 'trim',
    pfcp: 'trim',
    pfcpst: 'trim',
    pfcpstret: 'trim',
    picms: 'trim',
    picmsst: 'trim',
    pmvast: 'trim',
    predbc: 'trim',
    predbcst: 'trim',
    pst: 'trim',
    vbc: 'trim',
    vbcfcp: 'trim',
    vbcfcpst: 'trim',
    vbcfcpstret: 'trim',
    vbcst: 'trim',
    vbcstdest: 'trim',
    vbcstret: 'trim',
    vcredicmssn: 'trim',
    vfcp: 'trim',
    vfcpst: 'trim',
    vfcpstret: 'trim',
    vicms: 'trim',
    vicmsdeson: 'trim',
    vicmsdif: 'trim',
    vicmsop: 'trim',
    vicmsst: 'trim',
    vicmsstdest: 'trim',
    vicmsstret: 'trim',
    // pis
    cst: 'trim|upper_case',
    ppis: 'trim',
    qbcprod: 'trim',
    valiqprod: 'trim',
    vbc: 'trim',
    vpis: 'trim',
    // cofins
    cst: 'trim|upper_case',
    pcofins: 'trim',
    qbcprod: 'trim',
    valiqprod: 'trim',
    vbc: 'trim',
    vcofins: 'trim',
    // ipi
    cnpjprod: 'trim|upper_case',
    cenq: 'trim|upper_case',
    cselo: 'trim|upper_case',
    pipi: 'trim',
    qselo: 'trim',
    qunid: 'trim',
    vbc: 'trim',
    vipi: 'trim',
    vunid: 'trim',

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

    // note
    chave: 'required',
    modFrete: 'required',
    status: 'boolean',
    vtottrib: 'required',
    identification_id: 'required',
    icmsTotal_id: 'required',
    provider_id: 'required',
    carrier_id: 'required',

    // provider
    fantasy: 'required',
    cnpjCpf: 'required',


    // identification
    cnf: 'required',
    dhemi: 'required',
    dhsaient: 'required',
    nnf: 'required',
    natope: 'required',
    serie: 'required',

    // product_note
    cprod: 'required',
    cfop: 'required',
    ncm: 'required',
    ucom: 'required',
    utrib: 'required',
    vprod: 'required',
    vuncom: 'required',

  };

  function findCnpjCarrier(params) {
    return new Promise((resolve, reject) => {
      emitter.emit('util::checkCnpj', params, (err, car) => {
        if (err) {
          reject(err)
        }
        const carrier = {};
        carrier['reasonName'] = car.name;
        carrier['fantasy'] = car.fantasy;
        carrier['email'] = car.email;
        [carrier['phone'] = null, carrier['cell'] = null] = car.phone;
        carrier['street'] = car.address.street;
        carrier['number'] = car.address.number;
        carrier['district'] = car.address.district;
        carrier['city'] = car.address.city;
        carrier['uf'] = car.address.uf;
        carrier['country'] = car.address.country;
        carrier['complement'] = car.address.complement;
        carrier['cep'] = car.address.cep;
        resolve(carrier)
      });
    })

  }

  function createCarrier(carrier) {
    return new Promise((resolve, reject) => {
      emitter.emit('carrier::create', carrier, (err, result) => {
        if (err) {
          reject(err);
        }
        carrier['id'] = result;
        resolve(carrier);
      })
    })

  }

  function createProvider(provider) {
    return new Promise((resolve, reject) => {
      emitter.emit('provider::create', provider, (err, result) => {
        if (err) {
          reject(err);
        }
        provider['id'] = result;
        resolve(provider);
      })
    })

  }

  const noteTypes = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '..', 'storage', 'notetypes.json'),
      'utf8',
    ),
  );


  function padronize(params) {
    for (item in params) {
      if (item === undefined) {
        item = null;
      }
      if (typeof item === 'object') {
        for (item2 in item) {
          if (item2 === undefined) {
            item2 = null;
          }
          if (typeof item2 === 'object') {
            for (item3 in item2) {
              if (item3 === undefined) {
                item3 = null;
              }
              if (typeof item3 === 'object') {
                for (item4 in item3) {
                  if (item4 === undefined) {
                    item4 = null;
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  function padronizeCNPJ(params) {
    params.cnpj = cnpj.format(params.cnpj);
    // se nao encontrar um - é pq ele é cpf entao formata no tipo cpf
    if (!params.cnpj.match(/-/g)) {
      params.cnpj = cpf.format(params.cnpj);
    }
  }

  const messages = {
    required: 'Você deve preencher este campo',
  };

  emitter.on('note::sendFile', async (params, callback) => {
    let infNfe = params.xmlString.substring(params.xmlString.indexOf('<infNFe'), params.xmlString.indexOf('</infNFe>') + 9);
    const infResult = await xml2js.parseStringPromise(infNfe);
    const chave = infResult.infNFe.$.Id.replace(/[^\d]+/g, '');

    const exist = await Note.findOne({
      where: { chave }, raw: true
    });
    if (!exist) {
      let transaction;
      try {
        transaction = await models.sequelize.transaction();
        let total = params.xmlString.substring(params.xmlString.indexOf('<total>'), params.xmlString.indexOf('</total>') + 8);
        let cobranca = params.xmlString.substring(params.xmlString.indexOf('<cobr>'), params.xmlString.indexOf('</cobr>') + 7);
        let identificacao = params.xmlString.substring(params.xmlString.indexOf('<ide>'), params.xmlString.indexOf('</ide>') + 6);
        let emitente = params.xmlString.substring(params.xmlString.indexOf('<emit>'), params.xmlString.indexOf('</emit>') + 7);
        let transportadora = params.xmlString.substring(params.xmlString.indexOf('<transp>'), params.xmlString.indexOf('</transp>') + 9);

        let icmsTotal = {};
        let charge = {};
        let identification = {};
        let note = {};
        let infAditional = {};
        let provider = {};
        let carrier = {};
        let noteShipping = {};
        let objCallback = {};
        let icmsTransport = {};
        let veicTransp = {};
        let volume = {};

        const providerResult = await xml2js.parseStringPromise(emitente);
        provider = {
          reasonName: providerResult.emit.xNome[0] || null,
          fantasy: providerResult.emit.xFant ? providerResult.emit.xFant[0] : null,
          cnpjCpf: providerResult.emit.CNPJ ? providerResult.emit.CNPJ[0] : providerResult.emit.CPF ? providerResult.emit.CPF[0] : null,
          ieRg: providerResult.emit.IE ? providerResult.emit.IE[0] : null,
          municipalRegistration: providerResult.emit.IM ? providerResult.emit.IM[0] : null,
          phone: providerResult.emit.fone ? providerResult.emit.fone[0] : null,

          street: providerResult.emit.enderEmit[0].xLgr[0],
          number: providerResult.emit.enderEmit[0].nro ? providerResult.emit.enderEmit[0].nro[0] : null,
          district: providerResult.emit.enderEmit[0].xBairro[0],
          city: providerResult.emit.enderEmit[0].xMun[0],
          uf: providerResult.emit.enderEmit[0].UF[0],
          country: providerResult.emit.enderEmit[0].xPais[0],
          cep: providerResult.emit.enderEmit[0].CEP[0],
        }
        const paramsProvider = { cnpj: provider.cnpjCpf };
        padronizeCNPJ(paramsProvider)
        const cnpjExist = await Provider.findOne({
          where: { cnpj_cpf: paramsProvider.cnpj },
        });
        if (!cnpjExist) {
          provider = await createProvider(provider);
        } else {
          provider['id'] = cnpjExist.id;
          objCallback['provider'] = provider;
        }

        const carrierResult = await xml2js.parseStringPromise(transportadora);
        for (trans in carrierResult.transp) {
          if (trans === 'modFrete') {
            noteShipping[trans.toLowerCase()] = carrierResult.transp[trans][0];
            continue;
          }
          if (trans === 'transporta') {
            const params = { cnpj: carrierResult.transp.transporta[0].CNPJ[0] };
            //consulta na api da aws os dados da tranportadora
            carrier = await findCnpjCarrier(params);
            padronizeCNPJ(params);
            carrier['cnpjCpf'] = params.cnpj;
            carrier['ieRg'] = carrierResult.transp.transporta[0].IE[0];
            const carrierExist = await Carrier.findOne({
              where: { cnpj_cpf: params.cnpj }, raw: true
            });
            if (!carrierExist) {
              carrier = await createCarrier(carrier);
            } else {
              carrier['id'] = carrierExist.id;
              objCallback['carrier'] = carrier;
            }
            continue;
          }
          if (trans === 'retTransp') {
            for (icms in carrierResult.transp[trans][0]) {
              if (icms === 'CFOP') {
                icmsTransport[icms.toLowerCase()] = parseInt(carrierResult.transp[trans][0][icms][0], 10);
                continue;
              }
              if (icms === 'cMunFG') {
                icmsTransport[icms.toLowerCase()] = carrierResult.transp[trans][0][icms][0];
                continue;
              }
              icmsTransport[icms.toLowerCase()] = parseFloat(carrierResult.transp[trans][0][icms][0]);
            }
            icmsTransport = await IcmsTransport.create(icmsTransport, { transaction });
            continue;
          }
          if (trans === 'vol') {
            for (vol in carrierResult.transp[trans][0]) {
              switch (noteTypes[vol.toLowerCase()]) {
                case 'integer':
                  volume[vol.toLowerCase()] = carrierResult.transp[trans][0][vol] ? parseInt(carrierResult.transp[trans][0][vol][0], 10) : null;
                  break;
                case 'decimal':
                  volume[vol.toLowerCase()] = carrierResult.transp[trans][0][vol] ? parseFloat(carrierResult.transp[trans][0][vol][0]) : null;
                  break;
                default:
                  volume[vol.toLowerCase()] = carrierResult.transp[trans][0][vol] ? carrierResult.transp[trans][0][vol][0] : null;
              }
            }
            volume = await NoteVolume.create(volume, { transaction });

          }

          if (trans === 'veicTransp') {
            for (veic in carrierResult.transp[trans][0]) {
              veicTransp[veic.toLowerCase()] = carrierResult.transp[trans][0][veic][0];
            }
            veicTransp = veicTransp.id
              ? await TransportVehicle.create(veicTransp, { transaction })
              : await TransportVehicle.update(veicTransp, { transaction });
          }
          if (trans === 'reboque') {
            veicTransp['placa_reboque'] = carrierResult.transp[trans][0]['placa'][0];
            veicTransp['uf_reboque'] = carrierResult.transp[trans][0]['UF'][0];
            veicTransp['rntc_reboque'] = carrierResult.transp[trans][0]['RNTC'][0];
            veicTransp = veicTransp.id
              ? await TransportVehicle.create(veicTransp, { transaction })
              : await TransportVehicle.update(veicTransp, { transaction });
          }
        }
        noteShipping['transportadora_id'] = carrier.id;
        noteShipping['icms_transporte_id'] = icmsTransport.id;
        noteShipping['volumes_nota_id'] = volume.id;
        noteShipping['veiculo_transporte_id'] = veicTransp.id;
        noteShipping = await NoteShipping.create(noteShipping, { transaction })

        const icmsTotalResult = await xml2js.parseStringPromise(total);
        const icms = icmsTotalResult.total.ICMSTot[0];
        for (item in icms) {
          icmsTotal[item.toLowerCase()] = icms[item] ? parseFloat(icms[item][0]) : null;
        }
        icmsTotal = await IcmsTotal.create(icmsTotal, { transaction })

        const cobrancaResult = await xml2js.parseStringPromise(cobranca);
        const cob = cobrancaResult.cobr.fat[0];
        const dup = cobrancaResult.cobr.dup;
        for (item in cob) {
          switch (noteTypes[item.toLowerCase()]) {
            case 'integer':
              charge[item.toLowerCase()] = cob[item] ? parseInt(cob[item][0]) : null;
              break;
            case 'decimal':
              charge[item.toLowerCase()] = cob[item] ? parseFloat(cob[item][0]) : null;
              break;
            default:
              charge[item.toLowerCase()] = cob[item] ? cob[item][0] : null;
          }
        }
        charge = await Charge.create(charge, { transaction });
        for (d of dup) {
          const duplicate = { cobranca_id: charge.id };

          for (item in d) {
            switch (noteTypes[item.toLowerCase()]) {
              case 'decimal':
                duplicate[item.toLowerCase()] = d[item] ? parseFloat(d[item][0]) : null;
                break;
              case 'date':
                duplicate[item.toLowerCase()] = d[item] ? Date.parse(d[item][0]) : null;
                break;
              default:
                duplicate[item.toLowerCase()] = d[item] ? d[item][0] : null;
            }
          }
          await Duplicate.create(duplicate, { transaction });
        }

        const ideResult = await xml2js.parseStringPromise(identificacao);
        const ide = ideResult.ide;
        for (item in ide) {
          switch (noteTypes[item.toLowerCase()]) {
            case 'integer':
              identification[item.toLowerCase()] = ide[item] ? parseInt(ide[item][0], 10) : null;
              break;
            case 'decimal':
              identification[item.toLowerCase()] = ide[item] ? parseFloat(ide[item][0]) : null;
              break;
            case 'date':
              identification[item.toLowerCase()] = ide[item] ? Date.parse(ide[item][0]) : null;
              break;
            default:
              identification[item.toLowerCase()] = ide[item] ? ide[item][0] : null;
          }
        }
        identification = await Identification.create(identification, { transaction })

        const inf = infResult.infNFe.infAdic ? infResult.infNFe.infAdic[0] : null;
        if (inf) {
          infAditional['infadfisco'] = inf.infAdFisco ? inf.infAdFisco[0] : null;
          infAditional['infcpl'] = inf.infCpl ? inf.infCpl[0] : null;
          infAditional = await AdditionalInformation.create(infAditional, { transaction })
        }

        note['chave'] = chave;
        const products = infResult.infNFe.det;

        for (item of products) {
          let productFinal = {};
          let icmsFinal = {};
          let ipi = {};
          let pis = {};
          let cofins = {};
          for (detProd in item.prod[0]) {
            switch (noteTypes[detProd.toLowerCase()]) {
              case 'integer':
                productFinal[detProd.toLowerCase()] = item.prod[0][detProd] ? parseInt(item.prod[0][detProd][0], 10) : null;
                break;
              case 'decimal':
                productFinal[detProd.toLowerCase()] = item.prod[0][detProd] ? parseFloat(item.prod[0][detProd][0]) : null;
                break;
              case 'date':
                productFinal[detProd.toLowerCase()] = item.prod[0][detProd] ? Date.parse(item.prod[0][detProd][0]) : null;
                break;
              default:
                productFinal[detProd.toLowerCase()] = item.prod[0][detProd][0] || null;
            }
          }
          //console.log(item.imposto[0].IPI[0]);
          for (impIcms of item.imposto[0].ICMS) {
            for (icm in impIcms) {
              const icmsNote = impIcms[icm][0];
              for (i in icmsNote) {
                switch (noteTypes[i.toLowerCase()]) {
                  case 'integer':
                    icmsFinal[i.toLowerCase()] = icmsNote[i] ? parseInt(icmsNote[i][0], 10) : null;
                    break;
                  case 'decimal':
                    icmsFinal[i.toLowerCase()] = icmsNote[i] ? parseFloat(icmsNote[i][0]) : null;
                    break;
                  default:
                    icmsFinal[i.toLowerCase()] = icmsNote[i] ? icmsNote[i][0] : null;
                }
              }
            }
            icmsFinal = await Icms.create(icmsFinal, { transaction });
          }

          const ipiNote = item.imposto[0].IPI[0];
          for (impIpi in ipiNote) {
            if (impIpi === 'cEnq') {
              ipi[impIpi.toLowerCase()] = ipiNote[impIpi][0];
            } else {
              for (ip in ipiNote[impIpi][0]) {
                switch (noteTypes[ip.toLowerCase()]) {
                  case 'integer':
                    ipi[ip.toLowerCase()] = ipiNote[impIpi][0][ip] ? parseInt(ipiNote[impIpi][0][ip][0], 10) : null;
                    break;
                  case 'decimal':
                    ipi[ip.toLowerCase()] = ipiNote[impIpi][0][ip] ? parseFloat(ipiNote[impIpi][0][ip][0]) : null;
                    break;
                  default:
                    ipi[ip.toLowerCase()] = ipiNote[impIpi][0][ip] ? ipiNote[impIpi][0][ip][0] : null;
                }
              }
            }
            ipi = await Ipi.create(ipi, { transaction });
          }
          const pisNote = item.imposto[0].PIS[0];
          for (impPis in pisNote) {
            for (pi in pisNote[impPis][0]) {
              switch (noteTypes[pi.toLowerCase()]) {
                case 'integer':
                  pis[pi.toLowerCase()] = pisNote[impPis][0][pi] ? parseInt(pisNote[impPis][0][pi][0], 10) : null;
                  break;
                case 'decimal':
                  pis[pi.toLowerCase()] = pisNote[impPis][0][pi] ? parseFloat(pisNote[impPis][0][pi][0]) : null;
                  break;
                default:
                  pis[pi.toLowerCase()] = pisNote[impPis][0][pi] ? pisNote[impPis][0][pi][0] : null;
              }
            }
            pis = await Pis.create(pis, { transaction });
          }

          const cofinsNote = item.imposto[0].COFINS[0];
          for (impCofins in cofinsNote) {
            for (cof in cofinsNote[impCofins][0]) {
              switch (noteTypes[cof.toLowerCase()]) {
                case 'integer':
                  cofins[cof.toLowerCase()] = cofinsNote[impCofins][0][cof] ? parseInt(cofinsNote[impCofins][0][cof][0], 10) : null;
                  break;
                case 'decimal':
                  cofins[cof.toLowerCase()] = cofinsNote[impCofins][0][cof] ? parseFloat(cofinsNote[impCofins][0][cof][0]) : null;
                  break;
                default:
                  cofins[cof.toLowerCase()] = cofinsNote[impCofins][0][cof] ? cofinsNote[impCofins][0][cof][0] : null;
              }
            }
            cofins = await Cofins.create(cofins, { transaction });
          }
          productFinal['icms_id'] = icmsFinal.id;
          productFinal['pis_id'] = pis.id;
          productFinal['cofins_id'] = cofins.id;
          productFinal['ipi_id'] = ipi.id;
          productFinal['identificacao_id'] = identification.id;
          await ProductNote.create(productFinal, { transaction });
        }


        note['identificacao_id'] = identification.id;
        note['cobranca_id'] = charge.id;
        note['icms_total_id'] = icmsTotal.id;
        note['inf_adic_id'] = infAditional.id;
        note['transporte_id'] = noteShipping.id;
        note['fornecedor_id'] = provider.id;
        note['ismanual'] = false;
        note['type_note'] = 'ENTRADA';
        note['status'] = true;
        note['vtottrib'] = icmsTotal.vnf;

        note = await Note.create(note, { transaction });

        const paymentResult = await xml2js.parseStringPromise(infNfe);
        const paymentNote = paymentResult.infNFe.pag[0];
        for (detpag in paymentNote) {
          let cards = [];
          let payment = {};
          payment['nota_id'] = note.id;
          for (pay in paymentNote[detpag][0]) {
            if (pay === 'vPag') {
              payment[pay.toLowerCase()] = paymentNote[detpag][0][pay] ? parseFloat(paymentNote[detpag][0][pay][0]) : null;
              continue;
            }
            if (pay === 'card') {
              let card = {};
              for (c in paymentNote[detpag][0][pay][0]) {
                card[c.toLowerCase()] = paymentNote[detpag][0][pay][0][c] ? paymentNote[detpag][0][pay][0][c][0] : null;
              }
              cards.push(card);
              continue;
            }
            payment[pay.toLowerCase()] = paymentNote[detpag][0][pay] ? paymentNote[detpag][0][pay][0] : null;
          }

          payment = await Payment.create(payment, { transaction });
          for (cardSave of cards) {
            cardSave['pagamento_id'] = payment.id;
            await Card.create(cardSave, { transaction });
          }
        }
        objCallback['note_id'] = note.id;
        await transaction.commit();
        callback(null, objCallback);
      } catch (err) {
        callback('Algo não saiu como esperado');
        if (transaction) {
          await transaction.rollback();
        }
        throw err;
      }
    } else {
      console.log('essa nota já foi importada!');
      callback('Essa nota já foi importada!');
    }
  });

  emitter.on('note::findById', async (params, callback) => {
    const { Note } = models;
    let note;

    try {
      note = await Note.findByPk(params.id, {
        include: [
          { all: true, nested: true },
        ],
      });
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
    callback(null, note);
  });

  emitter.on('note::all', async (params, callback) => {
    try {
      note = await models.Note.findAll( {include: [{ all: true, nested: true },]});
    } catch (err) {
      callback('Algo não saiu como esperado', err);
      throw err;
    }
    callback(null, note);
  });

  emitter.on('note::create', async (params, callback) => {
    const { Product, Barcode } = models;

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

    padronize(params);

    try {
      transaction = await models.sequelize.transaction();

      const icmsTotal = await IcmsTotal.create(params.icmsTotal, { transaction });

      const charge = await Charge.create(params.charge, { transaction });

      for (dup in params.duplicate) {
        dup.cobranca_id = charge.id;
        await Duplicate.create(dup, { transaction });
      }


      const identification = await Identification.create(params.identification, { transaction });

      for (prod in params.productNote) {
        prod.identificacao_id = identification.id;
        const cofins = await Cofins.create(prod.cofins, { transaction });
        const ipi = await Ipi.create(prod.ipi, { transaction });
        const pis = await Pis.create(prod.pis, { transaction });
        const icms = await Icms.create(prod.icms, { transaction });
        prod.cofins_id = cofins.id;
        prod.ipi_id = ipi.id;
        prod.pis_id = pis.id;
        prod.icms_id = icms.id;
        await ProductNote.create(prod, { transaction });
      }

      params.identificacao_id = identification.id;
      params.cobranca_id = charge.id;
      params.icmsTotal_id = icmsTotal.id;

      const note = await Note.create(params, { transaction });

      const card = await Card.create(params.card, { transaction });

      params.payment.card_id = card.id;

      const payment = await Payment.create(params.payment, { transaction });


      await transaction.commit();
      callback(null, note.id);
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


  emitter.on('note::allEntry', async ({ search, active,ismanual }, callback) => {
  
    const where = {
      // [Op.or]: [
      //   { id: _.toInteger(search) || 0 },
      //   { descricao: { [Op.like]: `%${_.toUpper(_.toString(search))}%` } },
      //   { referencia: { [Op.like]: `%${_.toLower(_.toString(search))}%` } },
      //   { codigo_fornecedor: { [Op.like]: `${_.toString(search)}%` } },
      //   { ncm: { [Op.like]: `${_.toString(search)}%` } },
      // ],
    };

    // if (typeof active === 'boolean') {
    //   where.ativo = active;
    // }

    try {
      const notes = await Note.findAll({
        where,
        include: [{ all: true, nested: true },],
       
      });


      callback(null, notes);
    } catch (err) {
      callback('Algo não saiu como esperado');
      throw err;
    }
  });
};
