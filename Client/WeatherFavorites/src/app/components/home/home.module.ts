import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { CitieListComponent } from '../citie-list/citie-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrentCityWeatherComponent } from '../current-city-weather/current-city-weather.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [
    HomeComponent,
    CitieListComponent /*CurrentCityWeatherComponent*/
  ],
  exports: [RouterModule]
})
export class HomeModule {}
