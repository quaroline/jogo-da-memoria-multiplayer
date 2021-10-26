import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Matcha © Card Game';

  dificuldadeSelecionada: number;

  iniciarJogo: boolean = false;

  clickMenuAdministrativo: boolean = false;

  receberDificuldade(event: any) {
    this.dificuldadeSelecionada = event;

    this.iniciarJogo = true;
  }

  abrirMenuAdministrativo() {
    this.clickMenuAdministrativo = true;
  }

  fecharMenuAdministrativo() {
    this.clickMenuAdministrativo = false;
  }
}