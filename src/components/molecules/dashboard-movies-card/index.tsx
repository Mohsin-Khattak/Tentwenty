import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Medium from '../../../typography/medium-text';
import styles from './styles';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MoviesCardProps {
  item: Movie;
  onPress: () => void;
}

const DashboardMovieCard: React.FC<MoviesCardProps> = ({ item, onPress }) => {
  const imageUrl = item?.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : '';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <FastImage
          source={{
            uri: imageUrl,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.image as any}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(DashboardMovieCard);
