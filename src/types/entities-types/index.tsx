export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  original_title: string;
  overview: string;
  release_date: string;
};

export type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;

  genres: {
    id: number;
    name: string;
  }[];

  homepage: string | null;
  id: number;
  imdb_id: string | null;

  origin_country: string[];
  original_language: string;
  original_title: string;

  overview: string;
  popularity: number;

  poster_path: string | null;

  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  release_date: string;
  revenue: number;
  runtime: number;

  softcore: boolean;

  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];

  status: string;
  tagline: string | null;
  title: string;

  video: boolean;
  vote_average: number;
  vote_count: number;
};
export type Genre = {
  id: number;
  name: string;
  image: string;
};
