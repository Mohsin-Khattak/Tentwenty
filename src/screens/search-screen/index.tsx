import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { Genre, Movie } from '../../types/entities-types';
import styles from './styles';

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  // Track if search submit/enter key was pressed
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getGenresWithImages();
      setCategories(data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Debouncing Effect (500ms for smooth UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Initial Search API Call Effect
  useEffect(() => {
    const handleSearchAPI = async () => {
      if (debouncedQuery.trim() === '') {
        setSearchResults([]);
        setIsSubmitted(false);
        setPage(1);
        setTotalPages(1);
        return;
      }

      try {
        setLoading(true);
        setPage(1); // Reset to first page on new query
        const response = await searchMovies(debouncedQuery, 1);
        console.log('check search response==>', JSON.stringify(response));
        setSearchResults(response?.results || []);
        setTotalPages(response?.total_pages || 1);
      } catch (error) {
        console.log('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    handleSearchAPI();
  }, [debouncedQuery]);

  // Load More Pages Function for Pagination
  const fetchMoreResults = async () => {
    if (isFetchingMore || page >= totalPages || debouncedQuery.trim() === '') {
      return;
    }

    try {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      const response = await searchMovies(debouncedQuery, nextPage);

      if (response?.results?.length) {
        setSearchResults(prev => [...prev, ...response.results]);
        setPage(nextPage);
      }
    } catch (error) {
      console.log('Error fetching more movies:', error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setSearchResults([]);
    setIsSubmitted(false);
    setPage(1);
    setTotalPages(1);
  };

  const handleBackFromResults = () => {
    setIsSubmitted(false);
  };

  const handleSubmitEditing = () => {
    if (searchQuery.trim().length > 0) {
      setIsSubmitted(true);
    }
  };

  const renderCategoryItem = useCallback(
    ({ item }: { item: Genre }) => (
      <CategoriesCard
        item={item}
        onPress={() => {
          navigate('MoviesDetailsScreen', { movieId: item.id });
        }}
      />
    ),
    [],
  );

  const renderSearchItem = useCallback(
    ({ item }: { item: Movie }) => (
      <SearchCard
        item={item}
        onPress={() => {
          navigate('MoviesDetailsScreen', { movieId: item.id });
        }}
      />
    ),
    [],
  );

  // Bottom Pagination Loader Function
  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.statsbar || '#000000'} />
      </View>
    );
  };

  const isSearching = searchQuery.trim().length > 0;

  // Combining static and dynamic style using StyleSheet.flatten or array notation with predefined object to keep linter happy
  const statusBarSpacerStyle = [
    localStyles.statusBarSpacer,
    { paddingTop: insets?.top ? insets.top + 5 : 25 },
  ];

  const searchListContentStyle = [
    styles.listPadding,
    { paddingBottom: (insets?.bottom || 0) + 70 },
  ];

  return (
    <View style={styles.container}>
      {/* Top Status Bar Spacer */}
      <View style={statusBarSpacerStyle} />

      {/* Header Condition */}
      {isSubmitted ? (
        <View style={styles.resultsHeaderContainer}>
          <TouchableOpacity
            onPress={handleBackFromResults}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
            if (isSubmitted) setIsSubmitted(false);
          }}
          onClear={handleClear}
          onSubmitEditing={handleSubmitEditing}
        />
      )}

      {loading ? (
        <Loader />
      ) : isSubmitted || isSearching ? (
        <FlatList
          key="search-list"
          data={searchResults}
          renderItem={renderSearchItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListHeaderComponent={
            !isSubmitted ? (
              <Text style={styles.topResultsHeader}>Top Results</Text>
            ) : undefined
          }
          ListFooterComponent={renderFooter}
          onEndReached={fetchMoreResults}
          onEndReachedThreshold={0.1}
          contentContainerStyle={searchListContentStyle}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          key="category-grid"
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
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
    backgroundColor: '#FFFFFF',
  },
});

export default SearchScreen;
