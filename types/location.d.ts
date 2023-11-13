export interface TLocations {
  data: Location[];
}

export interface Location {
  id?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  location?: string;
  image?: string;
}
