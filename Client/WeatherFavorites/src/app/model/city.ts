export interface City {
  cityKey?: string;
  cityLocalizedName?: string;
  countryLocalizedName:string;
  updatedDate:Date;
}

export interface State{
  selectedCity?:any;
  selectedCityTemp?:any;
  favorites:any[];
}
