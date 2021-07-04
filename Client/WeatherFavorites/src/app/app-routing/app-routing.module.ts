import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CurrentCityWeatherComponent } from '../components/current-city-weather/current-city-weather.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule) },
  { path: 'favorites', loadChildren: () => import('../components/favorites/favorites.module').then(m => m.FavoritesModule) }
]

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forRoot(routes)
  ],
  //declarations:[CurrentCityWeatherComponent],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }