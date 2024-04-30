const Instrutor = require("../models/Instrutor.js");
const Registro = require("../models/Registro.js");
const funcao = require('./funcoesController.js');

const coordAreaController = {
    listarInstrutores: async (req, res) => {
        try {
            const instrutores = await Instrutor.findAll({ where: { area: req.params.area } });
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

    //Caso haja algum registro em andamento, a função irá retornar True; caso contrário, irá retornar False.
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

            const registro = await Registro.findOne({ where: { id: req.params.id } })

            const situacao = funcao.situacaoRegistro(registro.status)

            if (situacao === false) {
                return res.status(400).json({ error: "O registro não está em análise." });
            }
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

            const attHoras = await funcao.calcularHoras(req.params.id)

            res.json(registros)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    validarParcialmenteRegistro: async (req, res) => {
        try {
            if (req.body.total >= '00:00') {
            const registro = await Registro.findOne({ where: { id: req.params.id } })

            const situacao = funcao.situacaoRegistro(registro.status)

            if (situacao === false) {
                return res.status(400).json({ error: "O registro não está em análise." });
            }

            const validaJust = await funcao.validarDesc(req.body.justificativa);

            if (!validaJust) {
                return res.status(400).json({ error: "Justificativa inválida." });
            }

                if (registro.total == req.body.total) {
                const registros = await Registro.update({
                    status: "Validado",
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
                
                const attHoras = await funcao.calcularHoras(req.params.id)

            } else if (registro.total < req.body.total) {
                return res.status(400).json({ error: "A quantidade de horas foi excedida." });
            }
            }else if (req.body.total > '00:00') {
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
                
                res.json(registros);

                const attHoras = await funcao.calcularHoras(req.params.id)
            } else if(req.body.total == '00:00') {
                const registros = await Registro.update({
                    status: "Recusado",
                    justificativa: req.body.justificativa,
                    total: req.body.total,
                    FKcoordenador: req.params.FKcoordenador
                },{
                    where: {
                        id: req.params.id,
                    },
                });
                res.json(registros)
                    
                const attHoras = await funcao.calcularHoras(req.params.id)
            }
            else {
                return res.status(400).json({ error: "Erro inesperado." });
            }

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    cadastrarRegistro: async (req, res) => {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;
            const FKcoordenador = req.params.matriculaC;
            const FKinstrutor = req.params.matriculaI;

            //formatando data recebida do front no formato DD-MM-YYYY
            const dataFormatada = await funcao.formatarDataParaBD(dataServico);

            //validação básica do texto da descrição
            const validaDesc = await funcao.validarDesc(descricao);

            if (!validaDesc) {
                return res.status(400).json({ error: "Descrição inválida." });
            }

            //conferindo se a data corresponde ao período em vigor ou está no futuro
            const periodoData = await funcao.conferirData(dataServico);

            if (!periodoData) {
                return res.status(400).json({ error: "Não é permitido cadastrar registros para datas futuras." });
            }

            //conferindo se a hora é válida
            const ordemHora = await funcao.conferirHora(horaInicio, horaFinal);

            if (ordemHora) {
                return res.status(400).json({ error: "Registro com horas inválidas." });
            }

            //confere se não existe algum registro com a data e hora igual ou que se sobrepõe, já registrado
            const sobreposicaoHoras = await funcao.conferirRegistros(dataFormatada, FKinstrutor, horaFinal, horaInicio);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data." });
            }

            //calcula o total de horas e retorna um inteiro
            const total = funcao.calcularDiferencaHoras(horaInicio, horaFinal);

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

            res.json({ msg: "Registro cadastrado." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = coordAreaController;