const Registro = require("../models/Registro");
const Servico = require("../models/Servico");
const sequelize = require('../database/connection.js');
const { Op } = require('sequelize');
const funcao = require('./funcoesController.js');

const instrutorController = {
    cadastrarRegistro: async (req, res) => {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;
            const FKinstrutor = req.params.matriculaI;

            if(titulo.length > 50){
                return res.status(400).json({error: "Limite de caracteres para o título foi atingido."})
            }

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

            if (ordemHora){
                return res.status(400).json({ error: "Registro com horas inválidas." });
            }            
            
            //confere se não existe algum registro com a data e hora igual ou que se sobrepõe, já registrado
            const sobreposicaoHoras = await funcao.conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data." });
            }

            //calcula o total de horas e retorna em time
            const total = funcao.calcularDiferencaHoras(horaInicio, horaFinal);
            
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
            const registro = await funcao.buscarRegistro(matriculaI, registroId);

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

            const registro = await funcao.buscarRegistro(matriculaI, registroId);

            if (!registro) {
                return res.status(404).json({ error: "Registro não encontrado" });
            }
            
            //verifica se o registro pode ser editado pelo status
            if (registro.status == "Validado" || registro.status == "Parcialmente Validado"){
                return res.status(400).json({ error: "Não é permitido editar registro com status de 'Validado' ou 'Parcialmente Validado'" });
            }

            //validação básica do texto da descrição
            const validaDesc = await funcao.validarDesc(descricao);

            if (!validaDesc) {
                return res.status(400).json({ error: "Descrição inválida." });
            }

            const periodoData = await funcao.conferirData(dataServico);

            if (!periodoData) {
                return res.status(400).json({ error: "Não é permitido editar registros para datas futuras" });
            }
            
            const ordemHora = await funcao.conferirHora(horaInicio, horaFinal);

            if (ordemHora){
                return res.status(400).json({ error: "Registro com horas inválidas." });
            }            

            const sobreposicaoHoras = await funcao.conferirRegistros(dataServico, matriculaI, horaFinal, horaInicio, registroId);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data." });
            }

            const total = funcao.calcularDiferencaHoras(horaInicio, horaFinal);

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
            
            const registro = await funcao.buscarRegistro(matriculaI, registroId);

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
            const datasServico = await funcao.buscarDatasServico(matriculaI);

            //busca e calcula as horas totais de serviço educacional
            const horasServicos = await funcao.calcularHorasServicos(matriculaI);
            
            //busca e calcula as horas totais validadas
            const horasTrab = await funcao.calcularHorasTrab(matriculaI);

            //busca pelo saldo de hora, se houver
            const saldoHoras = await funcao.buscarSaldoHoras(matriculaI);

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
            const instrutor = await funcao.buscarInstrutor(matriculaI);

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
            const { dataInicioFiltro, dataFinalFiltro, FKservico } = req.body

            let where = {
                FKinstrutor: matriculaI
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
            
            const registros = await Registro.findAll({
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

module.exports = instrutorController;
