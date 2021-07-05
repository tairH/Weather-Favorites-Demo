import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { FavoritesService } from '../../services/favorites.service';
import { FavoritesActions } from '../../actions/favorites.actions';

@Component({
  selector: 'app-citie-list',
  templateUrl: './citie-list.component.html',
  styleUrls: ['./citie-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CitieListComponent implements OnInit {
  searchCitiesCtrl = new FormControl();
  filteredCities: any;
  isLoading = false;
  errorMsg: string= '';

  constructor(
    private http: HttpClient,
    private favoritesService: FavoritesService,
    public actions: FavoritesActions
  ) {}

  ngOnInit() {
    this.searchCitiesCtrl.valueChanges
      .pipe(
        debounceTime(400),
        tap(() => {
          this.errorMsg = '';
          this.filteredCities = [];
          this.isLoading = true;
        }),
        switchMap(value =>
          this.favoritesService.searchCity(value).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      )
      .subscribe(data => {
        console.log(data);
        if (data == undefined) {
          this.errorMsg = data['Error'];
          this.filteredCities = [];
        } else {
          this.errorMsg = '';
          this.filteredCities = data;
        }

        console.log(this.filteredCities);
      });
  } /*
    filter(name: string): any[] {
      return this.filteredCities.filter(option =>
        option.localizedName.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
  
    displayFn(city: any): string {
      return city ? city.localizedName : '';
    }*/
  onCitySelected(city:any) {
    
    
    this.favoritesService.getWheather(city.key).subscribe(data => {
      // console.log('wheather data:', data);
       console.log('currentCityTemp',data[0].temperature.metric.value );
       //this.actions.setCurrentTemp(data[0].temperature.metric.value);  
       this.actions.setCurrentCity({...city, temp:data[0].temperature.metric.value});    
     });
  }
}
