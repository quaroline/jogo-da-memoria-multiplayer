'use strict';

const Utils = require('./utils')

const utils = new Utils()

const { v4: uuidv4 } = require('uuid')

module.exports = class Partida {
    constructor() {}

    #enviarInformacoesDaPartidaParaCliente = (socket, partidaId, dificuldade) => {
        utils.enviarInformacoesParaCliente(socket, 'pegarPartida', { 
            id: partidaId, 
            jogadorId: socket.id,
            dificuldade
        })
    }

    entrarEmPartida = (socket, partidaId) => {
        socket.join(partidaId)
    
        this.#enviarInformacoesDaPartidaParaCliente(socket, partidaId, 0)
    }

    iniciarNovaPartida = (socket, dificuldade) => {
        let partidaId = uuidv4()

        partidaId = partidaId.slice(0, -1) + dificuldade;

        socket.join(partidaId)

        this.#enviarInformacoesDaPartidaParaCliente(socket, partidaId, dificuldade)
    }

    partidaPermiteNovoJogador = (socket, partidaId) => {
        let iteratorJogadores = socket.to(partidaId).adapter.rooms.get(partidaId).values()
        let numeroJogadoresOnline = 0

        while (utils.iteratorHasNext(iteratorJogadores)) 
            numeroJogadoresOnline++

        return numeroJogadoresOnline === 1
    }
}