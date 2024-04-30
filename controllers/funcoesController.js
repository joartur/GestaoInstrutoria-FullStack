const Registro = require("../models/Registro");
const Instrutor = require("../models/Instrutor");
const Servico = require("../models/Servico");
const sequelize = require('../database/connection.js');
const { Op, literal } = require('sequelize');

const Funcoes = {
    conferirData: async (data) => {
        const hoje = new Date()
        const dataServico = new Date(`${data}`)
        
        if (dataServico > hoje) {
            return false
        } else {
            return true
        }
    },

    buscarRegistro: async (matriculaI, registroId) => {
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
        
    },

    buscarDatasServico: async (matriculaI) => {
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
    },

    calcularHorasServicos: async (matriculaI) => {
        let horas, minutos, segundos, horaFormatada;
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

        if(somaR.length == 5){
            // Convertendo a string para horas, minutos e segundos
            horas = parseInt(somaR.substring(0, 1)); // Extrai as duas primeiras posições para as horas
            minutos = parseInt(somaR.substring(1, 3)); // Extrai as duas posições seguintes para os minutos
            segundos = parseInt(somaR.substring(3, 5)); // Extrai as duas últimas posições para os segundos

            // Formatando o resultado
            horaFormatada = `${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        } else {
            // Convertendo a string para horas, minutos e segundos
            horas = parseInt(somaR.substring(0, 2)); // Extrai as duas primeiras posições para as horas
            minutos = parseInt(somaR.substring(2, 4)); // Extrai as duas posições seguintes para os minutos
            segundos = parseInt(somaR.substring(4, 6)); // Extrai as duas últimas posições para os segundos
        
            // Formatando o resultado
            horaFormatada = `${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        }

        console.log(somaR, horas, minutos, segundos, horaFormatada);

        return horaFormatada;
    },

    calcularHorasTrab: async (matriculaI) => {
        const instrutor = await Instrutor.findOne({
            attributes: ['horasTrabalhadas'],
            where: {
                matricula: matriculaI
            }
        });

        return instrutor.horasTrabalhadas;
    },

    buscarSaldoHoras: async (matriculaI) => {
        const instrutor = await Instrutor.findOne({
            attributes: ['saldoHoras'],
            where: {
                matricula: matriculaI
            }
        });

        return instrutor.saldoHoras;
    },

    buscarInstrutor:async (matriculaI)=>{
        const instrutor = await Instrutor.findOne({
            attributes: ['nome', 'email', 'unidade', 'area'],
            where: {
                matricula: matriculaI
            }
        });
        return instrutor;
    },

    calcularDiferencaHoras: (horaInicio, horaFinal) => {
        const horaInicioMs = new Date(`1970-01-01T${horaInicio}`).getTime();
        const horaFinalMs = new Date(`1970-01-01T${horaFinal}`).getTime();
        const diffMs = horaFinalMs - horaInicioMs; // Diferença em milissegundos

        let hora = new Date(diffMs);
        let horaFormatada = `${hora.getUTCHours().toString().padStart(2, '0')}:${hora.getUTCMinutes().toString().padStart(2, '0')}`;
        
        return horaFormatada;
    },

    conferirHora: async (hrInicio, hrFinal)=>{
        return ( hrInicio >= hrFinal )
    },

    validarDesc: async (desc) => {
        /*
        a expressão regular permite qualquer combinação de letras, números, espaços, vírgulas, pontos, exclamação, interrogação, hífens
        e caracteres acentuados, incluindo palavras, frases e números decimais simples, mas evita números independentes com quatro ou mais dígitos consecutivos.
        */
    const regex = /^(?!.*\b\d{4,}\b)(?!.*\b[A-Za-z]{20,}\b)[a-zA-Z0-9\s.,À-ÖØ-öø-ÿ\-!?\']+(?: [a-zA-Z0-9\s.,À-ÖØ-öø-ÿ\-!?\']+)*$/;

        // verifica o tamanho da descrição
        return (regex.test(desc) && desc.length > 15);
    },

    conferirRegistros: async (dataServico, FKinstrutor, horaFinal, horaInicio, registroEditadoId = null) => {
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
    },

    calcularHoras: async (idRegistro) => {
        //encontrar o registro validado
        const registro = await Registro.findAll({where: {id:idRegistro}})
    
        registro.forEach(async (reg)=>{
            //encontrar o instrutor que fez o registro
            const instrutor = await Instrutor.findAll({where: {matricula: reg.FKinstrutor}})
    
            instrutor.forEach(async (ins)=>{
                const verificaHrTrab = verificaHrTrabAtt(ins.horasTrabalhadas);
    
                if (verificaHrTrab){
                    let saldoAtt = calcularHorasTrab(reg.total, ins.saldoHoras);
    
                    let hrTrabAtt = calcularHorasTrab(reg.total, ins.horasTrabalhadas);
    
                    await Instrutor.update({
                        saldoHoras: saldoAtt,
                        horasTrabalhadas: hrTrabAtt
                    }, { where: { matricula: ins.matricula } });
    
                } else {
                    let hrTrabAtt = calcularHorasTrab(reg.total, ins.horasTrabalhadas);
    
                    await Instrutor.update({
                        horasTrabalhadas: hrTrabAtt
                    }, { where: { matricula: ins.matricula } });
                }
    
            })
        })
    },
    
    //modificar o valor das horas cadastradas (adicionando)
    calcularHorasTrab: (horasTrab, horasRegis) => {
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
    },
    
    situacaoRegistro: (status) => {
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
    },
    
    verificaHrTrabAtt: (hrtrabs) => {
        const hrTrab = new Date(`1970-01-01T${hrtrabs}`).getTime();
        const hrMensal = new Date(`1970-01-01T${'176:00:00'}`).getTime();
    
        return (hrTrab >= hrMensal)
    }
    
}

module.exports = Funcoes;