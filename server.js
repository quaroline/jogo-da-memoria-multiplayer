const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const cors = require('cors')

const { v4: uuidv4 } = require('uuid')

app.use(cors({
    credentials: true, 
    origin: true}
))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/api/novo-jogo', (_, res) => {
    res.json(uuidv4())
})

app.get('/', (_, res) => {
    res.send('Rota inicial funcionando.')
})

io.on('connection', (socket) => {
    console.log('Socket conectado ' + socket.id)
})

server.listen(3000)