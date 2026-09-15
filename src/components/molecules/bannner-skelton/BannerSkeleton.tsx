import React from 'react';
import { Dimensions, View } from 'react-native';
import Shimmer from '../../atoms/shimmer/Shimmer';

const { width } = Dimensions.get('window');

const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = 240;

const BannerSkeleton = () => {
  return (
    <View
      style={{
        width,
        height: BANNER_HEIGHT + 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
      }}
    >
      <Shimmer width={BANNER_WIDTH} height={BANNER_HEIGHT} borderRadius={16} />
    </View>
  );
};

export default React.memo(BannerSkeleton);
