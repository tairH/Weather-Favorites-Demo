import { select } from '@angular-redux/store';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FavoritesActions } from '../../actions/favorites.actions';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-current-city-weather',
  templateUrl: './current-city-weather.component.html',
  styleUrls: ['./current-city-weather.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class CurrentCityWeatherComponent implements OnInit {
  @Input() selected: boolean = false;
  @select(state => state.favorites.selectedCity) public selectedCity$: Observable<any>;
  @select(state => state.favorites.favorites) public cities$: Observable<any[]>;
  @select(state => state.favorites.selectedCityTemp) public selectedCityTemp$: Observable<any>;

  currentCityTemp$: Observable<any>;
  bootstrap: boolean = true;
  currentCity: any;

  constructor(
    public actions: FavoritesActions,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {

    this.selectedCityTemp$.subscribe((temp) => console.log("currentTemp", temp));
    /**/ this.selectedCity$.subscribe((city) => {
      if (city != null) {
        this.bootstrap = false;
        this.currentCity = city;

        this.cities$.subscribe((list: any[]) => {
          console.log("cities$ subscription");
          this.selected =
            list.filter(item => item && item.key == city.key).length > 0;
        });
      }


    });
  }

  public toggleSelected() {
    this.selected = !this.selected;
    // this.selectedCity$.subscribe(city => {
    if (this.selected && this.currentCity) this.addCity(this.currentCity);
    else if (this.currentCity != null) {
      console.log('try delete', this.currentCity);
      this.deleteCity(this.currentCity.key);
    }
    //});
  }

  addCity(city: any) {
    if (city != null)
     this.favoritesService.addFavoriteCity(city).subscribe( 
        () => {this.actions.add(city)});
  }
  deleteCity(code) {
     this.favoritesService.removeFavoriteCity(code).subscribe(() => {
    this.actions.delete(code);
       });
  }

}
