const { RegistroServico } = require('../controllers/instrutorController');
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
            titulo: 'Elaboração de materail',
            descricao: '',
            status: 'Em Análise',
            FKinstrutor: '12345',
            FKservico: 4,
        });
        // Substituindo o modelo Registro pelo mock
        Registro.create = RegistroMock.create.bind(RegistroMock);
        Registro.update = RegistroMock.update.bind(RegistroMock);
        Registro.destroy = RegistroMock.destroy.bind(RegistroMock);
        Registro.findAll = RegistroMock.findAll.bind(RegistroMock);
        Registro.findOne = RegistroMock.findOne.bind(RegistroMock);
        Registro.sum = RegistroMock.sum.bind(RegistroMock);
    });

    it('Verificar se novos registros podem ser cadastrados ao banco', async () => {
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

    it('Verificar se o registro estão sendo atualizados no banco de dados', async () => {
        const dadosAtualizados = {
            descricao: 'ELaboração de power point para aulas do mês dee agosto'
        };
        const id = 1;

        const result = await RegistroServico.atualizarRegistro(id, dadosAtualizados);

        expect(result[0]).toBe(1); // Verificando se exatamente um registro foi atualizado
    });

    it('Verificar se o registro está sendo excluído do banco', async () => {
        const id = 1;

        const result = await RegistroServico.excluirRegistro(id);

        expect(result).toBe(1); // Verificando se exatamente um registro foi excluído
    });

    it('Verificar se registros podem ser buscados por instrutor e condição, retornando uma lista', async () => {
        const matriculaInstrutor = '12345';
        const condicao = { status: 'Em Análise' };

        const result = await RegistroServico.buscarRegistros(matriculaInstrutor, condicao);

        expect(result.length).toBeGreaterThan(0); // Verificando se registros foram retornados
        expect(result[0].FKinstrutor).toBe(matriculaInstrutor);
    });

    it('Verificar se um registro pode ser buscado por ID', async () => {
        const registroId = 1;

        const result = await RegistroServico.buscarRegistro(registroId);

        expect(result).not.toBeNull();
        expect(result.id).toBe(registroId);
    });

    it('Verificar se as datas de serviço podem ser buscadas', async () => {
        const matriculaInstrutor = '12345';

        const result = await RegistroServico.buscarDatasServico(matriculaInstrutor);

        expect(result.length).toBeGreaterThan(0); // Verificando se registros foram retornados
        expect(result[0].dataServico).toBeDefined();
    });

    it('Verificar se as horas de serviço podem ser somadas e formatadas corretamente', async () => {
        const matriculaInstrutor = '12345';

        const result = await RegistroServico.calcularHorasServicos(matriculaInstrutor);

        expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/); // Verificando se o formato é hh:mm:ss
    });

    it('Verificar a diferença entre horas', () => {
        const horaInicio = '08:00';
        const horaFinal = '10:30';

        const result = RegistroServico.calcularDiferencaHoras(horaInicio, horaFinal);

        expect(result).toBe('02:30:00'); // Verificando a diferença calculada
    });

    it('Verificar se a data futura é conferida corretamente', () => {
        const dataFutura = '2099-12-31';
        const dataPassada = '2020-01-01';

        const resultFutura = RegistroServico.conferirDataFutura(dataFutura);
        const resultPassada = RegistroServico.conferirDataFutura(dataPassada);

        expect(resultFutura).toBe(false); // Verificando a data futura
        expect(resultPassada).toBe(true); // Verificando a data passada
    });

    it('Verificar se a descrição é validada corretamente', () => {
        const descricaoValida = 'Descrição válida com mais de 15 caracteres.';
        const descricaoInvalida = 'Curta';

        const resultValida = RegistroServico.validarDescricao(descricaoValida);
        const resultInvalida = RegistroServico.validarDescricao(descricaoInvalida);

        expect(resultValida).toBe(true); // Descrição válida
        expect(resultInvalida).toBe(false); // Descrição inválida
    });

    it('Verificar se a sobreposição de horários é conferida corretamente', async () => {
        const dataServico = '2023-01-01';
        const FKinstrutor = '12345';
        const horaInicio = '09:00:00';
        const horaFinal = '11:00:00';
        
        const result = await RegistroServico.conferirRegistros(dataServico, FKinstrutor, horaFinal, horaInicio);

        expect(result).toBe(true); // Verificando se há sobreposição
    });

    // Adicionar mais testes conforme necessário para cobrir todos os métodos
});
