const Instrutor = require("../../instrutor/models/Instrutor.js")
const Registro = require("../../administrador/models/Registro.js")

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
            const {id} = req.params

            const registro = await Registro.findOne({ where: { id: req.params.id } })

            const situacao = situacaoRegistro(registro.status)

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

            const attHoras = await calcularHoras(id)

            res.json(registros)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    validarParcialmenteRegistro: async (req, res) => {
        try {
            if (req.body.total >= 0) {
            const registro = await Registro.findOne({ where: { id: req.params.id } })

            const situacao = situacaoRegistro(registro.status)

            if (situacao === false) {
                return res.status(400).json({ error: "O registro não está em análise." });
            }

            const validaJust = await validarDesc(req.body.justificativa);

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
            } else if (registro.total < req.body.total) {
                return res.status(400).json({ error: "A quantidade de horas foi excedida." });
            }
            }else if (req.body.total > 0) {
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
            } else if(req.body.total == 0) {
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
                    res.json(registros)
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

            if(titulo.length > 50){
                return res.status(400).json({error: "Limite de caracteres para o título foi atingido."})
            }

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
            const ordemHora = conferirHora(horaInicio, horaFinal);

            if (ordemHora){
                return res.status(400).json({ error: "Registro com horas inválidas." });
            }            
            
            //confere se não existe algum registro com a data e hora igual ou que se sobrepõe, já registrado
            const sobreposicaoHoras = await conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data." });
            }

            //calcula o total de horas e retorna em time
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

            res.json({ msg: "Registro cadastrado." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

async function calcularHoras(idRegistro) {
    //encontrar o registro validado
    const registro = await Registro.findAll({where: {id:idRegistro}})
    
    registro.forEach(async (reg)=>{
        //encontrar o instrutor que fez o registro
        const instrutor = await Instrutor.findAll({where: {matricula: reg.FKinstrutor}})

        instrutor.forEach(async (ins)=>{
            const verificaHrTrab = verificaHrTrabAtt(ins.horasTrabalhadas);
            
            if (verificaHrTrab){
                
                let hrTrabAtt = somarHoras(reg.total, ins.horasTrabalhadas);
                
                let saldoHrTrab = calcularDiferencaHoras('176:00:00', hrTrabAtt);
                
                let saldoAtt = somarHoras(saldoHrTrab, ins.saldoHoras)

                await Instrutor.update({
                    saldoHoras: saldoAtt,
                    horasTrabalhadas: hrTrabAtt
                }, { where: { matricula: ins.matricula } });

            } else {
                let hrTrabAtt = somarHoras(reg.total, ins.horasTrabalhadas);

                await Instrutor.update({
                    horasTrabalhadas: hrTrabAtt
                }, { where: { matricula: ins.matricula } });
            }

        })
    })
}

 //modificar o valor das horas cadastradas (adicionando)
function somarHoras(horasTrab, horasRegis){
    // Dividindo as horas e os minutos da horasTrab
    const [trabHoras, trabMinutos, trabSegundos] = horasTrab.split(':').map(Number);
    
    // Dividindo as horas e os minutos da horasRegis
    const [regisHoras, regisMinutos, regisSegundos] = horasRegis.split(':').map(Number);

    // Calculando a soma das horas, dos minutos e dos segundos
    let somaHoras = trabHoras + regisHoras;
    let somaMinutos = trabMinutos + regisMinutos;
    let somaSegundos = trabSegundos + regisSegundos;

    // Verificando se há mais de 60 minutos ou 60 segundos, se houver, ajusta as horas e os minutos
    if (somaSegundos >= 60) {
        somaMinutos += Math.floor(somaSegundos / 60);
        somaSegundos %= 60;
    }

    if (somaMinutos >= 60) {
        somaHoras += Math.floor(somaMinutos / 60);
        somaMinutos %= 60;
    }
    
    // Formatando o resultado
    const horaFormatada = `${somaHoras.toString().padStart(2, '0')}:${somaMinutos.toString().padStart(2, '0')}:${somaSegundos.toString().padStart(2, '0')}`;
    
    return horaFormatada;
}

function situacaoRegistro(status) {
    try {

        if (status === 'Em Análise') {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
function verificaHrTrabAtt(hrtrabs){
    // Extrair horas, minutos e segundos da string hrtrabs
    const [hours, minutes, seconds] = hrtrabs.split(':').map(Number);
        
    // Calcular o total de milissegundos para hrTrab
    const hrTrab = (hours * 3600 + minutes * 60 + seconds) * 1000;

    // Calcular o total de milissegundos para hrMensal (176 horas)
    const hrMensal = (176 * 3600) * 1000;

    // Verificar se hrTrab é maior ou igual a hrMensal
    return hrTrab >= hrMensal;
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

async function conferirHora(hrInicio, hrFinal) {
    return (hrInicio >= hrFinal)
}

async function validarDesc(desc) {
    /*
    a expressão regular permite qualquer combinação de letras, números, espaços, vírgulas, pontos e caracteres acentuados, incluindo palavras, frases e números decimais simples, mas evita números independentes com quatro ou mais dígitos consecutivos.
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