import { Jogador } from "./jogador";

export interface Partida {
    id: string;
    jogadores: Jogador[];
    dificuldade: number;
}