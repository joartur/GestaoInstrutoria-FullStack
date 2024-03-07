# Gestão da carga horária da Instrutoria

Este é um projeto desenvolvido usando Sequelize e Node.js.

## Sumário
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Acessar a documentação da API](#acessar-a-documentação-da-api)

## Configuração do Ambiente

Para executar este projeto em sua máquina local, siga as etapas abaixo:

### Pré-requisitos

- Node.js instalado em sua máquina. Você pode baixá-lo e instalá-lo a partir do [site oficial](https://nodejs.org/).
- Um banco de dados MySQL instalado e configurado. 

### Instalação

1. Clone o repositório do GitHub:

        git clone https://github.com/tec-desenvol-sistemas-2023-10-5/GestaoInstrutoriaBack.git

2. Acesse o diretório do projeto:

        cd .\GestaoInstrutoriaBack

3. Instale as dependências do projeto:

        npm install

### Configuração do Banco de Dados

1. Crie o arquivo `.env` na raiz do projeto e atualize as informações de conexão com o banco de dados de acordo com a sua configuração.
	```
	DB_USER=<USUARIO>
	DB_PWD=<SENHA>
	DB_NAME=<NOME DA BASE>
	DB_HOST=<ENDERECO DO SERVIDOR>
	DB_PORT=<PORTA DO SERVIDOR>
	DB_DIALECT=<TIPO DE BANCO>
	NODE_ENV=<TIPO DE DESENVOLVIMENTO>
	```

2. Certifique-se de que o banco de dados especificado no arquivo de configuração já existe.
	Se não existir, você pode criá-lo manualmente ou usar o comando Sequelize CLI:`npx sequelize-cli db:create`.

### Migrations e Seeds

1. Execute as migrações para criar as tabelas no banco de dados:

        npx sequelize-cli db:migrate

	1.1. Se desejar, você pode popular as tabelas com dados de exemplo usando seeds:

        npx sequelize-cli db:seed:all

### Executando o Projeto

Com todas as configurações e migrações feitas, você pode iniciar o projeto:

        npm run dev

O servidor será iniciado e estará pronto para uso.

## Acessar a documentação da API
1. É importante que execute os passos anteriores para uma completa experiência do projeto.

2. Feito isso, inicie o servidor:
	```
	npm run dev
	```
3. Após isso acesse a url:
	```
 	http://localhost:3000/api-docs/
	```

 Pronto, agora você pode consultar todas as funcionalidade desenvolvidas até o momento.
