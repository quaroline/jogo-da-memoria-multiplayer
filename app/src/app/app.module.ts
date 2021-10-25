import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppComponent } from './app.component';
import { QuadrinhoComponent } from './quadrinho/quadrinho.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule } from 'ngx-socket-io';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';
import { AppService } from './app.service';
import { ModoAdministradorComponent } from './modo-administrador/modo-administrador.component';
import { ReactiveFormsModule } from '@angular/forms';

export let AppInjector: Injector;

@NgModule({
  declarations: [
    AppComponent,
    QuadrinhoComponent,
    MenuInicialComponent,
    ModoAdministradorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot({
      url: 'http://localhost:3000',
      options: {}
    })
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
