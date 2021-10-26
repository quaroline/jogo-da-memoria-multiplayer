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

  logado: boolean = false;

  cacheNome: string = 'imagens';

  arquivos: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  tentarEfetuarLogin() {
    let usuario = this.credenciais.controls['usuario'].value;

    let senha = this.credenciais.controls['senha'].value;

    let mensagem = 'Erro ao autenticar usuário.';

    const snackbar = AppInjector.get(MatSnackBar);

    if (usuario === "admin" && senha === "admin") {
      mensagem = 'Usuário autenticado com sucesso.';

      this.logado = true;
    }

    snackbar.open(mensagem, 'Fechar', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 5000
    });
  }

  escolherImagens(event: any) {
    this.arquivos = event.target.files;
  }

  efetuarUpload() {
    if (this.arquivos && this.arquivos[0]) {
      var img = document.querySelector('img');

      if (img) {
        img.onload = () => {
          URL.revokeObjectURL(img?.src || '');
        }

        let src = URL.createObjectURL(this.arquivos[0]);

        img.src = src;

        this.gravarEmCache(src);
      }
    }
  }

  gravarEmCache(src: string) {
    let cache = localStorage[this.cacheNome];

    if (!src)
      return;

    if (cache) {
      let cacheEmMemoria = JSON.parse(cache) as string[];

      cacheEmMemoria.push(src);

      localStorage[this.cacheNome] = JSON.stringify(cacheEmMemoria);
    } else {
      localStorage[this.cacheNome] = JSON.stringify([ src ]);
    }
  }
}