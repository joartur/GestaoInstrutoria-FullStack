const Usuario = require("../../usuario/model/Usuario.js");
const Instrutor = require("../../instrutor/models/Instrutor.js");
const Registro = require("../../administrador/models/Registro.js");
const Servico = require("../../administrador/models/Servico.js");
const Area = require("../../usuario/model/Area.js");
const sequelize = require('../../../config/connection.js');
const { Op } = require('sequelize');

class RegistroServico {

    static httpError(status, message) {
        const error = new Error(message);
        error.status = status;
        return error;
    }

    static async buscarCoordenador(matriculaCoordenador){
        return await Usuario.findOne({
            attributes: ['nome', 'email', 'tipoUsuario'],
            include: [{
                model: Area,
                attributes: ['id', 'nome'],
                through: { attributes: [] }  // Não precisa dos atributos de associação
            }],
            where: {
                matricula: matriculaCoordenador,
                tipoUsuario: 'coordenador'  // Garantir que estamos buscando um coordenador
            }
          });
    }

    static async listarInstrutoresComHorasZeradasPeriodo(matriculaCoordenador) {
            try {
                // Passo 1: Buscar o Coordenador e Sua Área
                const coordenador = await RegistroServico.buscarCoordenador(matriculaCoordenador);

                // Verificar se o coordenador foi encontrado
                if (!coordenador) {
                    throw RegistroServico.httpError(404, 'Coordenador não encontrado');
                }

                // Verificar se o coordenador está associado a alguma área
                const areaDoCoordenador = coordenador.Areas[0];
                if (!areaDoCoordenador) {
                    throw RegistroServico.httpError(404, 'Coordenador não está associado a nenhuma área');
                }

                // Passo 2: Buscar Instrutores na Mesma Área com horas trabalhadas período igual a '00:00:00'
                const instrutoresNaArea = await Usuario.findAll({
                    attributes: ['matricula', 'nome', 'email'],
                    include: [{
                        model: Area,
                        attributes: ['id', 'nome'],
                        where: {
                            id: areaDoCoordenador.id
                        },
                        through: { attributes: [] }  // Não precisa dos atributos de associação
                    }],
                    where: {
                        tipoUsuario: 'instrutor'
                    }
                });

                // Passo 3: Buscar Detalhes dos Instrutores com horas trabalhadas período igual a '00:00:00'
                const instrutoresSemHoras = await Promise.all(instrutoresNaArea.map(async (instrutor) => {
                    const instrutorDetalhes = await Instrutor.findOne({
                        where: {
                            FKinstrutor: instrutor.matricula,
                            horasTrabalhadasPeriodo: { [Op.eq]: '00:00:00' }
                        }
                    });
                    return instrutorDetalhes ? instrutor : null;
                }));

                // Filtrar nulos da lista
                const instrutoresSemHorasFiltrados = instrutoresSemHoras.filter(Boolean);

                // Passo 4: Retornar o length da lista
                return instrutoresSemHorasFiltrados.length;
            } catch (error) {
                console.error(error);
                const status = error.status || 500;
                const message = error.message || 'Erro ao listar instrutores com horas zeradas no período';
                throw RegistroServico.httpError(status, message);
            }
    }

    static async listarInstrutoresComSaldoHora(matriculaCoordenador) {
        try {
            // Passo 1: Buscar o Coordenador e Sua Área
            const coordenador = await RegistroServico.buscarCoordenador(matriculaCoordenador);

            // Verificar se o coordenador foi encontrado
            if (!coordenador) {
                throw RegistroServico.httpError(404, 'Coordenador não encontrado');
            }

            // Verificar se o coordenador está associado a alguma área
            const areaDoCoordenador = coordenador.Areas[0];
            if (!areaDoCoordenador) {
                throw RegistroServico.httpError(404, 'Coordenador não está associado a nenhuma área');
            }

            // Passo 2: Buscar Usuários Instrutores na Mesma Área
            const instrutoresNaArea = await Usuario.findAll({
                attributes: ['matricula', 'nome', 'email'],
                include: [{
                    model: Area,
                    attributes: ['id', 'nome'],
                    where: {
                        id: areaDoCoordenador.id
                    },
                    through: { attributes: [] }  // Não precisa dos atributos de associação
                }],
                where: {
                    tipoUsuario: 'instrutor'
                }
            });

            // Passo 3: Buscar Detalhes dos Instrutores com Saldo de Horas Maior que '00:00:00'
            const instrutoresComSaldo = await Promise.all(instrutoresNaArea.map(async (instrutor) => {
                const instrutorDetalhes = await Instrutor.findOne({
                    where: {
                        FKinstrutor: instrutor.matricula,
                        saldoHoras: { [Op.gt]: '00:00:00' }
                    }
                });
                return instrutorDetalhes ? instrutor : null;
            }));

            // Filtrar nulos da lista
            const instrutoresComSaldoFiltrados = instrutoresComSaldo.filter(Boolean);

            // Passo 4: Retornar o length da lista de instrutores com saldo de horas
            return instrutoresComSaldoFiltrados.length;
        } catch (error) {
            console.error(error);
            const status = error.status || 500;
            const message = error.message || 'Erro ao listar instrutores com saldo de horas';
            throw RegistroServico.httpError(status, message);
        }
    }

    static async listarInstrutoresPorArea(matriculaCoordenador) {
        try {
            // Passo 1: Buscar o Coordenador e Sua Área
            const coordenador = await RegistroServico.buscarCoordenador(matriculaCoordenador);

            // Verificar se o coordenador foi encontrado
            if (!coordenador) {
                throw RegistroServico.httpError(404, 'Coordenador não encontrado');
            }

            // Verificar se o coordenador está associado a alguma área
            const areaDoCoordenador = coordenador.Areas[0];
            if (!areaDoCoordenador) {
                throw RegistroServico.httpError(404, 'Coordenador não está associado a nenhuma área');
            }

            // Passo 2: Buscar Instrutores na Mesma Área
            const instrutores = await Usuario.findAll({
                attributes: ['matricula', 'nome', 'email'],
                include: [{
                    model: Area,
                    attributes: ['id', 'nome'],
                    where: {
                        id: areaDoCoordenador.id
                    },
                    through: { attributes: [] }  // Não precisa dos atributos de associação
                }],
                where: {
                    tipoUsuario: 'instrutor'
                }
            });

            for (const instrutor of instrutores) {
                const emAnalise = await RegistroServico.isRegistroEmAnalisePorInstrutor(instrutor.matricula);
                instrutor.dataValues.situacao = emAnalise;

                const horasTrabalhadas = await Instrutor.findOne({ where: { FKinstrutor : instrutor.matricula } })
                instrutor.dataValues.totalHoras = horasTrabalhadas.horasTrabalhadasPeriodo
            }

            return {
                area: areaDoCoordenador.nome,
                instrutores: instrutores
            };
        } catch (error) {
            console.error(error);
            const status = error.status || 500;
            const message = error.message || 'Erro ao listar instrutores por área';
            throw RegistroServico.httpError(status, message);
        }
    }
     
    static async buscarNomeInstrutor(matriculaInstrutor){
        const instrutor = await Usuario.findOne({
            attributes: ['nome'],
            where: {
                matricula: matriculaInstrutor,
                tipoUsuario: 'instrutor'
            }
        });
        return instrutor.nome;
    }

    static async listarRegistrosEmAnalisePorInstrutor(matricula) {
        return await Registro.findAll({
        attributes: ['id','titulo', 'dataServico', 'horaInicio', 'horaFinal', 'total'],
            include: [{
                model: Servico,
                attributes: ['id','nome'],
                where: { id: sequelize.col('Registro.FKservico') }
            }
        ],
        where: { FKinstrutor: matricula, status: "Em Análise" } });
    }

    static async isRegistroEmAnalisePorId(id) {
        const registro = await Registro.findOne({ where: { id } });
        return registro && registro.status === 'Em Análise';
    }
    
    static async isRegistroEmAnalisePorInstrutor(matricula) {
        const registros = await Registro.findAll({ where: { FKinstrutor: matricula } });
        return registros.some(registro => registro.status === 'Em Análise');
    }

    static async atualizarRegistro(id, dados) {
        return await Registro.update(dados, { where: { id } });
    }

    static async obterTotalRegistroPorId(id) {
        const registro = await Registro.findOne({
            attributes: ['total'],
            where: { id } });

        return registro ? registro.total : null;
    }

    static async cadastrarRegistro(novoRegistro) {
        return await Registro.create(novoRegistro);
    }

     // Calcula e atualiza as horas trabalhadas e o saldo de horas do instrutor
    static async calcularHoras(idRegistro) {
        const registro = await Registro.findOne({ where: { id: idRegistro } });
        if (!registro) {
            console.log('Registro não encontrado.');
            return;
        }

        const instrutor = await Instrutor.findOne({ where: { FKinstrutor: registro.FKinstrutor } });
        if (!instrutor) {
            console.log('Instrutor não encontrado.');
            return;
        }

        const hrTrabAtt = RegistroServico.somarHoras(instrutor.horasTrabalhadasPeriodo, registro.total);

        if (RegistroServico.verificaHrTrabAtt(instrutor.horasTrabalhadasPeriodo)) {
        const saldoHrTrab = RegistroServico.calcularDiferencaHoras('176:00:00', hrTrabAtt);
        const saldoAtt = RegistroServico.somarHoras(saldoHrTrab, instrutor.saldoHoras);

        await Instrutor.update( {saldoHoras: saldoAtt, horasTrabalhadasPeriodo: hrTrabAtt},
            { where: { FKinstrutor: registro.FKinstrutor } });
            
        } else {
        await Instrutor.update( { horasTrabalhadasPeriodo: hrTrabAtt },
            { where: { FKinstrutor: registro.FKinstrutor } });
        }
    }

    static verificaHrTrabAtt(hrtrabs) {
        const [hours, minutes, seconds] = hrtrabs.split(':').map(Number);
        const hrTrab = (hours * 3600 + minutes * 60 + seconds) * 1000;
        const hrMensal = (176 * 3600) * 1000;
        
        return hrTrab >= hrMensal;
    }

    static somarHoras(horasTrab, horasRegis) {
        
        const [trabHoras, trabMinutos, trabSegundos] = horasTrab.split(':').map(Number);
        const [regisHoras, regisMinutos, regisSegundos] = horasRegis.split(':').map(Number);
        
        let somaHoras = trabHoras + regisHoras;
        let somaMinutos = trabMinutos + regisMinutos;
        let somaSegundos = trabSegundos + regisSegundos;
        
        if (somaSegundos >= 60) {
            somaMinutos += Math.floor(somaSegundos / 60);
            somaSegundos %= 60;
        }
        
        if (somaMinutos >= 60) {
            somaHoras += Math.floor(somaMinutos / 60);
            somaMinutos %= 60;
        }
        
        return `${somaHoras.toString().padStart(2, '0')}:${somaMinutos.toString().padStart(2, '0')}:${somaSegundos.toString().padStart(2, '0')}`;
        
      }

    static validarDescricao(descricao){
        if(descricao == ""){
            return true
        }
        /*
        a expressão regular permite qualquer combinação de letras, números, espaços, vírgulas, pontos,
        exclamação, interrogação, hífens
        e caracteres acentuados, incluindo palavras, frases e números decimais simples, 
        mas evita números independentes com quatro ou mais dígitos consecutivos.
        */
       const regex = /^(?!.*\b\d{4,}\b)(?!.*\b[A-Za-z]{20,}\b)[a-zA-Z0-9\s.,À-ÖØ-öø-ÿ\-!?\']+(?: [a-zA-Z0-9\s.,À-ÖØ-öø-ÿ\-!?\']+)*$/;
    
        // verifica o tamanho da descrição
        return (regex.test(descricao) && descricao.length > 5);
    } 

    static conferirDataValida(data) {
        const hoje = new Date();
        const dataServico = new Date(data);
        return dataServico <= hoje;
    }

    static calcularDiferencaHoras(horas1, horas2) {
        const [horas1Horas, horas1Minutos, horas1Segundos] = horas1.split(':').map(Number);
        const [horas2Horas, horas2Minutos, horas2Segundos] = horas2.split(':').map(Number);
    
        let diffHoras = horas1Horas - horas2Horas;
        let diffMinutos = horas1Minutos - horas2Minutos;
        let diffSegundos = horas1Segundos - horas2Segundos;
    
        if (diffSegundos < 0) {
          diffMinutos -= 1;
          diffSegundos += 60;
        }
    
        if (diffMinutos < 0) {
          diffHoras -= 1;
          diffMinutos += 60;
        }

        return `${diffHoras.toString().padStart(2, '0')}:${diffMinutos.toString().padStart(2, '0')}:${diffSegundos.toString().padStart(2, '0')}`;
    }

    static async conferirRegistros(dataServico, FKinstrutor, horaInicio, horaFinal, registroEditadoId = null) {
        const whereClause = { FKinstrutor, dataServico };

        if (registroEditadoId) {
            whereClause.id = { [Op.ne]: registroEditadoId };
        }

        const registrosNoMesmoDia = await Registro.findAll({ where: whereClause });

        const novoInicio = new Date(`1970-01-01T${horaInicio}`);
        const novoFim = new Date(`1970-01-01T${horaFinal}`);

        return registrosNoMesmoDia.some(registro => {
            const registroInicio = new Date(`1970-01-01T${registro.horaInicio}`);
            const registroFim = new Date(`1970-01-01T${registro.horaFinal}`);

            return (
                (novoInicio >= registroInicio && novoInicio < registroFim) ||
                (novoFim > registroInicio && novoFim <= registroFim) ||
                (novoInicio <= registroInicio && novoFim >= registroFim)
            );
        });
    }
    // Função auxiliar para converter string de tempo (HH:MM:SS) para segundos
    static tempoParaSegundos(tempo) {
        const [horas, minutos, segundos] = tempo.split(':').map(Number);
        return (horas * 3600) + (minutos * 60) + segundos;
    }

}

class CoordAreaController {
    static async listarRegistros(req, res) {
        try {
            const { matriculaInstrutor } = req.params;

            const intrutor = await RegistroServico.buscarNomeInstrutor(matriculaInstrutor)
            const registros = await RegistroServico.listarRegistrosEmAnalisePorInstrutor(matriculaInstrutor);

            res.status(200).json({intrutor, registros});
        } catch (error) {
            res.status (500).json({ error: error.message });
        }
    }

    static async validarRegistro(req, res) {
        try {
            const { matriculaCoordenador, registroId } = req.params;
            if (!await RegistroServico.isRegistroEmAnalisePorId(registroId)) {
                return res.status(400).json({ error: "O registro não está em análise." });
            }

            await RegistroServico.atualizarRegistro(registroId, {
                status: "Validado",
                FKcoordenador: matriculaCoordenador
            });

            await RegistroServico.calcularHoras(registroId);

            res.status(200).json({msg: "Serviço educacional avalidado com sucesso!"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async validarParcialmenteRegistro(req, res) {
        try {
            const { matriculaCoordenador, registroId } = req.params;
            const { justificativa, total } = req.body;
    
            // Obter total original do registro
            const totalOriginal = await RegistroServico.obterTotalRegistroPorId(registroId);
    
            // Converter total e totalOriginal para segundos
            const totalSegundos = RegistroServico.tempoParaSegundos(total);
            const totalOriginalSegundos = RegistroServico.tempoParaSegundos(totalOriginal);
    
            // Verificar se o registro está "Em Análise"
            if (!await RegistroServico.isRegistroEmAnalisePorId(registroId)) {
                return res.status(400).json({ error: "O registro não está em análise." });
            }
    
            // Validar justificativa
            if (!RegistroServico.validarDescricao(justificativa)) {
                return res.status(400).json({ error: "Justificativa inválida." });
            }
            
            console.log(total, totalSegundos, totalOriginalSegundos)
            // Determinar o novo status do registro
            let status;
            if (totalSegundos == 0) {
                status = "Recusado";
            } else if (totalSegundos < totalOriginalSegundos) {
                status = "Parcialmente validado";
            } else if (totalSegundos == totalOriginalSegundos) {
                status = "Validado";
            } else {
                return res.status(400).json({ error: "A quantidade de horas foi excedida." });
            }
    
            // Atualizar o registro com novo status, total e justificativa
            await RegistroServico.atualizarRegistro(registroId, {
                status,
                justificativa,
                total,
                FKcoordenador: matriculaCoordenador
            });
    
            await RegistroServico.calcularHoras(registroId);
            
            res.status(200).json({ msg: "Serviço educacional avaliado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async cadastrarRegistro(req, res) {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;
            const FKcoordenador = req.params.matriculaCoordenador;
            const FKinstrutor = req.params.matriculaInstrutor;

            if(titulo.length > 50){
                return res.status(400).json({error: "Limite de caracteres para o título foi atingido."})
            }

            //validação básica do texto da descrição
            if (!RegistroServico.validarDescricao(descricao)) {
                return res.status(400).json({ error: "Descrição inválida." });
            }

            //conferindo se a data corresponde ao período em vigor ou está no futuro
            if (!RegistroServico.conferirData(dataServico)) {
                return res.status(400).json({ error: "Não é permitido cadastrar registros para datas futuras." });
            }

            //conferindo se a hora é válida
            if (RegistroServico.conferirHora(horaInicio, horaFinal)){
                return res.status(400).json({ error: "Registro com horas inválidas." });
            }            
            
            //confere se não existe algum registro com a data e hora igual ou que se sobrepõe, já registrado
            if (await RegistroServico.conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio)) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data." });
            }

            // Calcular total de horas
            const total = RegistroServico.calcularDiferencaHoras(horaInicio, horaFinal);

            // Cadastrar novo registro
            await RegistroServico.cadastrarRegistro({
                dataServico,
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

            res.status(200).json({ msg: "Registro cadastrado." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async perfilCorodenador(req, res){
        try {
            const { matriculaCoordenador } = req.params;

            //busca pelo instrutor de acordo com o id
            const coordenador = await RegistroServico.buscarCoordenador(matriculaCoordenador);

            if(coordenador == null){
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            res.status(200).json(coordenador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async home(req, res) {
        try {
            const { matriculaCoordenador } = req.params;

            // Busca a quantidade de instrutores que não tem horas cadastradas no período
            const instrutoresSemHorasTabalhadas = await RegistroServico.listarInstrutoresComHorasZeradasPeriodo(matriculaCoordenador);

            // Busca a quantidade de instrutores que estão excedendo as horas
            const instrutoresSaldoExcedente = await RegistroServico.listarInstrutoresComSaldoHora(matriculaCoordenador);

            // Listar instrutores por área do coordenador
            const listarInstrutores = await RegistroServico.listarInstrutoresPorArea(matriculaCoordenador);

            // Organiza o response da rota
            const response = {
                instrutoresSemHorasTabalhadas,
                instrutoresSaldoExcedente,
                listarInstrutores
            };

            res.status(200).json(response);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || 'Erro ao carregar a home';
            res.status(status).json({ error: message });
        }
    }
}

module.exports = CoordAreaController;