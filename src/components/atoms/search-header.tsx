import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SearchIcon, CloseIcon, SearchTwo } from '../../assets/icons';
import { colors } from '../../config/colors';
import { mvs } from '../../config/metrices';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  onSubmitEditing?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'TV shows, movies and more',
  onSubmitEditing,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchIconWrapper}>
          <SearchTwo />
        </View>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#202C434D"
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
        />

        <TouchableOpacity
          onPress={onClear}
          style={styles.clearButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <CloseIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(SearchInput);

const styles = StyleSheet.create({
  // Main outer container with horizontal padding 20
  mainContainer: {
    paddingHorizontal: mvs(20),
    width: '100%',
    backgroundColor: colors.white || '#FFFFFF',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  // Inner grey pill container
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F6',
    borderRadius: mvs(30),
    paddingHorizontal: mvs(16),
    height: mvs(52),
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchIconWrapper: {
    marginRight: mvs(12),
  },
  input: {
    flex: 1,
    fontSize: mvs(15),
    color: colors.darkpurple || '#202C43',
    paddingVertical: 0,
    fontFamily: 'Regular',
  },
  clearButton: {
    padding: mvs(4),
    marginLeft: mvs(8),
  },
});
