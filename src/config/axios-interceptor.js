import axios from 'axios';
import Config from 'react-native-config';

export const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '254664df1b6a898c8321c2bef99c85bd',
    language: 'en-US',
  },
});
