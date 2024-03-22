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
    const registro = await Registro.findAll({where: {id:idRegistro}})

    registro.forEach(async (reg)=>{
        //encontrar o instrutor que fez o registro
        const instrutor = await Instrutor.findAll({where: {matricula: reg.FKinstrutor}})

        instrutor.forEach(async (ins)=>{
            let hrTrabAtt = calcularHorasTrab(reg.total, ins.horasTrabalhadas);

            await Instrutor.update({
                horasTrabalhadas: hrTrabAtt
            }, { where: { matricula: ins.matricula } });

        })
    })
}

//modificar o valor das horas cadastradas (adicionando)
function calcularHorasTrab(horasTrab, horasRegis) {
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
    
    console.log(horaFormatada, somaHoras, somaMinutos, horasRegis, horasTrab);
    return horaFormatada;
}
module.exports = coordAreaController;