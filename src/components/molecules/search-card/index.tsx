import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import Medium from '../../../typography/medium-text';
import { ThreedotsIcon } from '../../../assets/icons';
import Regular from '../../../typography/regular-text';

interface Movie {
  id: number;
  title: string;
  original_title: string;
  backdrop_path: string | null;
}

interface SearchCardProps {
  item: Movie;
  onPress: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ item, onPress }) => {
  const imageUrl = item?.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
    : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <FastImage
        source={{
          uri: imageUrl,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.imageContainer}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{ flex: 1 }}>
        <Medium numberOfLines={1} style={styles.title} label={item.title} />
        <Medium
          label={item?.original_title}
          fontSize={12}
          color={'#DBDBDF'}
          style={{ marginTop: 10 }}
        />
      </View>
      <ThreedotsIcon />
    </TouchableOpacity>
  );
};

export default React.memo(SearchCard);
