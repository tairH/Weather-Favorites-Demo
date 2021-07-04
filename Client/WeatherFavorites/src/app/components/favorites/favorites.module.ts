import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouterModule, Routes } from '@angular/router';
import { CurrentCityWeatherComponent } from '../current-city-weather/current-city-weather.component';
import { FavoritesListComponent } from '../favorites-list/favorites-list.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: FavoritesComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),SharedModule],
  declarations: [FavoritesComponent,/*CurrentCityWeatherComponent,*/FavoritesListComponent]
})
export class FavoritesModule {}
