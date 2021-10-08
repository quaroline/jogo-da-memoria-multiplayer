import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppComponent } from './app.component';
import { QuadrinhoComponent } from './quadrinho/quadrinho.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule } from 'ngx-socket-io';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';

@NgModule({
  declarations: [
    AppComponent,
    QuadrinhoComponent,
    MenuInicialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    SocketIoModule.forRoot({
      url: 'http://localhost:3000',
      options: {}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
