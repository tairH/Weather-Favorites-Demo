import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';

import { of } from 'rxjs';
import { City } from '../model/city';
import { getLocaleDateTimeFormat } from '@angular/common';

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
           // 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=' +
           'https://localhost:44325/api/AccuWeather/autocomplete/'+
           
              term //+
             // '&apikey=mrBsuy5UA6FU0jgep7GtlwxX92PlZRe0'
          )
          .pipe(tap(data => (this.allCities = data)));
  }
  getWheather(cityKey:any){
    console.log("get weather from api");
   return this.http
          .get(
           // 'https://dataservice.accuweather.com/currentconditions/v1/' +
           'https://localhost:44325/api/AccuWeather/weather/'+
            cityKey //+
             // '?apikey=mrBsuy5UA6FU0jgep7GtlwxX92PlZRe0'
          );
    
  }
  addFavoriteCity(city: any) {
    var cityToAdd: City = {
      cityKey: city.key,
      countryLocalizedName:city.country.localizedName,
      cityLocalizedName: city.localizedName,
      updatedDate:new Date()

    };
    return this.http.post('https://localhost:44325/api/Favorites/Add',cityToAdd);
  }
  removeFavoriteCity(code: number) {
    //var cityKey:string = code;
    return this.http.post('https://localhost:44325/api/Favorites/Delete',code);
  }

  getAllFavoriteCitiesFromServer(){
    return this.http.get('https://localhost:44325/api/Favorites/GetFavorites');
  }
}
