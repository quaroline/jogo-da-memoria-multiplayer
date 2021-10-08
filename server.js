'use strict';

const express = require('express')
const Jogador = require('./classes/jogador')
const Utils = require('./classes/utils')

const jogador = new Jogador()
const utils = new Utils()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:4200']
    }
})

const { v4: uuidv4 } = require('uuid')

const jogadores = []

const entrarEmPartida = (socket, partidaId) => {
    socket.join(partidaId)

    utils.enviarInformacoesParaCliente(socket, 'pegarInformacoesDaPartida', { 
        partidaId, 
        jogadorId: socket.id 
    })
}

const inicializarJogador = (socket) => {
    let jogador = { 
        id: socket.id, 
        nomeDeUsuario: utils.gerarNomeDeUsuario() 
    }

    jogadores.push(jogador)

    utils.enviarInformacoesParaCliente(socket, 'pegarJogador', jogador)
}

io.on('connection', (socket) => {
    inicializarJogador(socket)

    // Rotas
    socket.on("novo-jogo", () => {
        entrarEmPartida(socket, `partida_${uuidv4()}`)
    });

    socket.on("entrar-em-partida-existente", (partidaId) => {
        entrarEmPartida(socket, `partida_${partidaId}`)
    })
})

server.listen(3000)