const request = require('supertest');
const { app } = require('../../index'); // Importa o arquivo onde o app é definido
const { iniciarServidor } = require('../../index'); // Importa a função que inicia o servidor

describe('CoordArea API', () => {
    let server;

    beforeAll(async () => {
        server = await iniciarServidor(); // Inicia o servidor antes de todos os testes
    });

    afterAll(async () => {
        await server.close(); // Fecha o servidor após todos os testes
    });

    it('GET /coordArea/:matriculaCoordenador deve buscar dados da tela inicial do coordenador', async () => {
        const res = await request(app)
            .get('/coordArea/5678901234')
            .expect(200);
        
        expect(res.body).toHaveProperty('instrutoresSemHorasTabalhadas');
        expect(res.body).toHaveProperty('instrutoresSaldoExcedente');
        expect(res.body).toHaveProperty('listarInstrutores');
    });

    it('GET /coordArea/listarRegistros/:matriculaInstrutor deve listar registros de um instrutor', async () => {
        const res = await request(app)
            .get('/coordArea/listarRegistros/2345678901')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('instrutor');
        expect(res.body).toHaveProperty('registros');
        expect(Array.isArray(res.body.registros)).toBe(true);
    });

    it('GET /coordArea/perfil/:matriculaCoordenador deve retornar perfil do coordenador', async () => {
        const res = await request(app)
            .get('/coordArea/perfil/1234567890')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('tipoUsuario', 'coordenador');
        expect(res.body).toHaveProperty('Areas');
    });
    
});
