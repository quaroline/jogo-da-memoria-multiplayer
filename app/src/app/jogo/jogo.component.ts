import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoPecinha } from '../models/tipo-pecinha';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnChanges {
  title = 'Matcha © Card Game';

  pecinhas: TipoPecinha[] = [];
  pecinhasViradas: TipoPecinha[] = [];

  @Input() dificuldadeSelecionada = 0;

  imagens: string[] = [
    'https://i.imgur.com/iX7600V.jpeg',
    'https://i.imgur.com/hgxd45J.jpeg',
    'https://i.imgur.com/YZ0owyf.png',
    'https://i.imgur.com/vtNZl0L.jpeg',
    'https://i.imgur.com/FCm8mdy.jpeg',
    'https://i.imgur.com/9hz5itz.jpg'
  ];

  pecinhasCombinadas = 0;
  partidaId: string = '';

  constructor(
    private snackBar: MatSnackBar) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.dificuldadeSelecionada = parseInt(changes['dificuldadeSelecionada'].currentValue);

    let cache = JSON.parse(localStorage['imagens'] || null) as string[];

      if (cache) {
        cache.forEach((imagem) => {
          this.imagens.push(imagem);
        })
      }

      this.configurarPecinhas();
  }

  configurarPecinhas(): void {
    let imagens = (this.imagens as any[])
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);

    imagens.splice(this.dificuldadeSelecionada);

    this.pecinhas = [];

    // adicionando cada pecinha à lista
    imagens.forEach((imagem) => {
      const pecinha: TipoPecinha = {
        id: imagem,
        state: 'default'
      };

      this.pecinhas.push({ ...pecinha });
      this.pecinhas.push({ ...pecinha });
    });

    // embaralhando as pecinhas
    this.pecinhas = (this.pecinhas as any[])
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  selecionarPecinha(index: number): void {
    const pecinha = this.pecinhas[index];

    if (pecinha.state === 'default' && this.pecinhasViradas.length < 2) 
    {
      pecinha.state = 'flipped';
      this.pecinhasViradas.push(pecinha);

      if (this.pecinhasViradas.length > 1)
        this.verificarPecinhas();

    } else if (pecinha.state === 'flipped') {
      pecinha.state = 'default';

      this.pecinhasViradas.pop();
    }
  }

  verificarPecinhas(): void {
    setTimeout(() => {
      const pecinha1 = this.pecinhasViradas[0];
      const pecinha2 = this.pecinhasViradas[1];

      const proximoEstadoPecinha = pecinha1.id === pecinha2.id ? 'matched' : 'default';

      pecinha1.state = pecinha2.state = proximoEstadoPecinha;

      this.pecinhasViradas = [];

      if (proximoEstadoPecinha === 'matched') {
        this.pecinhasCombinadas++;

        if (this.pecinhasCombinadas === this.imagens.length)
        {
          this.snackBar.open('Partida finalizada! :D', 'Fechar', {
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
            duration: 2000
          }).afterDismissed().subscribe(() => {
            this.pecinhasCombinadas = 0;

            this.configurarPecinhas();
          });
        }
      }
    }, 1000);
  }
}