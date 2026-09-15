import { tmdbClient } from '../../config/axios-interceptor';
import {
  popular,
  popularMoviesSchema,
  topTrending,
  trendingMoviesSchema,
  upcoming,
  upcomingMoviesSchema,
} from '../../validation/dashbaord-schema';
import { TMDB_URLS } from './api-urls';

export const getTrendingMovies = async (page = 1): Promise<topTrending> => {
  const response = await tmdbClient.get(TMDB_URLS.trending, {
    params: { page },
  });
  return trendingMoviesSchema.parse(response.data);
};

export const getPopularMovies = async (page = 1): Promise<popular> => {
  const response = await tmdbClient.get(TMDB_URLS.popular, {
    params: { page },
  });
  return popularMoviesSchema.parse(response.data);
};

export const getUpcommingMovies = async (page = 1): Promise<upcoming> => {
  const response = await tmdbClient.get(TMDB_URLS.upComing, {
    params: { page },
  });

  return upcomingMoviesSchema.parse(response.data);
};
