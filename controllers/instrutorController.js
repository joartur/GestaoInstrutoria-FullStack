const Registro = require("../models/Registro");
const Instrutor = require("../models/Instrutor");
const { Op, literal } = require('sequelize');

const instrutorController = {
    cadastrarRegistro: async (req, res) => {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;
            const FKinstrutor = req.params.matriculaI;
            
            const sobreposicaoHoras = await conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data" });
            }

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

            res.json({ msg: "Registro cadastrado"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    visualizarRegistro: async (req, res) => {
        try {
            const { matriculaI, registroId } = req.params;

            const registro = await buscarRegistro(matriculaI, registroId);

            if (!registro) {
                return res.status(404).json({ error: "Registro não encontrado" });
            }

            res.status(200).json({ msg: "Registro encontrado", data: registro });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    listarRegistros: async (req, res) => {
        try {
            const { matriculaI } = req.params;

            const registros = await Registro.findAll({ where: { FKinstrutor: matriculaI } });

            res.status(200).json({ msg: "Registros encontrados", data: registros });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    editarRegistro: async (req, res) => {
        try {
            const { matriculaI, registroId } = req.params;
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;

            const sobreposicaoHoras = await conferirRegistros(dataServico, matriculaI, horaFinal, horaInicio);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data" });
            }

            const total = calcularDiferencaHoras(horaInicio, horaFinal);

            const [rowsUpdated] = await Registro.update({
                dataServico,
                horaInicio,
                horaFinal,
                total,
                titulo,
                descricao,
                FKservico
            }, { where: { id: registroId, FKinstrutor: matriculaI } });

            if (rowsUpdated === 0) {
                return res.status(404).json({ error: "Registro não encontrado" });
            }

            res.json({ msg: "Registro atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    excluirRegistro: async (req, res) => {
        try {
            const { matriculaI, registroId } = req.params;

            await Registro.destroy({ where: { FKinstrutor: matriculaI, id: registroId } });

            res.json({ msg: "Registro excluído com sucesso" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
  
    home: async (req, res) => {
        try {
            const { matriculaI } = req.params;

            const registrosRecentes = await buscarRegistrosRecentes(matriculaI);

            const datasServico = await buscarDatasServico(matriculaI);

            const horasServicos = await calcularHorasServicos(matriculaI);

            const saldoHoras = await buscarSaldoHoras(matriculaI);

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

            const instrutor = await buscarInstrutor(matriculaI);

            res.status(200).json(instrutor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

async function buscarRegistro(matriculaI, registroId) {
    return await Registro.findOne({
        where: { FKinstrutor: matriculaI, id: registroId }
    });
}

async function buscarRegistrosRecentes(matriculaI) {
    return await Registro.findAll({
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

async function conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio) {
    const registrosNoMesmoDia = await Registro.findAll({
        where: {
            FKinstrutor,
            dataServico
        }
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
