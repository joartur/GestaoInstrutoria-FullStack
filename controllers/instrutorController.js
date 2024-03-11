const Registro = require("../models/Registro");
const Instrutor = require("../models/Instrutor");
const Servico = require("../models/Servico");
const sequelize = require('../database/connection.js');
const { Op, literal } = require('sequelize');

const instrutorController = {
    cadastrarRegistro: async (req, res) => {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;
            const FKinstrutor = req.params.matriculaI;
            
            //formatando data recebida do front no formato DD-MM-YYYY
            const dataFormatada = await formatarDataParaBD(dataServico);

            //validação básica do texto da descrição
            const validaDesc = await validarDesc(descricao);

            if (!validaDesc) {
                return res.status(400).json({ error: "Descrição inválida." });
            }

            //conferindo se a data corresponde ao período em vigor ou está no futuro
            const periodoData = await conferirData(dataServico);

            if (!periodoData) {
                return res.status(400).json({ error: "Não é permitido cadastrar registros para datas futuras." });
            }

            //conferindo se a hora é válida
            const ordemHora = await conferirHora(horaInicio, horaFinal);

            if (ordemHora){
                return res.status(400).json({ error: "Registro com horas inválidas." });
            }            
            
            //confere se não existe algum registro com a data e hora igual ou que se sobrepõe, já registrado
            const sobreposicaoHoras = await conferirRegistros(dataFormatada, FKinstrutor, horaFinal, horaInicio);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data." });
            }

            //calcula o total de horas e retorna um inteiro
            const total = calcularDiferencaHoras(horaInicio, horaFinal);
            
            await Registro.create({
                dataServico: dataFormatada,
                horaInicio,
                horaFinal,
                total,
                titulo,
                descricao,
                FKservico,
                FKinstrutor
            });

            res.json({ msg: "Registro cadastrado."});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    visualizarRegistro: async (req, res) => {
        try {
            const { matriculaI, registroId } = req.params;

            //busca um registro para ver se ele existe e retorna os dados dele
            const registro = await buscarRegistro(matriculaI, registroId);

            if (!registro) {
                return res.status(404).json({ error: "Registro não encontrado." });
            }

            res.status(200).json({ msg: "Registro encontrado.", data: registro });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    listarRegistros: async (req, res) => {
        try {
            const { matriculaI } = req.params;
    
            const registros = await Registro.findAll({
                attributes: ['id','titulo', 'dataServico', 'horaInicio', 'horaFinal', 'total', 'status'],
                include: [{
                    model: Servico,
                    attributes: ['id','nome'],
                    where: {
                        id: sequelize.col('Registro.FKservico')
                    }
                }],
                where: {
                    FKinstrutor: matriculaI
                }
            });

            if (registros.length === 0) {
                return res.status(404).json({ error: "Registros não encontrados." });
            }
    
            res.status(200).json({ msg: "Registros encontrados.", data: registros });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    editarRegistro: async (req, res) => {
        try {
            const { matriculaI, registroId } = req.params;
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;

            const registro = await buscarRegistro(matriculaI, registroId);

            if (!registro) {
                return res.status(404).json({ error: "Registro não encontrado." });
            }
            
            const dataFormatada = await formatarDataParaBD(dataServico);

            //validação básica do texto da descrição
            const validaDesc = await validarDesc(descricao);

            if (!validaDesc) {
                return res.status(400).json({ error: "Descrição inválida." });
            }

            const periodoData = await conferirData(dataFormatada);

            if (!periodoData) {
                return res.status(400).json({ error: "Não é permitido cadastrar registros para datas futuras." });
            }
            
            const ordemHora = await conferirHora(horaInicio, horaFinal);

            if (ordemHora){
                return res.status(400).json({ error: "Registro com horas inválidas." });
            }            

            const sobreposicaoHoras = await conferirRegistros(dataFormatada, matriculaI, horaFinal, horaInicio, registroId);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data." });
            }

            const total = calcularDiferencaHoras(horaInicio, horaFinal);

            const [rowsUpdated] = await Registro.update({
                dataServico: dataFormatada,
                horaInicio,
                horaFinal,
                total,
                titulo,
                descricao,
                FKservico
            }, { where: { id: registroId, FKinstrutor: matriculaI } });

            if (rowsUpdated === 0) {
                return res.status(404).json({ error: "Registro não encontrado." });
            }

            res.json({ msg: "Registro atualizado com sucesso." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    excluirRegistro: async (req, res) => {
        try {
            const { matriculaI, registroId } = req.params;
            
            const registro = await buscarRegistro(matriculaI, registroId);

            if (!registro) {
                return res.status(404).json({ error: "Registro não encontrado." });
            }

            await Registro.destroy({ where: { FKinstrutor: matriculaI, id: registroId } });

            res.json({ msg: "Registro excluído com sucesso." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    home: async (req, res) => {
        try {
            const { matriculaI } = req.params;

            //busca os tres registros mais recentes
            const registrosRecentes = await buscarRegistrosRecentes(matriculaI);

            //busca as datas de todos os registros do mês vigente
            const datasServico = await buscarDatasServico(matriculaI);

            //busca e calcula as horas totais de serviço educacional
            const horasServicos = await calcularHorasServicos(matriculaI);

            //busca pelo saldo de hora, se houver
            const saldoHoras = await buscarSaldoHoras(matriculaI);

            //organiza o response da rota
            const response = {
                registrosRecentes,
                datasServico,
                horasServicos,
                saldoHoras
            };

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    perfil: async (req, res) => {
        try {
            const { matriculaI } = req.params;

            //busca pelo instrutor de acordo com o id
            const instrutor = await buscarInstrutor(matriculaI);

            res.status(200).json(instrutor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //rota de teste para o front com todos os registros do banco
    test: async (req, res) => {
        try {
    
            const registros = await Registro.findAll({
                attributes: ['id','titulo', 'dataServico', 'horaInicio', 'horaFinal', 'total', 'status'],
                include: [{
                    model: Servico,
                    attributes: ['nome'],
                    where: {
                        id: sequelize.col('Registro.FKservico')
                    }
                }],
            });

            if (registros.length === 0) {
                return res.status(404).json({ error: "Registros não encontrados." });
            }

            res.status(200).json({ msg: "Registros encontrados.", data: registros });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //rota para renderização da lista de atividades de servico edducacionais
    listaAtvs: async (req, res)=> {
        try {
            const servicos = await Servico.findAll({attributes: ['id', 'nome']});
            res.json({servicos});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

async function conferirData(data) {
    const hoje = new Date()
    const dataServico = new Date(data)
    
    if (dataServico > hoje) {
        return false
    } else {
        return true
    }
}

async function buscarRegistro(matriculaI, registroId) {
    return await Registro.findOne({
        include: [{
            model: Servico,
            attributes: ['id','nome'],
            where: {
                id: sequelize.col('Registro.FKservico')
            }
        }],
        attributes: {
            exclude: ['FKservico'] // Exclui o campo FKservico do resultado
        },
        where: { FKinstrutor: matriculaI, id: registroId }
    });
    
}

async function buscarRegistrosRecentes(matriculaI) {
    return await Registro.findAll({
        attributes: ['id', 'titulo', 'status'],
        include: [{
            model: Servico,
            attributes: ['nome'],
            where: {
                id: sequelize.col('Registro.FKservico')
            }
        }],
        where: { FKinstrutor: matriculaI },
        order: [['updatedAt', 'DESC']],
        limit: 3
    });
}

async function buscarDatasServico(matriculaI) {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1; 

    return await Registro.findAll({
        attributes: [
            [literal('DISTINCT dataServico'), 'dataServico']
        ],
        where: {
            FKinstrutor: matriculaI,
            [Op.and]: [
                literal(`YEAR(dataServico) = ${anoAtual}`),
                literal(`MONTH(dataServico) = ${mesAtual}`)
            ]
        }
    });
}

async function calcularHorasServicos(matriculaI) {
    return await Registro.sum('total', {
        where: {
            FKinstrutor: matriculaI
        }
    });
}

async function buscarSaldoHoras(matriculaI) {
    const instrutor = await Instrutor.findOne({
        attributes: ['horasTrabalhadas', 'saldoHoras'],
        where: {
            matricula: matriculaI
        }
    });

    return instrutor.saldoHoras;
}

async function buscarInstrutor(matriculaI){
    const instrutor = await Instrutor.findOne({
        attributes: ['nome', 'email', 'unidade', 'area'],
        where: {
            matricula: matriculaI
        }
    });
    return instrutor;
}

function calcularDiferencaHoras(horaInicio, horaFinal) {
    const horaInicioMs = new Date(`1970-01-01T${horaInicio}`).getTime();
    const horaFinalMs = new Date(`1970-01-01T${horaFinal}`).getTime();
    const diffHours = (horaFinalMs - horaInicioMs) / (1000 * 60 * 60);
    return diffHours;
}

async function formatarDataParaBD(data) {
    const partesData = data.split('-'); // Divide a string da data em partes usando o separador "-"
    const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`; // Formata a data para "YYYY-MM-DD"
    return dataFormatada;
}

async function conferirHora(hrInicio, hrFinal){
    return ( hrInicio >= hrFinal )
}

async function validarDesc(desc){
    /*
    a expressão regular permite qualquer combinação de letras, números, espaços, vírgulas, pontos, exclamação, interrogação, hífens
    e caracteres acentuados, incluindo palavras, frases e números decimais simples, mas evita números independentes com quatro ou mais dígitos consecutivos.
    */
   const regex = /^(?!.*\b\d{4,}\b)(?!.*\b[A-Za-z]{20,}\b)[a-zA-Z0-9\s.,À-ÖØ-öø-ÿ\-!?\']+(?: [a-zA-Z0-9\s.,À-ÖØ-öø-ÿ\-!?\']+)*$/;

    // verifica o tamanho da descrição
    return (regex.test(desc) && desc.length > 15);
}

async function conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio, registroEditadoId = null) {
    const whereClause = {
        FKinstrutor,
        dataServico,
    };

    console.log(registroEditadoId)

    // Se o ID do registro editado estiver disponível, exclua esse registro da consulta
    if (registroEditadoId) {
        whereClause.id = { [Op.ne]: registroEditadoId };
    }

    const registrosNoMesmoDia = await Registro.findAll({
        where: whereClause
    });

    const novoInicio = new Date(`1970-01-01T${horaInicio}`);
    const novoFim = new Date(`1970-01-01T${horaFinal}`);

    const sobreposicao = registrosNoMesmoDia.some(registro => {
        const registroInicio = new Date(`1970-01-01T${registro.horaInicio}`);
        const registroFim = new Date(`1970-01-01T${registro.horaFinal}`);

        return (
            (novoInicio >= registroInicio && novoInicio < registroFim) ||
            (novoFim > registroInicio && novoFim <= registroFim) ||
            (novoInicio <= registroInicio && novoFim >= registroFim)
        );
    });

    return sobreposicao;
}


module.exports = instrutorController;
