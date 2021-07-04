import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { City, State } from '../model/city';

@Injectable()
export class FavoritesActions {
  static CITY_ADD = 'CITY_ADD';
  static CITY_DELETE = 'CITY_DELETE';
  static SET_CURRENT_CITY = 'SET_CURRENT_CITY';

  constructor(private ngRedux: NgRedux<State>) {}

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
}
