'use strict';

const Utils = require('./utils')

const utils = new Utils()

const { v4: uuidv4 } = require('uuid')

module.exports = class Partida {
    constructor() {}

    #enviarInformacoesDaPartidaParaCliente = (socket, partidaId) => {
        utils.enviarInformacoesParaCliente(socket, 'pegarPartida', { 
            partidaId, 
            jogadorId: socket.id 
        })
    }

    entrarEmPartida = (socket, partidaId) => {
        socket.join(partidaId)
    
        this.#enviarInformacoesDaPartidaParaCliente(socket, partidaId)
    }

    iniciarNovaPartida = (socket) => {
        let partidaId = uuidv4()

        socket.join(partidaId)

        this.#enviarInformacoesDaPartidaParaCliente(socket, partidaId)
    }

    partidaPermiteNovoJogador = (socket, partidaId) => {
        let iteratorJogadores = socket.to(partidaId).adapter.rooms.get(partidaId).values()
        let numeroJogadoresOnline = 0

        while (utils.iteratorHasNext(iteratorJogadores)) 
            numeroJogadoresOnline++

        return numeroJogadoresOnline === 1
    }
}