import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import Medium from '../../../typography/medium-text';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
}

interface MoviesCardProps {
  item: Movie;
  onPress: () => void;
}

const MoviesCard: React.FC<MoviesCardProps> = ({ item, onPress }) => {
  const imageUrl = item?.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
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
          style={styles.imageContainer}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={styles.titleContainer}>
          <Medium label={item?.title} style={styles.title} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MoviesCard);
