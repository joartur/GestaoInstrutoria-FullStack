const request = require('supertest');
const { app } = require('../../../index'); // Supondo que o app Express está exportado de 'index.js'

describe('Instrutor Endpoints', () => {
    it('Deve criar um novo registro do instrutor', async () => {
        const res = await request(app)
            .post('/instrutor/registro/2345678901')
            .send({
                dataServico: '2023-01-04',
                horaInicio: '08:00:00',
                horaFinal: '10:00:00',
                total: '02:00:00',
                titulo: 'Material de aula para quinta',
                descricao: '',
                FKservico: 4
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('msg', 'Registro cadastrado.');
    });

    it('Deve atualizar o registro', async () => {
        const res = await request(app)
            .put('/instrutor/registro/2345678901/7')
            .send({
                dataServico: "2024-05-20",
                horaInicio: "06:00:00",
                horaFinal: "09:30:00",
                titulo: "1º consulta com o zé boné",
                descricao: "consulta de recomendação nutricional",
                FKservico: "10"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Registro atualizado com sucesso.');
    });

    it('Deve consultar os registros com base nas datas e tipos de serviços', async () => {
        const res = await request(app)
            .post('/instrutor/registro/2345678901')
            .query({ dataInicioFiltro: "", dataFinalFiltro: "", FKservico: "" });
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body).toHaveProperty('msg', 'Registros encontrados.');
    });

    it('Deve consultar o registro por ID', async () => {
        const res = await request(app)
            .get('/instrutor/registro/2345678901/7');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Registro encontrado.');
    });

    it('Deve deletar o registro', async () => {
        const res = await request(app)
            .delete('/instrutor/registro/2345678901/6');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Registro excluído com sucesso.');
    });

    it('Deve consultar os detalhes do instrutor', async () => {
        const res = await request(app)
            .get('/instrutor/2345678901');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('datasServico');
    });
});