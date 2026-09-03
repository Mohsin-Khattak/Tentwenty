import Config from 'react-native-config';

export const ENV = {
  TMDB_API_KEY: Config.TMDB_API_KEY ?? '',
  TMDB_BASE_URL:
    Config.TMDB_BASE_URL ?? 'https://api.themoviedb.org/3',
};