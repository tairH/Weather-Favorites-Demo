import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { City, State } from './model/city';
import { FavoritesActions } from './actions/favorites.actions';
import { FavoritesService } from './services/favorites.service';
import { finalize } from 'rxjs-compat/operators/finalize';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  opened: boolean = false;
  
  constructor(
    public actions: FavoritesActions,
    private favoritesService: FavoritesService
  ) {   }

  clickHandler() {
    this.sidenav.close();
  }
  addCity(labelInput: HTMLInputElement) {
    // this.favoritesService.addFavoriteCity().pipe(
    //   finalize(() => {
    this.actions.add({ code: 1, desc: labelInput.value });
    // }));
    labelInput.value = '';
  }
  deleteCity(code:any) {
    // this.favoritesService.removeFavoriteCity().pipe(
    //  finalize(() => {
    this.actions.delete(code);
    //   }));
  }
}
