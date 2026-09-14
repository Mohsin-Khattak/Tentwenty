import { z } from 'zod';
import { movieSchema } from './movie-schema';
export const trendingMoviesSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const popularMoviesSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const nowPlayingMoviesSchema = z.object({
  dates: z.object({
    maximum: z.string(),
    minimum: z.string(),
  }),
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const topRatedMoviesSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const upcomingMoviesSchema = z.object({
  dates: z.object({
    maximum: z.string(),
    minimum: z.string(),
  }),
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});
export type topTrending = z.infer<typeof trendingMoviesSchema>;
export type topRated = z.infer<typeof topRatedMoviesSchema>;
export type popular = z.infer<typeof popularMoviesSchema>;
export type nowPlaying = z.infer<typeof nowPlayingMoviesSchema>;
export type upcoming = z.infer<typeof upcomingMoviesSchema>;