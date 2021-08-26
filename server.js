const { SSL_OP_NO_TICKET } = require('constants')
const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'app/src')))
app.set('views', path.join(__dirname, 'app/src'))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

let mensagens = []

io.on('connection', socket => {
    console.log('Socket conectado ' + socket.id)

    socket.emit('previousMessages', mensagens)

    socket.on('sendMessage', dados => {
        mensagens.push(dados)

        socket.broadcast.emit('receivedMessage', dados)
    })
})

server.listen(3000)