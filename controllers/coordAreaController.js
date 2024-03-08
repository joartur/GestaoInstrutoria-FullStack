const Instrutor = require("../models/Instrutor.js")
const Registro = require("../models/Registro.js")

const coordAreaController = {
    listarInstrutores: async (req, res) => {
        try {
            const instrutores = await Instrutor.findAll({ where: { area: req.params.area}});
            res.json(instrutores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    listarRegistros: async (req, res) => {
        try {
            const registros = await Registro.findAll({ where: { FKinstrutor: req.params.matricula } });
            res.json(registros)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    verificaSituacao: async (req, res) => {
        try {
            const registros = await Registro.findAll({ where: { FKinstrutor: req.params.matricula } });
            const emAnalise = registros.some(registro => registro.status === 'Em Análise');

            res.json(emAnalise)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    validarRegistro: async (req, res) => {
        try {
            const registros = await Registro.update({
                status: "Validado",
                FKcoordenador: req.params.FKcoordenador
            },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );
            res.json(registros)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    validarParcialmenteRegistro: async (req, res) => {
        try {
            if (req.body.total > 0) {
                const registros = await Registro.update({
                    status: "Parcialmente validado",
                    justificativa: req.body.justificativa,
                    total: req.body.total,
                    FKcoordenador: req.params.FKcoordenador
                },
                    {
                        where: {
                            id: req.params.id,
                        },
                    }
                );
                res.json(registros)
            }
            else {
                const registros = await Registro.update({
                    status: "Recusado",
                    justificativa: req.body.justificativa,
                    total: req.body.total,
                    FKcoordenador: req.params.FKcoordenador
                },
                    {
                        where: {
                            id: req.params.id,
                        },
                    });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    cadastrarRegistro: async (req, res) => {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico, FKinstrutor } = req.body;
            const FKcoordenador = req.params.matricula;
            
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
                status: "Validado",
                FKservico,
                FKinstrutor,
                FKcoordenador
            });

            res.json({ msg: "Registro cadastrado."});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

async function conferirData(data) {
    const hoje = new Date()
    const dataServico = new Date(data)
    
    if (dataServico > hoje) {
        return false
    } else {
        return true
    }
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
    a expressão regular permite qualquer combinação de letras, números, espaços, vírgulas, pontos e caracteres acentuados, incluindo palavras, frases e números decimais simples, mas evita números independentes com quatro ou mais dígitos consecutivos.
    */
    const regex = /^(?!.*\b\d{4,}\b)[a-zA-Z0-9\s.,À-ÖØ-öø-ÿ]+(?: [a-zA-Z0-9\s.,À-ÖØ-öø-ÿ]+)*$/;

    // verifica o tamanho da descrição
    return (regex.test(desc) && desc.length > 15);
}

async function conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio, registroEditadoId = null) {
    const whereClause = {
        FKinstrutor,
        dataServico,
    };

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

module.exports = coordAreaController;