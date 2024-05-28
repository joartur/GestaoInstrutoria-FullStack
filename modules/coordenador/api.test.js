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

    it('GET /coordArea/:matriculaCoordenador deve buscar coordenador', async () => {
        const res = await request(app)
            .get('/coordArea/5678901234')
            .expect('Content-Type', /json/)
            .expect(200);
        
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('tipoUsuario', 'coordenador');
    });

    it('GET /coordArea/listarRegistros/:matriculaInstrutor deve listar registros', async () => {
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
    });

    it('PUT /coordArea/validarRegistro/:matriculaCoordenador/:registroId deve validar registro', async () => {
        const res = await request(app)
            .put('/coordArea/validarRegistro/1234567890/9')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('msg', 'Serviço educacional avalidado com sucesso!');
    });

    it('PUT /coordArea/validarParcialmenteRegistro/:matriculaCoordenador/:registroId deve validar parcialmente registro', async () => {
        const res = await request(app)
            .put('/coordArea/validarParcialmenteRegistro/1234567890/8')
            .send({
                justificativa: 'Material insuficiente',
                total: '02:30:00'
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('msg', 'Serviço educacional avaliado com sucesso!');
    });

    it('POST /coordArea/registro/:matriculaCoordenador/:matriculaInstrutor deve cadastrar registro', async () => {
        const res = await request(app)
            .post('/coordArea/registro/2345678901/1234567890')
            .send({
                dataServico: '2024-05-09',
                horaInicio: '10:00:00',
                horaFinal: '13:00:00',
                titulo: 'Pabbabrte',
                descricao: 'Se coabayguso!!!',
                FKservico: '2'
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('msg', 'Registro cadastrado.');
    });
});
