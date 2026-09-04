import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  getGenresWithImages,
  searchMovies,
} from '../../services/api/watch-api-action';
import styles from './styles';
import { Genre, Movie } from '../../types/entities-types';
import { colors } from '../../config/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchHeader from '../../components/atoms/search-header';
import { Loader } from '../../components/atoms/loader';
import { navigate } from '../../navigation/navigation-ref';
import CategoriesCard from '../../components/molecules/categories-card';
import SearchCard from '../../components/molecules/search-card';
import { BackBlackIcon, BackIcon } from '../../assets/icons'; // Aap ke project ka Back Icon

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [categories, setCategories] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  // Track if search submit/enter key was pressed
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getGenresWithImages();
      setCategories(data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Debouncing Effect (500ms for smooth UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search API Call Effect
  useEffect(() => {
    const handleSearchAPI = async () => {
      if (debouncedQuery.trim() === '') {
        setSearchResults([]);
        setIsSubmitted(false);
        return;
      }

      try {
        setLoading(true);
        const response = await searchMovies(debouncedQuery);
        console.log('check search response==>', JSON.stringify(response));
        setSearchResults(response?.results || []);
      } catch (error) {
        console.log('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    handleSearchAPI();
  }, [debouncedQuery]);

  const handleClear = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setSearchResults([]);
    setIsSubmitted(false);
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

  const isSearching = searchQuery.trim().length > 0;

  return (
    <View style={styles.container}>
      {/* Top Status Bar Spacer */}
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? insets?.top : 20,
          backgroundColor: colors.statsbar,
        }}
      />

      {/* Header Condition: Show "X Results Found" Header if Submitted */}
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
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            !isSubmitted ? (
              <Text style={styles.topResultsHeader}>Top Results</Text>
            ) : undefined
          }
          contentContainerStyle={[
            styles.listPadding,
            { paddingBottom: (insets?.bottom || 0) + 70 },
          ]}
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
          contentContainerStyle={[
            styles.listPadding,
            { paddingBottom: (insets?.bottom || 0) + 70 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default SearchScreen;
