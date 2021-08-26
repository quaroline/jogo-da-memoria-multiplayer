import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuadrinhoComponent } from './quadrinho/quadrinho.component';

@NgModule({
  declarations: [
    AppComponent,
    QuadrinhoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
