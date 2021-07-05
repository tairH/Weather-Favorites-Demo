import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { City, State } from '../model/city';

@Injectable()
export class FavoritesActions {
  static CITY_ADD = 'CITY_ADD';
  static CITY_DELETE = 'CITY_DELETE';
  static SET_CURRENT_CITY = 'SET_CURRENT_CITY';  
  static SET_CURRENT_TEMP = 'SET_CURRENT_TEMP';
  static INIT_FAVORITES = "INIT_FAVORITES";

  constructor(private ngRedux: NgRedux<State>) {}

  isIniitiated:boolean=false;

  add(city: any): void {
    //console.log(name)
    this.ngRedux.dispatch({
      type: FavoritesActions.CITY_ADD,
      payload: city
    });
  }

  delete(code:any): void {
    this.ngRedux.dispatch({
      type: FavoritesActions.CITY_DELETE,
      payload: code
    });
  }

  setCurrentCity(city: any): void {
    this.ngRedux.dispatch({
      type: FavoritesActions.SET_CURRENT_CITY,
      payload: city
    });
  }

  setCurrentTemp(temp: any): void {
    this.ngRedux.dispatch({
      type: FavoritesActions.SET_CURRENT_TEMP,
      payload: temp
    });
  }
  initfavorites(favorites:any){
    if (!this.isIniitiated)
      this.ngRedux.dispatch({
        type: FavoritesActions.INIT_FAVORITES,
        payload: favorites
      });
    this.isIniitiated = true;
  }
}
