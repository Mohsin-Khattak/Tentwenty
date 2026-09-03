import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, View, ListRenderItem } from 'react-native';
import { getGenresWithImages } from '../../services/api/watch-api-action';
import styles from './styles';
import { Genre } from '../../types/entities-types';
import { colors } from '../../config/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchHeader from '../../components/atoms/search-header';
import { Loader } from '../../components/atoms/loader';
import { navigate } from '../../navigation/navigation-ref';
import CategoriesCard from '../../components/molecules/categories-card';

const SearchScreen = () => {
  const [categories, setCategories] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getGenresWithImages();
      setCategories(data);
      console.log('response check categories==>', JSON.stringify(data));
    } catch (error) {
      console.log('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const insets = useSafeAreaInsets();

  const renderCategoryItem: ListRenderItem<Genre> = useCallback(
    ({ item }) => (
      <CategoriesCard
        item={item}
        onPress={() => {
          console.log('MOVIE ID:', item.id);
          navigate('MoviesDetailsScreen', { movieId: item.id });
        }}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? insets?.top : 20,
          backgroundColor: colors.statsbar,
        }}
      />
      <SearchHeader value="" />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[
            styles.listPadding,
            { paddingBottom: (insets?.bottom || 0) + 70 }, // Dynamic bottom space for Tab Bar
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
export default SearchScreen;
