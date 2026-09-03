import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, Platform, View } from 'react-native';
import styles from './styles';
import AppHeader from '../../components/atoms/app-header';
import { Loader } from '../../components/atoms/loader';
import MoviesCard from '../../components/molecules/movies-card';
import { getUpcomingMovies } from '../../services/api/watch-api-action';
import { mvs } from '../../config/metrices';
import { Movie, TMDBResponse } from '../../types/entities-types';
import MovieCardSkeleton from '../../components/molecules/movie-card-skeleton';
import { navigate } from '../../navigation/navigation-ref';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../config/colors';

const ITEM_HEIGHT = mvs(180);
const ITEM_MARGIN = mvs(16);
const ITEM_SIZE = ITEM_HEIGHT + ITEM_MARGIN;

const WatchTab: React.FC = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    loadMovies(1, true);
  }, []);

  const loadMovies = async (page: number, initialLoad: boolean = false) => {
    try {
      if (initialLoad) {
        setLoading(true);
      } else {
        setPageLoading(true);
      }

      const response: TMDBResponse = await getUpcomingMovies(page);

      console.log('CURRENT PAGE:', response.page);
      console.log('LAST PAGE:', response.total_pages);
      console.log('RESULTS:', response.results.length);

      if (page === 1) {
        const uniqueMovies = response.results.filter(
          (movie, index, self) =>
            index === self.findIndex(item => item.id === movie.id),
        );

        setData(uniqueMovies);
      } else {
        setData(prevData => {
          const existingIds = new Set(prevData.map(movie => movie.id));

          const newMovies = response.results.filter(
            movie => !existingIds.has(movie.id),
          );

          console.log('NEW MOVIES:', newMovies.length);

          return [...prevData, ...newMovies];
        });
      }

      setCurrentPage(response.page);
      setLastPage(response.total_pages);
    } catch (error) {
      console.log('TMDB ERROR:', error);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (loading || pageLoading || currentPage >= lastPage) {
      return;
    }

    loadMovies(currentPage + 1);
  }, [loading, pageLoading, currentPage, lastPage]);

  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item }) => (
      <MoviesCard
        item={item}
        onPress={() => {
          console.log('MOVIE ID:', item.id);
          navigate('MoviesDetailsScreen', { movieId: item.id });
        }}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  /**
   * Since every movie card has a fixed height
   * and fixed bottom margin, FlatList can calculate
   * item positions without measuring every item.
   */
  const getItemLayout = useCallback(
    (_data: ArrayLike<Movie> | null | undefined, index: number) => ({
      length: ITEM_SIZE,
      offset: ITEM_SIZE * index,
      index,
    }),
    [],
  );

  const renderFooter = useCallback(() => {
    if (!pageLoading) {
      return null;
    }

    return (
      <View style={styles.footerLoader}>
        <Loader />
      </View>
    );
  }, [pageLoading]);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? insets?.top : 20,
          backgroundColor: colors.white,
        }}
      />
      <AppHeader
        title="Watch"
        onSearchPress={() => {
          navigate('SearchScreen');
        }}
      />

      {loading ? (
        <View style={styles.skeletonContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          // Performance
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={7}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
          // Fixed item size optimization
          getItemLayout={getItemLayout}
          // Pagination
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          // UI
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          // Footer loader
          ListFooterComponent={renderFooter}
          // Avoid unnecessary layout animation
          disableVirtualization={false}
        />
      )}
    </View>
  );
};

export default WatchTab;
