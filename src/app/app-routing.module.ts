import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';

const app_routes: Routes = [
  { path: 'mapa',component: MapaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'mapa' }
];

export  const APP_ROUTING = RouterModule.forRoot( app_routes );
