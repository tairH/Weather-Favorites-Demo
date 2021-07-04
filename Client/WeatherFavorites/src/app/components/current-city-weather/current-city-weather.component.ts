import { select } from '@angular-redux/store';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  @select(state => state.favorites.selectedCity)
  public selectedCity$: Observable<any>;
  @select(state => state.favorites.favorites) public cities$: Observable<any[]>;

  currentCityTemp$: Observable<any>;

  constructor(
    public actions: FavoritesActions,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    /**/ this.selectedCity$.subscribe((city) => {
      if (city != null) {
        this.cities$.subscribe((list: any[]) => {
          this.selected =
            list.filter(item => item && item.Key == city.Key).length > 0;
        });
      }
      this.currentCityTemp$ = this.favoritesService.getWheather(city.Key).pipe(switchMap(data => {
        console.log('wheeather data:', data);
        return data[0].Temperature.Metric.value;
       
      }));
    
    });
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedCity$.subscribe(city => {
      if (this.selected) this.addCity(city);
      else if(city!=null){
        console.log('try delete', city);
        this.deleteCity(city.Key);
      }
    });
  }

  addCity(city: any) {
    // this.favoritesService.addFavoriteCity().pipe(
    //   finalize(() => {
    if (city != null) this.actions.add(city);
    // }));
    //labelInput.value = '';
  }
  deleteCity(code) {
    // this.favoritesService.removeFavoriteCity().pipe(
    //  finalize(() => {
    this.actions.delete(code);
    //   }));
  }
}
