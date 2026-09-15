import { useQuery } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, ScrollView, Text, View } from 'react-native';

import AppHeader from '../../components/atoms/app-header';
import BannerCarousel from '../../components/atoms/banner/BannerCarousel';
import BannerSkeleton from '../../components/molecules/bannner-skelton/BannerSkeleton';
import DashboardMoviesCard from '../../components/molecules/dashboard-movies-card';
import DashboardMovieCardSkeleton from '../../components/molecules/dashboardmovie-card-skeleton/DashboardMovieCardSkeleton';

import { colors } from '../../config/colors';
import { navigate } from '../../navigation/navigation-ref';

import {
  getPopularMovies,
  getTrendingMovies,
  getUpcommingMovies,
} from '../../services/api/dashboard-api-action';

import SemiBold from '../../typography/semi-bold-text';
import { Movie } from '../../validation/movie-schema';
import styles from './styles';

const SKELETON_COUNT = 5;

const DashboardTab = () => {
  // Trending Movies
  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    isError: isTrendingError,
  } = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: () => getTrendingMovies(1),
  });

  // Popular Movies
  const {
    data: popularData,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => getPopularMovies(1),
  });

  // Upcoming Movies
  const {
    data: upcomingData,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
  } = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: () => getUpcommingMovies(1),
  });

  // First 5 trending movies for banner
  const bannerMovies = trendingData?.results.slice(0, 5) ?? [];

  const bannerData = bannerMovies.map(movie => ({
    id: movie.id.toString(),
    title: movie.title,
    backdropPath: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '',
    genre: '',
  }));

  // Movie card renderer
  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item }) => (
      <DashboardMoviesCard
        item={item}
        onPress={() => {
          navigate('MoviesDetailsScreen', {
            movieId: item.id,
          });
        }}
      />
    ),
    [],
  );

  // Skeleton renderer
  const renderSkeletonItem = useCallback(
    () => <DashboardMovieCardSkeleton />,
    [],
  );

  const skeletonData = Array.from({ length: SKELETON_COUNT });

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= Banner ================= */}

        {isTrendingLoading ? (
          <BannerSkeleton />
        ) : isTrendingError ? null : (
          <BannerCarousel
            data={bannerData}
            onPressPlay={item => {
              navigate('MoviesDetailsScreen', {
                movieId: Number(item.id),
              });
            }}
          />
        )}

        <View style={styles.innerContainer}>
          {/* ================= Trending ================= */}

          <SemiBold
            label="Trending This Week"
            fontSize={16}
            color={colors.darkpurple}
          />

          {isTrendingLoading ? (
            <FlatList
              horizontal
              data={skeletonData}
              renderItem={renderSkeletonItem}
              keyExtractor={(_, index) => `trending-skeleton-${index}`}
              showsHorizontalScrollIndicator={false}
              style={styles.trendingList}
            />
          ) : isTrendingError ? (
            <View style={styles.center}>
              <Text>Unable to load trending movies.</Text>
            </View>
          ) : (
            <FlatList
              horizontal
              data={trendingData?.results ?? []}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              style={styles.trendingList}
            />
          )}

          {/* ================= Popular ================= */}

          <SemiBold
            label="Popular Movies"
            fontSize={16}
            color={colors.darkpurple}
            style={{ marginTop: 20 }}
          />

          {isPopularLoading ? (
            <FlatList
              horizontal
              data={skeletonData}
              renderItem={renderSkeletonItem}
              keyExtractor={(_, index) => `popular-skeleton-${index}`}
              showsHorizontalScrollIndicator={false}
              style={styles.trendingList}
            />
          ) : isPopularError ? (
            <View style={styles.center}>
              <Text>Unable to load popular movies.</Text>
            </View>
          ) : (
            <FlatList
              horizontal
              data={popularData?.results ?? []}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              style={styles.trendingList}
            />
          )}

          {/* ================= Upcoming ================= */}

          <SemiBold
            label="Upcoming Movies"
            fontSize={16}
            color={colors.darkpurple}
            style={{ marginTop: 20 }}
          />

          {isUpcomingLoading ? (
            <FlatList
              horizontal
              data={skeletonData}
              renderItem={renderSkeletonItem}
              keyExtractor={(_, index) => `upcoming-skeleton-${index}`}
              showsHorizontalScrollIndicator={false}
              style={styles.trendingList}
            />
          ) : isUpcomingError ? (
            <View style={styles.center}>
              <Text>Unable to load upcoming movies.</Text>
            </View>
          ) : (
            <FlatList
              horizontal
              data={upcomingData?.pages[0]?.results ?? []}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              style={styles.trendingList}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardTab;
