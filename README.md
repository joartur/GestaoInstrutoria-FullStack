
# Gestão Instrutoria

Projeto integrado com o front e back end focado na gestão de carga horária dos instrutores.


## Instalação

Instale a versão FullStack com cmd

```bash
git clone https://github.com/tec-desenvol-sistemas-2023-10-5/GestaoInstrutoria-FullStack

cd .\GestaoInstrutoria-FullStack
```

### Instalação Back

Instale do projeto back-end

```bash
cd .\GestaoInstrutoriaBack

npm install
```

    1. Crie o arquivo `.env` na raiz do projeto back-end e atualize as informações de conexão com o banco de dados de acordo com a sua configuração.
```bash
DB_USER=<USUARIO>
DB_PWD=<SENHA>
DB_NAME=<NOME DA BASE>
DB_HOST=<ENDERECO DO SERVIDOR>
DB_PORT=<PORTA DO SERVIDOR>
DB_DIALECT=<TIPO DE BANCO>
NODE_ENV=<TIPO DE DESENVOLVIMENTO(visto no aqrivo config. js)>
```

    2. Certifique-se de que o banco de dados especificado no arquivo de configuração já existe. Se não existir, você pode criá-lo manualmente ou usar o comando Sequelize CLI:`npx sequelize-cli db:create`.

    3.  Execute as migrações para criar as tabelas no banco de dados:

`npx sequelize-cli db:migrate`

    3.1 Se desejar, você pode popular as tabelas com dados de exemplo usando seeds:

`npx sequelize-cli db:seed:all`

    4. Com todas as configurações e migrações feitas, você pode iniciar o projeto:

`npm run dev`


### Instalação Front

Instale do projeto front-end

```bash
cd .\GestaoInstrutoriaFront

npm install

npm start
```

