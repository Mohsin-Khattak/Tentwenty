import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { getTrendingMovies } from '../../services/api/dashboard-api-action';
import AppHeader from '../../components/atoms/app-header';

const DashboardTab = () => {
  const getTrendingMovie = async () => {
    try {
      const res = await getTrendingMovies();
      console.log('json res', JSON.stringify(res));
    } catch (error) {}
  };
  useEffect(() => {
    getTrendingMovie();
  }, []);
  return (
    <View>
      <AppHeader />
    </View>
  );
};
export default DashboardTab;
