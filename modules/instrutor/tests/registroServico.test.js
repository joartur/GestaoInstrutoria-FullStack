
const RegistroServico = require('../controllers/instrutorController');
const Registro = require('../../administrador/models/Registro');
const SequelizeMock = require('sequelize-mock');

// Mockando a conexão do Sequelize
const DBConnectionMock = new SequelizeMock();

describe('RegistroServico', () => {
    let RegistroMock;

    beforeAll(() => {
        // Mockando o modelo Registro
        RegistroMock = DBConnectionMock.define('Registro', {
            id: 1,
            dataServico: '2023-01-01',
            horaInicio: '08:00:00',
            horaFinal: '10:00:00',
            total: '02:00:00',
            titulo: 'Aula de Matemática',
            descricao: 'Aula introdutória de Matemática',
            status: 'Em Análise',
            FKinstrutor: '12345',
            FKservico: 1,
        });
        // Substituindo o modelo Registro pelo mock
        Registro.create = RegistroMock.create.bind(RegistroMock);
    });

    it('should create a new record', async () => {
        const novoRegistro = {
            dataServico: '2023-01-01',
            horaInicio: '08:00:00',
            horaFinal: '10:00:00',
            total: '02:00:00',
            titulo: 'Aula de Matemática',
            descricao: 'Aula introdutória de Matemática',
            FKinstrutor: '12345',
            FKservico: 1,
        };

        const result = await RegistroServico.cadastrarRegistro(novoRegistro);

        expect(result.dataServico).toBe(novoRegistro.dataServico);
        expect(result.horaInicio).toBe(novoRegistro.horaInicio);
        expect(result.horaFinal).toBe(novoRegistro.horaFinal);
        expect(result.total).toBe(novoRegistro.total);
        expect(result.titulo).toBe(novoRegistro.titulo);
        expect(result.descricao).toBe(novoRegistro.descricao);
        expect(result.FKinstrutor).toBe(novoRegistro.FKinstrutor);
        expect(result.FKservico).toBe(novoRegistro.FKservico);
        expect(result.status).toBe('Em Análise'); // Verificando se o status padrão é 'Em Análise'
    });
});
