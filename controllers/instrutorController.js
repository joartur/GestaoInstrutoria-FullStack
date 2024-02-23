const Registro = require("../models/Registro");

const instrutorController = {
    cadastrarRegistro: async (req, res) => {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;
            const FKinstrutor = req.params.matriculaI;
            
            // Verifica se já existe algum registro para o instrutor na mesma data
            const sobreposicaoHoras = await conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio);

            if (sobreposicaoHoras) {
                return res.status(400).json({ error: "Já existe um registro com horário sobreposto para este instrutor nesta data" });
            }

            const total = calcularDiferencaHoras(horaInicio, horaFinal);
            
            const registro = await Registro.create({
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

            const registro = await Registro.findOne({
                where: { FKinstrutor: matriculaI, id: registroId }
            });

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
    }
}

function calcularDiferencaHoras(horaInicio, horaFinal) {
    // Calcula a diferença de tempo em horas
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

    // Converte os horários de string para objeto Date
    const novoInicio = new Date(`1970-01-01T${horaInicio}`);
    const novoFim = new Date(`1970-01-01T${horaFinal}`);

    // Verifica se há sobreposição de horários com os registros existentes
    const sobreposicao = registrosNoMesmoDia.some(registro => {
        const registroInicio = new Date(`1970-01-01T${registro.horaInicio}`);
        const registroFim = new Date(`1970-01-01T${registro.horaFinal}`);

        // Verifica se o horário de início ou fim do novo registro está dentro do horário do registro existente
        return (
            (novoInicio >= registroInicio && novoInicio < registroFim) ||
            (novoFim > registroInicio && novoFim <= registroFim) ||
            (novoInicio <= registroInicio && novoFim >= registroFim)
        );
    });

    return sobreposicao;
}

module.exports = instrutorController;
