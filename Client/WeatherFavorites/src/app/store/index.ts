import { combineReducers } from 'redux';
import { FavoritesReducer } from './favorites.reducer';
import { City, State } from '../model/city';

export class IAppState {
  favorites: State;
};

export const rootReducer = combineReducers<IAppState>({
  favorites: FavoritesReducer
});


