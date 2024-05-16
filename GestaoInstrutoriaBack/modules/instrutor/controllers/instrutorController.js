const Registro = require("../../administrador/models/Registro.js");
const Instrutor = require("../models/Instrutor.js");
const Servico = require("../../administrador/models/Servico.js");
const sequelize = require('../../../config/connection.js');
const { Op, literal } = require('sequelize');

class RegistroServico {
    static async cadastrarRegistro(novoRegistro){
        return await Registro.create(novoRegistro);
    }

    static async atualizarRegistro(id, dados) {
        return await Registro.update(dados, { where: { id } });
    }
    
    static async excluirRegistro(id) {
        return  await Registro.destroy({ where: { id } });
    }
    
    static async buscarRegistros(matriculaInstrutor, condicao='') {
        let where = {
            FKinstrutor: matriculaInstrutor
        };

        if (condicao !== ''){
            let obj = Object.keys(condicao)

            obj.forEach((chave) => {
                where[chave] = condicao[chave]
            })
        };

        return await Registro.findAll({
            attributes: ['id','titulo', 'dataServico', 'horaInicio', 'horaFinal', 'total', 'status'],
            include: [{
                model: Servico,
                attributes: ['id','nome'],
                where: {
                    id: sequelize.col('Registro.FKservico')
                }
            }],
            where
        });
    }
    
    static async buscarRegistro(registroId) {
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
            where: { id: registroId }
        });
    }
    
    static async buscarDatasServico(matriculaInstrutor) {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = dataAtual.getMonth() + 1; 
    
        return await Registro.findAll({
            attributes: [
                [literal('DISTINCT dataServico'), 'dataServico']
            ],
            where: {
                FKinstrutor: matriculaInstrutor,
                [Op.and]: [
                    literal(`YEAR(dataServico) = ${anoAtual}`),
                    literal(`MONTH(dataServico) = ${mesAtual}`)
                ]
            }
        });
    }
    
    static async calcularHorasServicos(matriculaInstrutor) {
        let horas, minutos, segundos, horaFormatada;
        // retorna uma string com o valor somado ex. '473000' -> 47:30:00
        const somaHoraRegistros = await Registro.sum('total', {
            where: {
                FKinstrutor: matriculaInstrutor,
                status: {
                    [Op.or]: ["validado", "parcialmente validado"]
                }
            }
        });
    
        if(somaHoraRegistros == null){
            return "00:00:00";
        }
    
        if(somaHoraRegistros.length == 5){
            // Convertendo a string para horas, minutos e segundos
            horas = parseInt(somaHoraRegistros.substring(0, 1)); // Extrai as duas primeiras posições para as horas
            minutos = parseInt(somaHoraRegistros.substring(1, 3)); // Extrai as duas posições seguintes para os minutos
            segundos = parseInt(somaHoraRegistros.substring(3, 5)); // Extrai as duas últimas posições para os segundos
    
            // Formatando o resultado
            horaFormatada = `${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        } else {
            // Convertendo a string para horas, minutos e segundos
            horas = parseInt(somaHoraRegistros.substring(0, 2)); // Extrai as duas primeiras posições para as horas
            minutos = parseInt(somaHoraRegistros.substring(2, 4)); // Extrai as duas posições seguintes para os minutos
            segundos = parseInt(somaHoraRegistros.substring(4, 6)); // Extrai as duas últimas posições para os segundos
        
            // Formatando o resultado
            horaFormatada = `${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        }
    
        return horaFormatada;
    }
    
    static async buscarHorasTrab(matriculaInstrutor) {
        const instrutor = await Instrutor.findOne({
            attributes: ['horasTrabalhadas'],
            where: {
                matricula: matriculaInstrutor
            }
        });
    
        return instrutor.horasTrabalhadas;
    }
    
    static async buscarSaldoHoras(matriculaInstrutor) {
        const instrutor = await Instrutor.findOne({
            attributes: ['saldoHoras'],
            where: {
                matricula: matriculaInstrutor
            }
        });
    
        return instrutor.saldoHoras;
    }
    
    static async buscarInstrutor(matriculaInstrutor){
        const instrutor = await Instrutor.findOne({
            attributes: ['nome', 'email', 'unidade', 'area'],
            where: {
                matricula: matriculaInstrutor
            }
        });
        return instrutor;
    }
    
    static async conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio, registroEditadoId = null) {
        const whereClause = {
            FKinstrutor: FKinstrutor,
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

    static calcularDiferencaHoras(horaInicio, horaFinal) {
        // Extrair horas, minutos e segundos das strings de horaInicio e horaFinal
        const [inicioHoras, inicioMinutos] = horaInicio.split(':').map(Number);
        const [finalHoras, finalMinutos] = horaFinal.split(':').map(Number);
        
        // Calcular o total de milissegundos para horaInicio e horaFinal
        const horaInicioMs = (inicioHoras * 3600 + inicioMinutos * 60 + 0) * 1000;
        const horaFinalMs = (finalHoras * 3600 + finalMinutos * 60 + 0) * 1000;
        
        // Calcular a diferença em milissegundos
        const diffMs = horaFinalMs - horaInicioMs;
        
        // Calcular a diferença em horas, minutos e segundos
        const diffHouras = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSecondos = Math.floor((diffMs % (1000 * 60)) / 1000);
        
        // Formatar a diferença para hh:mm:ss
        const horaFormatada = `${diffHouras.toString().padStart(2, '0')}:${diffMinutos.toString().padStart(2, '0')}:${diffSecondos.toString().padStart(2, '0')}`;
    
        return horaFormatada;
    }
    
    static conferirData(data) {
        const hoje = new Date()
        const dataServico = new Date(`${data}`)
        
        if (dataServico > hoje) {
            return false
        } else {
            return true
        }
    }

    static conferirHora(hrInicio, hrFinal){
        return ( hrInicio >= hrFinal )
    }
    
    static validarDescricao(descricao){
        /*
        a expressão regular permite qualquer combinação de letras, números, espaços, vírgulas, pontos, exclamação, interrogação, hífens
        e caracteres acentuados, incluindo palavras, frases e números decimais simples, mas evita números independentes com quatro ou mais dígitos consecutivos.
        */
       const regex = /^(?!.*\b\d{4,}\b)(?!.*\b[A-Za-z]{20,}\b)[a-zA-Z0-9\s.,À-ÖØ-öø-ÿ\-!?\']+(?: [a-zA-Z0-9\s.,À-ÖØ-öø-ÿ\-!?\']+)*$/;
    
        // verifica o tamanho da descrição
        return (regex.test(descricao) && descricao.length > 15);
    } 
};

class InstrutorController {
    static async cadastrarRegistro(req, res) {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;
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

            //calcula o total de horas e retorna em time
            const total = RegistroServico.calcularDiferencaHoras(horaInicio, horaFinal);
            
            await RegistroServico.cadastrarRegistro({
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
    }

    static async visualizarRegistro(req, res) {
        try {
            const { registroId } = req.params;

            //busca um registro para ver se ele existe e retorna os dados dele
            const registro = await RegistroServico.buscarRegistro(registroId)

            if (!registro) {
                return res.status(404).json({ error: "Registro não encontrado." });
            }

            res.status(200).json({ msg: "Registro encontrado.", data: registro });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async listarRegistros(req, res) {
        try {
            const { matriculaInstrutor } = req.params;
    
            const registros = await RegistroServico.buscarRegistros(matriculaInstrutor)

            if (registros.length === 0) {
                return res.status(404).json({ error: "Registros não encontrados." });
            }
    
            res.status(200).json({ msg: "Registros encontrados.", data: registros });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async editarRegistro(req, res) {
        try {
            const { matriculaInstrutor, registroId } = req.params;
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;

            if(titulo.length > 50){
                return res.status(400).json({error: "Limite de caracteres para o título foi atingido."})
            }

            const registro = await RegistroServico.buscarRegistro(registroId);

            if (!registro) {
                return res.status(404).json({ error: "Registro não encontrado" });
            }
            
            //verifica se o registro pode ser editado pelo status
            if (registro.status == "Validado" || registro.status == "Parcialmente Validado"){
                return res.status(400).json({ error: "Não é permitido editar registro com status de 'Validado' ou 'Parcialmente Validado'" });
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
            if (await RegistroServico.conferirRegistros(dataServico, matriculaInstrutor, horaFinal, horaInicio, registroId)) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data." });
            }

            //calcula o total de horas e retorna em time
            const total = RegistroServico.calcularDiferencaHoras(horaInicio, horaFinal);
            
            await RegistroServico.atualizarRegistro( registroId, {
                dataServico,
                horaInicio,
                horaFinal,
                total,
                titulo,
                descricao,
                FKservico,
                status:"Em Análise",
                justificativa:""
            });

            res.json({ msg: "Registro atualizado com sucesso." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async excluirRegistro(req, res) {
        try {
            const { registroId } = req.params;
            
            const registro = await RegistroServico.buscarRegistro(registroId);

            if (!registro) {
                return res.status(404).json({ error: "Registro não encontrado." });
            }

            //verifica se o registro pode ser editado pelo status
            if (registro.status == "Validado" || registro.status == "Parcialmente Validado"){
                return res.status(400).json({ error: "Não é permitido excluir registro com status de 'Validado' ou 'Parcialmente Validado'" });
            }

            await RegistroServico.excluirRegistro(registroId)

            res.json({ msg: "Registro excluído com sucesso." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
  
    static async home(req, res){
        try {
            const { matriculaInstrutor } = req.params;

            //busca as datas de todos os registros do mês vigente
            const datasServico = await RegistroServico.buscarDatasServico(matriculaInstrutor);

            //busca e calcula as horas totais de serviço educacional
            const horasServicos = await RegistroServico.calcularHorasServicos(matriculaInstrutor);
            
            //busca e calcula as horas totais validadas
            const horasTrab = await RegistroServico.buscarHorasTrab(matriculaInstrutor);

            //busca pelo saldo de hora, se houver
            const saldoHoras = await RegistroServico.buscarSaldoHoras(matriculaInstrutor);

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
    }

    static async perfil(req, res){
        try {
            const { matriculaInstrutor } = req.params;

            //busca pelo instrutor de acordo com o id
            const instrutor = await RegistroServico.buscarInstrutor(matriculaInstrutor);

            if(instrutor == null){
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            res.status(200).json(instrutor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async filtroRegistros(req, res) {
        try{
            const { matriculaInstrutor } = req.params;
            const { dataInicioFiltro, dataFinalFiltro, FKservico } = req.body

            let where = {
            };

           // Adicione as condições de filtro para a data
            if (dataInicioFiltro && dataFinalFiltro) {
                where['dataServico'] = { [Op.between]: [dataInicioFiltro, dataFinalFiltro] };
            } else if (dataInicioFiltro && !dataFinalFiltro) {
                where['dataServico'] = { [Op.eq]: dataInicioFiltro };
            } else if (!dataInicioFiltro && dataFinalFiltro) {
                where['dataServico'] = { [Op.eq]: dataFinalFiltro };
            }

            // Adicione a condição de filtro para FKservico, se houver valor
            if (FKservico) {
                const fkServicosArray = FKservico.split(',').map(Number); // Divida a string em um array de números
                where['FKservico'] = { [Op.in]: fkServicosArray };
            }
            
            const registros = await RegistroServico.buscarRegistros(matriculaInstrutor, where);
    
            if (registros.length === 0) {
                return res.status(404).json({ error: "Registros não encontrados." });
            }
            
            res.status(200).json({ msg: "Registros encontrados", data: registros });
        } catch(error){
            res.status(500).json({ error: error.message })
        }
    }

    //rota para renderização da lista de atividades de servico edducacionais
    // melhorar levando para o administrador
    static async listaAtvs(req, res) {
        try {
            const servicos = await Servico.findAll({attributes: ['id', 'nome']});
            res.json({servicos});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = InstrutorController;