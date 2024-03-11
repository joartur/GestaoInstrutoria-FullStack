const { where } = require("sequelize");
const Instrutor = require("../models/Instrutor.js")
const Registro = require("../models/Registro.js")

const coordAreaController = {
    listarInstrutores: async (req, res) => {
        try {
            const instrutores = await Instrutor.findAll();
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
    validarRegistro: async (req, res) => {
        try {
            const {id} = req.params

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
            } else {
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
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

async function calcularHoras(idRegistro) {
    //encontrar o registro validado
    //encontrar o instrutor que fez o registro
    //modificar o valor das horas cadastradas (adicionando)

    const registro = await Registro.findAll({where: {id:idRegistro}})

    registro.forEach(async (reg)=>{
        const instrutor = await Instrutor.findAll({where: {matricula: reg.FKinstrutor}})
        
        instrutor.forEach(async (ins)=>{
            let hrTrabAtt = calcularHorasTrab(reg.total, ins.horasTrabalhadas);

            await Instrutor.update({
                horasTrabalhadas: hrTrabAtt
            }, { where: { matricula: ins.matricula } });

        })
    })
}

function calcularHorasTrab(horaRegis, horaTrab) {
    const horaRegisMS = new Date(`1970-01-01T${horaRegis}`).getTime();
    const horaTrabMs = new Date(`1970-01-01T${horaTrab}`).getTime();
    const somaMs = horaRegisMS + horaTrabMs; // soma das horas em milissegundos
    console.log(horaRegis, horaTrab, somaMs)

    // Calcular horas e minutos
    const somaHoras = Math.floor(somaMs / (1000 * 60 * 60)); // Horas
    const somaMinutos = Math.floor((somaMs % (1000 * 60 * 60)) / (1000 * 60)); // Minutos

    // Formatando o resultado
    let horaFormatada = `${somaHoras}:${somaMinutos < 10 ? '0' : ''}${somaMinutos}`;

    return horaFormatada;
}
module.exports = coordAreaController;