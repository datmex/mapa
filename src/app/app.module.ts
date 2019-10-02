import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InegiService } from './service/inegi.service'
import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [InegiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
