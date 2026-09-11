import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Genre } from '../../../types/entities-types';
import Medium from '../../../typography/medium-text';
import styles from './styles';

interface CategoriesCardProps {
  item: Genre;
  onPress: () => void;
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <FastImage
          source={{
            uri: item?.image,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.imageContainer}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.overlay} />

        <View style={styles.titleContainer}>
          <Medium label={item?.name} style={styles.title} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CategoriesCard);
