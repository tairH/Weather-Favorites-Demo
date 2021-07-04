import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, IAppState } from './store/index';
import { FavoritesActions } from './actions/favorites.actions';
import { AppComponent } from './app.component';
import { CitieListComponent } from './components/citie-list/citie-list.component';
import { FavoritesService } from './services/favorites.service';
import { CurrentCityWeatherComponent } from './components/current-city-weather/current-city-weather.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    NgReduxModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    /*FavoritesListComponent,
    CitieListComponent,  CurrentCityWeatherComponent*/
  ],
  providers: [FavoritesActions, FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension
  ) {
    this.ngRedux.configureStore(
      rootReducer,
      {} as IAppState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );
  }
}
