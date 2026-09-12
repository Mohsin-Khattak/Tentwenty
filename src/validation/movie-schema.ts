import { z } from 'zod';

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  original_title: z.string(),
  overview: z.string(),
  release_date: z.string(),
});

export const tmdbResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const movieDetailsSchema = z.object({
  adult: z.boolean(),

  backdrop_path: z.string().nullable(),

  belongs_to_collection: z.unknown().nullable(),

  budget: z.number(),

  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),

  homepage: z.string().nullable(),

  id: z.number(),

  imdb_id: z.string().nullable(),

  origin_country: z.array(z.string()),

  original_language: z.string(),

  original_title: z.string(),

  overview: z.string(),

  popularity: z.number(),

  poster_path: z.string().nullable(),

  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    }),
  ),

  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    }),
  ),

  release_date: z.string(),

  revenue: z.number(),

  runtime: z.number(),

  softcore: z.boolean(),

  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    }),
  ),

  status: z.string(),

  tagline: z.string().nullable(),

  title: z.string(),

  video: z.boolean(),

  vote_average: z.number(),

  vote_count: z.number(),
});

export const genreApiSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const genreListResponseSchema = z.object({
  genres: z.array(genreApiSchema),
});

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().nullable(),
});

export const movieVideoSchema = z.object({
  iso_639_1: z.string().nullable(),
  iso_3166_1: z.string().nullable(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
  id: z.string(),
});

export const movieVideosResponseSchema = z.object({
  id: z.number(),
  results: z.array(movieVideoSchema),
});


export type Movie = z.infer<typeof movieSchema>;
export type TMDBResponse = z.infer<typeof tmdbResponseSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;
export type Genre = z.infer<typeof genreSchema>;
export type MovieVideo = z.infer<typeof movieVideoSchema>;
export type MovieVideosResponse = z.infer<
  typeof movieVideosResponseSchema
>;