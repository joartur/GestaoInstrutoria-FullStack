const Registro = require("../models/Registro");

const instrutorController = {
    cadastarRegistro: async (req, res) => {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;
            const FKinstrutor = req.params.matriculaI;
            
                // Calcula a diferença de tempo em horas
                const horaInicioMs = new Date(`1970-01-01T${horaInicio}`).getTime();
                const horaFinalMs = new Date(`1970-01-01T${horaFinal}`).getTime();
                const diffHours = (horaFinalMs - horaInicioMs) / (1000 * 60 * 60);
                
                // Cria o registro no banco de dados
                const registro = await Registro.create({
                    dataServico,
                    horaInicio,
                    horaFinal,
                    total: diffHours,
                    titulo,
                    descricao,
                    FKservico,
                    FKinstrutor
                });
                
            // Retorna o registro criado
            res.json({ msg: "Registro cadastrado"});
        } catch (error) {
            // Se houver algum erro, retorna uma mensagem de erro
            res.status(500).json({ error: error.message });
        }
    },
    visualizarRegistro: async(req,res)=>{
        try {
            const FKinstrutor = req.params.matriculaI;
            const id = req.params.registroId;

            // Procura todas as informaçoes de um registro associado ao instrutor
            const registro = await Registro.findAll({
                where: { 
                    FKinstrutor, id
                }});           
            
            //retorna registro econtrado
            res.status(200).json({ msg: "Registro encontrados", data: registro });
        } catch (error) {
            // Se houver algum erro, retorna uma mensagem de erro
            res.status(500).json({ error: error.message });
        }
    },
    listarRegistros: async (req, res) => {
        try {
            const FKinstrutor = req.params.matriculaI;
    
            // Procura todos os registros associados ao instrutor
            const registros = await Registro.findAll({ where: { FKinstrutor } });
    
            // Retorna os registros encontrados
            res.status(200).json({ msg: "Registros encontrados", data: registros });
        } catch (error) {
            // Se houver algum erro, retorna uma mensagem de erro
            res.status(500).json({ error: error.message });
        }
    },
    editarRegistro: async (req, res) => {
        try {
            const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico } = req.body;
            const FKinstrutor = req.params.matriculaI;
            const id = req.params.registroId;
    
            // Calcula a diferença de tempo em horas
            const horaInicioMs = new Date(`1970-01-01T${horaInicio}`).getTime();
            const horaFinalMs = new Date(`1970-01-01T${horaFinal}`).getTime();
            const diffHours = (horaFinalMs - horaInicioMs) / (1000 * 60 * 60);
    
            // Atualiza o registro no banco de dados
            const [rowsUpdated] = await Registro.update({
                dataServico,
                horaInicio,
                horaFinal,
                total: diffHours,
                titulo,
                descricao,
                FKservico,
                FKinstrutor
            }, { where: { id } });
    
            // Verifica se o registro foi atualizado com sucesso
            if (rowsUpdated === 0) {
                return res.status(404).json({ error: "Registro não encontrado" });
            }
    
            // Retorna uma mensagem de sucesso
            res.json({ msg: "Registro atualizado com sucesso" });
        } catch (error) {
            // Se houver algum erro, retorna uma mensagem de erro
            res.status(500).json({ error: error.message });
        }
    },
    excluirRegistro: async(req, res)=>{
        try{
            const FKinstrutor = req.params.matriculaI
            const id = req.params.registroId

            await Registro.destroy({where: {FKinstrutor, id}})

            res.json({msg: "Registro excluído com sucesso"})
        } catch (error) {
            // Se houver algum erro, retorna uma mensagem de erro
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports= instrutorController;