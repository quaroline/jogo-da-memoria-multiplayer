import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoPecinha } from '../models/tipo-pecinha';

@Component({
  selector: 'app-quadrinho',
  templateUrl: './quadrinho.component.html',
  styleUrls: ['./quadrinho.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms')
      ])
    ])
  ]
})
export class QuadrinhoComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  @Input() 
  public pecinha: TipoPecinha;

  @Output() 
  public quadroClicado = new EventEmitter();
}
