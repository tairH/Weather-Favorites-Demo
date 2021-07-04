import { FavoritesActions } from '../actions/favorites.actions';
import { City, State } from '../model/city';

const INITIAL_STATE: State = {
  selectedCity: null,
  favorites: [
   // { code: 1, desc: 'Fabio' },
   /// { code: 2, desc: 'Lorenzo' },
   // { code: 3, desc: 'Silvia' },
   // { code: 4, desc: 'Lisa' }
  ]
};
export const selectCity = (state: State) => state.selectedCity;
export const selectAllFavorites = (state: State) => state.favorites;

export function FavoritesReducer(
  state: State|undefined = INITIAL_STATE,
  action: any
): any {
  switch (action.type) {
    case FavoritesActions.CITY_ADD: {
      if(!state.favorites.includes(action.payload))
      return { ...state, favorites: [...state.favorites, action.payload] };
      else return state;

    }

    case FavoritesActions.CITY_DELETE: {
      return {
        ...state,
        favorites: state.favorites.filter(city => city.Key !== action.payload)
      };
    }
    case FavoritesActions.SET_CURRENT_CITY:
      return { ...state, selectedCity: action.payload };
    default:
      return state;
  }
}
