import { Component, OnInit } from '@angular/core';
import { StringUtils } from '../utils/string-utils';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.css']
})
export class MenuInicialComponent implements OnInit {

  constructor() { }

  nomeDeUsuario: string = '';
  
  dificuldades: number[] = [2, 4, 6];

  ngOnInit(): void {
    this.nomeDeUsuario = StringUtils.gerarNomeDeUsuario();
  }
}
