import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Jogador } from '../models/jogador';
import { Partida } from '../models/partida';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class MenuInicialComponent implements OnInit {

  constructor(private service: AppService) {
    this.pegarJogador();
  }

  jogador: Jogador;
  partida: Partida;

  partidaExistenteId: string = '';
  dificuldadeSelecionada: string = '2';

  guidValido: boolean = false;
  novaPartida: boolean = false;
  
  dificuldades: number[] = [2, 4, 6];

  ngOnInit(): void {}

  public onSelect(event: any) {
    this.dificuldadeSelecionada = event.target.value;
  }

  public onFocusOut(event: any) {
    this.guidValido = false;
    
    if (!event.target.value)
      return;

    let codigo = event.target.value.trim();

    if (Utils.validarGuid(codigo)) {
      this.partidaExistenteId = codigo;

      this.guidValido = true;
    }
  }

  public pegarJogador() {
    this.service.pegarJogador().subscribe((jogador) => {
      this.jogador = jogador;
    })
  }

  public entrarEmPartidaExistente() {
    this.service.entrarEmPartidaExistente(this.partidaExistenteId).subscribe((partida) => {
      this.partida = partida;
    })
  }

  public iniciarNovoJogo(): void {
    this.service.iniciarNovoJogo().subscribe((partida) => {
      this.partida = partida;

      this.novaPartida = true;
    })
  }
}
