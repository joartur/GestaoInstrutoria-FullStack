const express = require( 'express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.send('Olá, eu serei útil em algum momento!')
})

app.listen(port,()=>{
    console.log(`Aplicação rodando em http://localhost:${port}`)
})