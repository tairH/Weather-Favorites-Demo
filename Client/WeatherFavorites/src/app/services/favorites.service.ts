import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class FavoritesService {
  constructor(private http: HttpClient) {}

  allCities:any = [];

  searchCity(term: string) {
    return this.allCities.length
      ? of(this.allCities)
      : this.http
          .get(
            'https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=' +
              term +
              '&apikey=mrBsuy5UA6FU0jgep7GtlwxX92PlZRe0'
          )
          .pipe(tap(data => (this.allCities = data)));
  }
  getWheather(cityKey:any){
   return this.http
          .get(
            'https://dataservice.accuweather.com/currentconditions/v1/' +
            cityKey +
              '?apikey=mrBsuy5UA6FU0jgep7GtlwxX92PlZRe0'
          );
    
  }
  addFavoriteCity(city: any) {}
  removeFavoriteCity(code: number) {}
}
