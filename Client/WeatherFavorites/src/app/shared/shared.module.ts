import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentCityWeatherComponent } from '../components/current-city-weather/current-city-weather.component';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule, 
    MatAutocompleteModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,ReactiveFormsModule,
    FlexLayoutModule/**/
  ],
  declarations: [CurrentCityWeatherComponent],
  exports:[CurrentCityWeatherComponent,MatAutocompleteModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,ReactiveFormsModule,FlexLayoutModule]
})
export class SharedModule { }