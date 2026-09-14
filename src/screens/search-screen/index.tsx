import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackBlackIcon } from '../../assets/icons';
import { Loader } from '../../components/atoms/loader';
import SearchHeader from '../../components/atoms/search-header';
import CategoriesCard from '../../components/molecules/categories-card';
import SearchCard from '../../components/molecules/search-card';
import { colors } from '../../config/colors';
import { navigate } from '../../navigation/navigation-ref';
import {
  getGenresWithImages,
  searchMovies,
} from '../../services/api/watch-api-action';
import { Genre, Movie } from '../../validation/movie-schema';
import styles from './styles';

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  /*
   * Search debounce
   *
   * Debouncing input is UI state, so useEffect is fine here.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /*
   * Genres
   */
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ['genresWithImages'],
    queryFn: getGenresWithImages,
  });

  /*
   * Search Movies
   */
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError: isSearchError,
    refetch: refetchSearch,
  } = useInfiniteQuery({
    queryKey: ['movieSearch', debouncedQuery],

    queryFn: ({ pageParam }) => searchMovies(debouncedQuery, pageParam),

    initialPageParam: 1,

    enabled: debouncedQuery.length > 0,

    getNextPageParam: lastPage => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });

  /*
   * Combine all search pages into one array
   */
  const searchResults = Array.from(
    new Map(
      (searchData?.pages.flatMap(page => page.results) ?? []).map(movie => [
        movie.id,
        movie,
      ]),
    ).values(),
  );

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    setIsSubmitted(false);
  }, []);

  const handleBackFromResults = useCallback(() => {
    setIsSubmitted(false);
  }, []);

  const handleSubmitEditing = useCallback(() => {
    if (searchQuery.trim().length > 0) {
      setIsSubmitted(true);
    }
  }, [searchQuery]);

  const handleLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderCategoryItem = useCallback(
    ({ item }: { item: Genre }) => (
      <CategoriesCard item={item} onPress={() => {}} />
    ),
    [],
  );

  const renderSearchItem = useCallback(
    ({ item }: { item: Movie }) => (
      <SearchCard
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

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) {
      return null;
    }

    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }, [isFetchingNextPage]);

  const isSearching = searchQuery.trim().length > 0;

  const statusBarSpacerStyle = [
    localStyles.statusBarSpacer,
    {
      paddingTop: insets.top ? insets.top + 5 : 25,
    },
  ];

  const searchListContentStyle = [
    styles.listPadding,
    {
      paddingBottom: insets.bottom + 70,
    },
  ];

  const isLoading = isCategoriesLoading || isSearchLoading;

  return (
    <View style={styles.container}>
      {isSubmitted ? (
        <View style={styles.resultsHeaderContainer}>
          <TouchableOpacity
            onPress={handleBackFromResults}
            style={styles.backButton}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
          >
            <BackBlackIcon />
          </TouchableOpacity>

          <Text style={styles.resultsCountText}>
            {searchResults.length} Results Found
          </Text>
        </View>
      ) : (
        <SearchHeader
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);

            if (isSubmitted) {
              setIsSubmitted(false);
            }
          }}
          onClear={handleClear}
          onSubmitEditing={handleSubmitEditing}
        />
      )}

      {isLoading ? (
        <Loader />
      ) : isSearchError && isSearching ? (
        <View style={styles.loaderContainer}>
          <Text>Something went wrong.</Text>

          <TouchableOpacity onPress={() => refetchSearch()}>
            <Text>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : isCategoriesError && !isSearching ? (
        <View style={styles.loaderContainer}>
          <Text>Unable to load categories.</Text>

          <TouchableOpacity onPress={() => refetchCategories()}>
            <Text>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : isSubmitted || isSearching ? (
        <FlatList
          key="search-list"
          data={searchResults}
          renderItem={renderSearchItem}
          keyExtractor={(item: Movie) => item.id.toString()}
          ListHeaderComponent={
            !isSubmitted ? (
              <Text style={styles.topResultsHeader}>Top Results</Text>
            ) : undefined
          }
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={searchListContentStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.loaderContainer}>
              <Text>No movies found.</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          key="category-grid"
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item: Genre) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={searchListContentStyle}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  statusBarSpacer: {
    backgroundColor: colors.white,
  },
});

export default SearchScreen;
