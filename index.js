const express = require('express')
const cors = require('cors')
const db = require("./database/Connection");
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


db.sync().then(() => {
  console.log('Tabelas sincronizadas com sucesso.');
})
.catch((error) => {
  console.error('Erro ao sincronizar tabelas:', error);
});


app.get('/', (req, res)=>{
    res.send('Olá, eu serei útil em algum momento!')
})

app.listen(port,()=>{
    console.log(`Aplicação rodando em http://localhost:${port}`)
})