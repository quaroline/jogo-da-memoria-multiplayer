import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  root = 'http://localhost:3000/api';

  iniciarNovoJogo() {
    return this.http.get(this.root + '/novo-jogo');
  }

}