export type ReqType = "list" | "details" | "other";

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

export type PaginatorDirections = "backwards" | "forwards";

export type Film = {
  characters: any[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: any[];
  producer: string;
  release_date: string;
  species: any[];
  starships: any[];
  title: string;
  url: string;
  vehicles: any[];
};
