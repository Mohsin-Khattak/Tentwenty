import React, { useCallback } from 'react';
import { Button, FlatList, ListRenderItem, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInfiniteQuery } from '@tanstack/react-query';
import AppHeader from '../../components/atoms/app-header';
import { Loader } from '../../components/atoms/loader';
import MovieCardSkeleton from '../../components/molecules/movie-card-skeleton';
import MoviesCard from '../../components/molecules/movies-card';
import { mvs } from '../../config/metrices';
import { navigate } from '../../navigation/navigation-ref';
import { getUpcomingMovies } from '../../services/api/watch-api-action';
import { Movie } from '../../types/entities-types';
import styles from './styles';

const ITEM_HEIGHT = mvs(180);
const ITEM_MARGIN = mvs(16);
const ITEM_SIZE = ITEM_HEIGHT + ITEM_MARGIN;

const WatchTab: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['upcomingMovies'],

    queryFn: ({ pageParam }) => getUpcomingMovies(pageParam),

    initialPageParam: 1,

    getNextPageParam: lastPage => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });

  const movies = Array.from(
    new Map(
      (data?.pages.flatMap(page => page.results) ?? []).map(movie => [
        movie.id,
        movie,
      ]),
    ).values(),
  );

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item }) => (
      <MoviesCard
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

  const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  const getItemLayout = useCallback(
    (_data: ArrayLike<Movie> | null | undefined, index: number) => ({
      length: ITEM_SIZE,
      offset: ITEM_SIZE * index,
      index,
    }),
    [],
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) {
      return null;
    }

    return (
      <View style={styles.footerLoader}>
        <Loader />
      </View>
    );
  }, [isFetchingNextPage]);

  if (isError) {
    return (
      <View style={styles.container}>
        <AppHeader
          onSearchPress={() => {
            navigate('SearchScreen');
          }}
        />

        <View style={styles.emptyContainer}>
          <Text>Something went wrong.</Text>
          <Button title="Try Again" onPress={() => refetch()} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        onSearchPress={() => {
          navigate('SearchScreen');
        }}
      />

      {isLoading ? (
        <View style={styles.skeletonContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </View>
      ) : movies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No movies found.</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={7}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews
          getItemLayout={getItemLayout}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

export default WatchTab;
