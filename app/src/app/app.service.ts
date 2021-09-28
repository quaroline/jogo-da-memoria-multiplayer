import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private socket: Socket) { }

  iniciarNovoJogo() {
    this.socket.emit('novo-jogo');
  }
}