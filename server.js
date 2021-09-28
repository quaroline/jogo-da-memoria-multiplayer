const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:4200']
    }
})

const { v4: uuidv4 } = require('uuid')

io.on('connection', (socket) => {
    console.log('Socket conectado ' + socket.id)

    socket.on("novo-jogo", () => {
        console.log(uuidv4())
    });
})

server.listen(3000)