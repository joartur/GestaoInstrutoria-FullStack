'use strict';

const fs = require('fs'); // (File System) para lidar com o sistema de arquivos
const path = require('path'); //para lidar com caminhos de arquivos e diretórios
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; //é o ambiente em que a aplicação está sendo executada (como development, test ou production)
const config = require(__dirname + '/../config/config.json')[env]; //é o objeto de configuração do banco de dados obtido do arquivo config.json com base no ambiente.
const db = {};

let sequelize;
//Uma instância do Sequelize é criada com base nas configurações do banco de dados obtidas do arquivo config.json
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
fs
//O código lê todos os arquivos no diretório onde ele está localizado.
  .readdirSync(__dirname)
  // Os arquivos são filtrados
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && //excluir arquivos que começam com . (ocultos)
      file !== basename && //o próprio arquivo de inicialização
      file.slice(-3) === '.js' && //arquivos que não são arquivos JavaScript (.js)
      file.indexOf('.test.js') === -1 //arquivos que contenham .test.js, presumivelmente arquivos de teste unitário.
    );
  })
  .forEach(file => {
    //Para cada arquivo restante, um modelo é carregado chamando a função exportada pelo arquivo, passando a instância do Sequelize e o objeto DataTypes como parâmetros.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //O modelo é então associado a uma propriedade do objeto db usando o nome do modelo como chave.
    db[model.name] = model;
  });

  //Depois que todos os modelos são carregados, o código verifica se cada modelo possui um método associate e, se existir, chama esse método, passando o objeto db como parâmetro.
  //Isso permite definir associações entre modelos, como associações de chave estrangeira.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Finalmente, o objeto db, que agora contém todos os modelos e suas associações, é exportado para ser usado em outras partes da aplicação.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
