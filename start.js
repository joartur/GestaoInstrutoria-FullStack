const { exec } = require('child_process');

// Comando para iniciar o primeiro servidor (substitua pelo seu próprio comando)
const comandoServidor1 = 'cd GestaoInstrutoriaBack/ && npm run dev';

// Comando para iniciar o segundo servidor (substitua pelo seu próprio comando)
const comandoServidor2 = 'cd GestaoInstrutoriaFront/ && npm start';

// Função para iniciar os servidores
function iniciarServidores() {
    // Iniciar o primeiro servidor
    exec(comandoServidor1, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao iniciar o primeiro servidor: ${error}`);
            return;
        }
        console.log(`Servidor 1 iniciado: ${stdout}`);
    });

    // Iniciar o segundo servidor
    exec(comandoServidor2, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao iniciar o segundo servidor: ${error}`);
            return;
        }
        console.log(`Servidor 2 iniciado: ${stdout}`);
    });
}

// Iniciar os servidores
iniciarServidores();
