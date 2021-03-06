'use strict';

const express = require('express')

const Utils = require('./classes/utils')
const Partida = require('./classes/partida')

const partida = new Partida()
const utils = new Utils()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:4200']
    }
})

const jogadores = []

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
    socket.on("novo-jogo", (dificuldade) => {
        partida.iniciarNovaPartida(socket, dificuldade)
    });

    socket.on("entrar-em-partida-existente", (partidaId, callback) => {
        if (io.sockets.adapter.rooms.has(partidaId))
            if (partida.partidaPermiteNovoJogador(socket, partidaId))
                partida.entrarEmPartida(socket, partidaId)
            else {
                utils.executarRetorno(callback, 'Esta partida já contém dois membros.', 500)
            }
        else {
            utils.executarRetorno(callback, 'Código Inválido', 500)
        }
    })
})

server.listen(3000)