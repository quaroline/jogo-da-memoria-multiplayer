import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppInjector } from '../app.module';

@Component({
  selector: 'app-modo-administrador',
  templateUrl: './modo-administrador.component.html',
  styleUrls: ['./modo-administrador.component.css']
})
export class ModoAdministradorComponent implements OnInit {

  credenciais = new FormGroup({
    usuario: new FormControl(),
    senha: new FormControl('')
  });

  constructor() {}

  ngOnInit(): void {}

  tentarEfetuarLogin() {
    let usuario = this.credenciais.controls['usuario'].value;

    let senha = this.credenciais.controls['senha'].value;

    let mensagem = 'Erro ao autenticar usuário.';

    const snackbar = AppInjector.get(MatSnackBar);

    if (usuario === "admin" && senha === "admin") {
      mensagem = 'Usuário autenticado com sucesso.'
    }

    snackbar.open(mensagem, 'Fechar', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 5000
    });
  }

}
