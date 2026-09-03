import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchIcon } from '../../assets/icons';
import Regular from '../../typography/regular-text';
import Medium from '../../typography/medium-text';
import { mvs } from '../../config/metrices';
import { colors } from '../../config/colors';

interface AppHeaderProps {
  title: string;
  onSearchPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, onSearchPress }) => {
  return (
    <View style={styles.container}>
      <Medium label={title} fontSize={mvs(16)} color={colors.darkpurple} />

      <TouchableOpacity
        onPress={onSearchPress}
        style={styles.searchButton}
        hitSlop={10}
      >
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(AppHeader);

const styles = StyleSheet.create({
  container: {
    paddingVertical: mvs(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(20),
    backgroundColor: colors.white,
    borderBottomWidth: mvs(1),
    borderBottomColor: colors.bordercolor,
  },

  searchButton: {
    width: mvs(40),
    height: mvs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
