# Gestão da Carga Horária da Instrutoria

Este é um projeto desenvolvido usando Sequelize e Node.js.

## Sumário
- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente Front-End](#configuração-do-ambiente-front-end)
- [Configuração do Ambiente Back-End](#configuração-do-ambiente-back-end)
    - [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
    - [Migrations e Seeds](#migrations-e-seeds)
- [Executando o Projeto](#executando-o-projeto)
- [Acessar a Documentação da API](#acessar-a-documentação-da-api)
- [Referências do projeto](#referências)

## Descrição do Projeto

O projeto Gestão da Carga Horária de Serviços Educacionais da Instrutoria tem como objetivo gerenciar a carga horária de instrutores do Senac Centro. O sistema permite o cadastro, acompanhamento e controle das horas de trabalho dos instrutores, facilitando a administração e a geração de relatórios.

## Funcionalidades

- Registro de carga horária do serviço educacional
- Consulta e edição de registros
- Validação de carga horária
- Geração de relatórios em excel e pdf
- Cadastro de usuários, serviços educacionais e eixos/areas de ensino
- Documentação da API

## Estrutura do Projeto

O projeto está dividido em duas partes principais:
- **Back-End:** Implementado em Node.js com Sequelize para a interação com o banco de dados.
- **Front-End:** Implementado em React para a interface de usuário.

## Configuração do Ambiente Front-End

Para executar o front-end deste projeto em sua máquina local, siga as etapas abaixo:

### Instalação

1. Clone o repositório do GitHub:

    ```bash
    git clone https://github.com/tec-desenvol-sistemas-2023-10-5/GestaoInstrutoria-FullStack.git
    ```

2. Acesse o diretório do projeto:
    ```bash
    cd .\GestaoInstrutoria-FullStack\GestaoInstrutoriaFront
    ```
3. Instale as dependências do projeto:
    ```bash
    npm install
    ```
4. Inicie o projeto:
    ```bash
    npm start
    ```

## Configuração do Ambiente Back-End

Para executar o back-end deste projeto em sua máquina local, siga as etapas abaixo:

### Pré-requisitos

- Node.js instalado em sua máquina. Você pode baixá-lo e instalá-lo a partir do [site oficial](https://nodejs.org/).
- Um banco de dados MySQL instalado e configurado.

### Instalação

1. Acesse o diretório do projeto:

    ```bash
    cd .\GestaoInstrutoria-FullStack\GestaoInstrutoriaBack
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

### Configuração do Banco de Dados

1. **Variáveis de Ambiente** -> Crie o arquivo `.env` na raiz do diretório back-end e atualize as informações de conexão com o banco de dados de acordo com a sua configuração.

    ```env
    DB_USER=<SEU USUARIO>
    DB_PWD=<SUA SENHA>
    DB_NAME=<NOME DO BANCO DE DADOS>
    DB_HOST=<ENDERECO DO SERVIDOR>
    DB_PORT=<PORTA DO SERVIDOR>
    DB_DIALECT=<TIPO DE BANCO>
    NODE_ENV=<TIPO DE DESENVOLVIMENTO>
    ```

2. Certifique-se de que o banco de dados especificado no arquivo de configuração já existe. Se não existir, você pode criá-lo manualmente ou usar o comando:

    ```bash
    npm run db:create
    ```

### Migrations e Seeds

1. Execute as migrações para criar as tabelas no banco de dados:

    ```bash
    npm run db:migrate
    ```

2. Se desejar, você pode popular as tabelas com dados de exemplo usando seeds:

    ```bash
    npm run db:seed
    ```

### Executando o Projeto

Com todas as configurações e migrações feitas, você pode iniciar o projeto:

```bash
npm run dev
```
O servidor será iniciado e estará pronto para uso.

## Acessar a Documentação da API
1. Execute os passos anteriores para uma completa experiência do projeto.

2. Inicie o servidor:
    ```bash
    npm run dev
    ```

3. Após isso acesse a url:
	```bash
 	http://localhost:3000/api-docs/
	```

Pronto, agora você pode consultar todas as funcionalidade desenvolvidas até o momento.


## Referências

Aqui estão algumas referências importantes baseadas nas dependências utilizadas no projeto:

#### Back-End

- [Node.js](https://nodejs.org/): Plataforma de desenvolvimento baseada em JavaScript que permite construir aplicações de alta performance.
- [Express](https://expressjs.com/): Framework web para Node.js, utilizado para construir APIs de forma simples e eficiente.
- [dotenv](https://github.com/motdotla/dotenv): Módulo que carrega variáveis de ambiente de um arquivo `.env` para o `process.env`.
- [Sequelize](https://sequelize.org/): ORM para Node.js que facilita a interação com bancos de dados SQL.
- [MySQL2](https://github.com/sidorares/node-mysql2): Módulo para Node.js que facilita a interação com bancos de dados MySQL.
- [Swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) e [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express): Ferramentas para a documentação de APIs.
- [Nodemon](https://nodemon.io/): Ferramenta que ajuda a desenvolver aplicações Node.js reiniciando automaticamente o servidor quando arquivos do projeto são modificados.
- [Jest](https://jestjs.io/): Framework de testes em JavaScript.
- [Supertest](https://github.com/visionmedia/supertest): Ferramenta para testar APIs HTTP.
- [Prom-client](https://github.com/siimon/prom-client): Biblioteca para instrumentar métricas em aplicações Node.js para Prometheus.
- [Moment](https://momentjs.com/) e [Moment-Timezone](http://momentjs.com/timezone/): Bibliotecas para manipulação de datas e fusos horários.

#### Front-End

- [React](https://reactjs.org/): Biblioteca JavaScript para construir interfaces de usuário.
- [React Router](https://reactrouter.com/): Biblioteca para roteamento em aplicações React.
- [Axios](https://axios-http.com/): Cliente HTTP baseado em Promises para fazer requisições.
- [React Hook Form](https://react-hook-form.com/): Biblioteca para manipulação de formulários em React.
- [React Data Grid](https://adazzle.github.io/react-data-grid/): Componente de tabela para React.
- [React Calendar](https://github.com/wojtekmaj/react-calendar): Componente de calendário para React.
- [Emotion](https://emotion.sh/docs/introduction): Biblioteca para estilização em aplicações React.
- [Font Awesome](https://fontawesome.com/): Biblioteca de ícones.
- [Testing Library](https://testing-library.com/): Conjunto de utilitários para testar componentes React.
- [Cypress](https://www.cypress.io/): Framework de testes end-to-end.
- [Web Vitals](https://web.dev/vitals/): Métricas para medir a performance de sites.

Essas referências fornecem uma base sólida para entender e trabalhar com as tecnologias envolvidas no projeto. Se precisar de mais informações ou tiver dúvidas, consulte a documentação oficial dessas ferramentas.

