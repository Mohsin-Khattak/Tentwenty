import { tmdbClient } from '../../config/axios-interceptor';
import { TMDB_URLS } from './api-urls';

export const getUpcomingMovies = async (page = 1) => {
  const response = await tmdbClient.get(TMDB_URLS.upcoming, {
    params: {
      page,
    },
  });

  return response.data;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await tmdbClient.get(`${TMDB_URLS.movieDetails}/${movieId}`);

  return response.data;
};

export const getMovieImages = async (movieId: number) => {
  const response = await tmdbClient.get(
    `${TMDB_URLS.movieImages}/${movieId}/images`,
  );

  return response.data;
};

export const getMovieVideos = async (movieId: number) => {
  const response = await tmdbClient.get(
    `${TMDB_URLS.movieVideos}/${movieId}/videos`,
  );

  return response.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await tmdbClient.get(TMDB_URLS.search, {
    params: {
      query,
      page,
    },
  });

  return response.data;
};
