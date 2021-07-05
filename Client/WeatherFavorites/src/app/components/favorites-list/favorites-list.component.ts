import { select } from '@angular-redux/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FavoritesService } from 'src/app/services/favorites.service';
import { FavoritesActions } from '../../actions/favorites.actions';
import { City, State } from '../../model/city';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FavoritesListComponent implements OnInit {
  @select(state => state.favorites.favorites) public cities$: Observable<
    any[]
  >;
  boostrapcities = [];
  bootsrapfromredux = [];

  isLoading = false;
  selectedFavoriteCity: City;
  constructor(public actions: FavoritesActions,
    private favoritesService: FavoritesService,private ngRedux: NgRedux<State>) {
  }



  ngOnInit() {
    this.favoritesService.getAllFavoriteCitiesFromServer().subscribe((c:any)=>{
      var initcities:any=[];
      c.forEach(element => {
        initcities.push(
          {
            key:element.cityKey,
            localizedName:element.cityLocalizedName,
            country:{
              localizedName:element.countryLocalizedName
            }
          }
        )
        
      });
      this.actions.initfavorites(initcities);
    });
    this.cities$.subscribe((c)=>{console.log("redux cities", c)});
  }
  onCitySelected(city) {
    this.actions.setCurrentCity(city);
  }
}
