export type ReqType =
  | "list"
  | "details"
  | "film-details"
  | "specie-details"
  | "starship-details"
  | "vehicle-details";

export type Person = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: any[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: any[];
  starships: any[];
  url: string;
  vehicles: any[];
};

export type PeopleList = {
  count: number;
  next?: string | undefined;
  previous?: string | undefined;
  results: Person[];
};
