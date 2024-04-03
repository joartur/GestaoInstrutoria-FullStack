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
            const ordemHora = await conferirHora(horaInicio, horaFinal);

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
                dataServico,
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

            if(titulo.length > 50){
                return res.status(400).json({error: "Limite de caracteres para o título foi atingido."})
            }

            const registro = await buscarRegistro(matriculaI, registroId);

            if (!registro) {
                return res.status(404).json({ error: "Registro não encontrado" });
            }
            
            //verifica se o registro pode ser editado pelo status
            if (registro.status == "Validado" || registro.status == "Parcialmente Validado"){
                return res.status(400).json({ error: "Não é permitido editar registro com status de 'Validado' ou 'Parcialmente Validado'" });
            }

            //validação básica do texto da descrição
            const validaDesc = await validarDesc(descricao);

            if (!validaDesc) {
                return res.status(400).json({ error: "Descrição inválida." });
            }

            const periodoData = await conferirData(dataServico);

            if (!periodoData) {
                return res.status(400).json({ error: "Não é permitido editar registros para datas futuras" });
            }
            
            const ordemHora = await conferirHora(horaInicio, horaFinal);

            if (ordemHora){
                return res.status(400).json({ error: "Registro com horas inválidas." });
            }            

            const sobreposicaoHoras = await conferirRegistros(dataServico, matriculaI, horaFinal, horaInicio, registroId);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data." });
            }

            const total = calcularDiferencaHoras(horaInicio, horaFinal);

            const [rowsUpdated] = await Registro.update({
                dataServico,
                horaInicio,
                horaFinal,
                total,
                titulo,
                descricao,
                FKservico,
                status:"Em Análise",
                justificativa:""
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
            
            //verifica se o registro pode ser editado pelo status
            if (registro.status == "Validado" || registro.status == "Parcialmente Validado"){
                return res.status(400).json({ error: "Não é permitido excluir registro com status de 'Validado' ou 'Parcialmente Validado'" });
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
            // const registrosRecentes = await buscarRegistrosRecentes(matriculaI);

            //busca as datas de todos os registros do mês vigente
            const datasServico = await buscarDatasServico(matriculaI);

            //busca e calcula as horas totais de serviço educacional
            const horasServicos = await calcularHorasServicos(matriculaI);
            
            //busca e calcula as horas totais validadas
            const horasTrab = await calcularHorasTrab(matriculaI);

            //busca pelo saldo de hora, se houver
            const saldoHoras = await buscarSaldoHoras(matriculaI);

            //organiza o response da rota
            const response = {
                datasServico,
                horasServicos,
                horasTrab,
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

            if(!instrutor){
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            res.status(200).json(instrutor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    filtroRegistros: async(req, res) =>{
        try{
            const { matriculaI } = req.params;
            const { dataInicioFiltro, dataFinalFiltro, horaInicioFiltro, horaFinalFiltro, FKservico, ordenacao } = req.body

            let order = []
            // Inicialize o objeto where
            let where = {
                FKinstrutor: matriculaI
            };

            // Adicione as condições de filtro para hora
            if (horaInicioFiltro != "" && horaFinalFiltro != "") {
                where[Op.and] = [
                    { horaInicio: { [Op.gte]: horaInicioFiltro } },
                    { horaFinal: { [Op.lte]: horaFinalFiltro } }
                ];

            } else if ( horaInicioFiltro != "" && horaFinalFiltro == ""){
                where['horaInicio'] = { [Op.eq]: [horaInicioFiltro] }

            } else if ( horaInicioFiltro == "" && horaFinalFiltro != ""){
                where['horaFinal'] = { [Op.eq]: [horaFinalFiltro] }
            }

            // Adicione as condições de filtro para hora
            if (dataInicioFiltro != "" && dataFinalFiltro != "") {
                where['dataServico'] = { [Op.between]: [dataInicioFiltro, dataFinalFiltro] }

            } else if ( dataInicioFiltro != "" && dataFinalFiltro == ""){
                where['dataServico'] = { [Op.eq]: [dataInicioFiltro] }

            } else if ( dataInicioFiltro == "" && dataFinalFiltro != ""){
                where['dataServico'] = { [Op.eq]: [dataFinalFiltro] }
            }

            if(FKservico !=""){
                where['FKservico'] = { [Op.eq]: [FKservico] }
            }

            if (ordenacao) {
                order.push(["id", ordenacao]);
            }

            const registros = await Registro.findAll({
                attributes: ['id','titulo', 'dataServico', 'horaInicio', 'horaFinal', 'total', 'status'],
                include: [{
                    model: Servico,
                    attributes: ['id','nome'],
                    where: {
                        id: sequelize.col('Registro.FKservico')
                    }
                }],
                where,
                order
            });
    
            if (registros.length === 0) {
                return res.status(404).json({ error: "Registros não encontrados." });
            }
            
            res.status(200).json({ msg: "Registros encontrados", data: registros });
        } catch(error){
            res.status(500).json({ error: error.message })
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
    const dataServico = new Date(`${data}`)
    console.log(dataServico)
    
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
            exclude: ['FKservico'] // Exclaui o campo FKservico do resultado
        },
        where: { FKinstrutor: matriculaI, id: registroId }
    });
    
}

// async function buscarRegistrosRecentes(matriculaI) {
//     return await Registro.findAll({
//         attributes: ['id', 'titulo', 'status'],
//         include: [{
//             model: Servico,
//             attributes: ['nome'],
//             where: {
//                 id: sequelize.col('Registro.FKservico')
//             }
//         }],
//         where: { FKinstrutor: matriculaI },
//         order: [['updatedAt', 'DESC']],
//         limit: 3
//     });
// }

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
    // retorna uma string com o valor somado ex. '473000' -> 47:30:00
    const somaR = await Registro.sum('total', {
        where: {
            FKinstrutor: matriculaI,
            status: {
                [Op.or]: ["validado", "parcialmente validado"]
            }
        }
    });

    if(somaR == null){
        return "00:00:00";
    }

    // Convertendo a string para horas, minutos e segundos
    const horas = parseInt(somaR.substring(0, 2)); // Extrai as duas primeiras posições para as horas
    const minutos = parseInt(somaR.substring(2, 4)); // Extrai as duas posições seguintes para os minutos
    const segundos = parseInt(somaR.substring(4, 6)); // Extrai as duas últimas posições para os segundos

    // Formatando o resultado
    const horaFormatada = `${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    // console.log(somaR, horas, minutos, segundos, horaFormatada);

    return horaFormatada;
}



async function calcularHorasTrab(matriculaI) {
    const instrutor = await Instrutor.findOne({
        attributes: ['horasTrabalhadas'],
        where: {
            matricula: matriculaI
        }
    });

    return instrutor.horasTrabalhadas;
}

async function buscarSaldoHoras(matriculaI) {
    const instrutor = await Instrutor.findOne({
        attributes: ['saldoHoras'],
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
    const diffMs = horaFinalMs - horaInicioMs; // Diferença em milissegundos

    let hora = new Date(diffMs);
    let horaFormatada = `${hora.getUTCHours().toString().padStart(2, '0')}:${hora.getUTCMinutes().toString().padStart(2, '0')}`;
    
    return horaFormatada;
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
