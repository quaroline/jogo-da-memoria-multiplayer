import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quadrinho',
  templateUrl: './quadrinho.component.html',
  styleUrls: ['./quadrinho.component.css']
})
export class QuadrinhoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  @Input()
  public urlImagem: string = '';
}
