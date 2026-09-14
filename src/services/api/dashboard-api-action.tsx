import { tmdbClient } from '../../config/axios-interceptor';
import {
  topTrending,
  trendingMoviesSchema,
} from '../../validation/dashbaord-schema';
import { TMDB_URLS } from './api-urls';

export const getTrendingMovies = async (page = 1): Promise<topTrending> => {
  const response = await tmdbClient.get(TMDB_URLS.trending, {
    params: { page },
  });
  return trendingMoviesSchema.parse(response.data);
};
