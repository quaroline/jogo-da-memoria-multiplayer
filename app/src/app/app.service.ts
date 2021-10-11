import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AppInjector } from './app.module';
import { Jogador } from './models/jogador';
import { Partida } from './models/partida';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private socket: Socket) { }

  private observer: any;

  pegarJogador(): Observable<Jogador> {
    this.socket.on('pegarJogador', (jogador: Jogador) => {
      this.observer.next(jogador);
    });

    return this.getObservable();
  }

  iniciarNovoJogo(): Observable<Partida> {
    this.socket.emit('novo-jogo');

    this.socket.on('pegarPartida', (partida: Partida) => {
      this.observer.next(partida);
    });

    return this.getObservable();
  }

  entrarEmPartidaExistente(partidaId: string): Observable<Partida> {
    this.socket.emit('entrar-em-partida-existente', partidaId, this.callback);

    this.socket.on('pegarPartida', (partida: Partida) => {
      this.observer.next(partida);
    });

    return this.getObservable();
  }

  private getObservable(): Observable<any> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }

  private callback(mensagem: string, codigoRetorno: number) {
    const snackbar = AppInjector.get(MatSnackBar);

    snackbar.open(mensagem, 'Fechar', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 2000,
      panelClass: ['snackbar', 'snackbar-' + (codigoRetorno == 200 ? 'sucesso' : 'erro')]
    });
  }
}