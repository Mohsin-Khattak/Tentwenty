import { tmdbClient } from '../../config/axios-interceptor';
import {
  Genre,
  genreListResponseSchema,
  MovieDetails,
  movieDetailsSchema,
  MovieVideosResponse,
  movieVideosResponseSchema,
  TMDBResponse,
  tmdbResponseSchema,
} from '../../validation/movie-schema';
import { TMDB_URLS } from './api-urls';

export const getUpcomingMovies = async (page = 1): Promise<TMDBResponse> => {
  const response = await tmdbClient.get(TMDB_URLS.upcoming, {
    params: { page },
  });

  return tmdbResponseSchema.parse(response.data);
};

export const getMovieDetails = async (
  movieId: number,
): Promise<MovieDetails> => {
  const response = await tmdbClient.get(`${TMDB_URLS.movieDetails}/${movieId}`);

  return movieDetailsSchema.parse(response.data);
};

export const getMovieImages = async (movieId: number) => {
  const response = await tmdbClient.get(
    `${TMDB_URLS.movieImages}/${movieId}/images`,
  );

  return response.data;
};

export const getMovieVideos = async (
  movieId: number,
): Promise<MovieVideosResponse> => {
  const response = await tmdbClient.get(
    `${TMDB_URLS.movieVideos}/${movieId}/videos`,
  );

  return movieVideosResponseSchema.parse(response.data);
};

export const searchMovies = async (
  query: string,
  page = 1,
): Promise<TMDBResponse> => {
  const response = await tmdbClient.get(TMDB_URLS.search, {
    params: {
      query,
      page,
    },
  });

  return tmdbResponseSchema.parse(response.data);
};
// 1. All Genres Fetch karne ke liye

export const getGenresList = async () => {
  const response = await tmdbClient.get(TMDB_URLS.genres);

  return genreListResponseSchema.parse(response.data);
};

// 2. Genre Grid ke liye Titles aur unki Image Backdrops fetch karne ka function

// Har genre ki top 1 movie se image backdrop le kar array ready karega
export const getGenresWithImages = async (): Promise<Genre[]> => {
  const genresData = await getGenresList();
  const genresList = genresData.genres;

  const genresWithImages = await Promise.all(
    genresList.map(async genre => {
      try {
        const response = await tmdbClient.get(TMDB_URLS.discover, {
          params: {
            with_genres: genre.id,
            sort_by: 'popularity.desc',
            page: 1,
          },
        });

        const topMovie = response.data?.results?.[0];

        const imagePath = topMovie?.backdrop_path || topMovie?.poster_path;

        return {
          id: genre.id,
          name: genre.name,
          image: imagePath
            ? `https://image.tmdb.org/t/p/w500${imagePath}`
            : null,
        };
      } catch {
        return {
          id: genre.id,
          name: genre.name,
          image: null,
        };
      }
    }),
  );

  return genresWithImages;
};
