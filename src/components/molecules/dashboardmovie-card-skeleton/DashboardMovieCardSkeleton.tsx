import React from 'react';
import { StyleSheet, View } from 'react-native';

import { mvs } from '../../../config/metrices';
import Shimmer from '../../atoms/shimmer/Shimmer';

const DashboardMovieCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <Shimmer width="100%" height={mvs(180)} borderRadius={mvs(10)} />
    </View>
  );
};

export default React.memo(DashboardMovieCardSkeleton);

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: mvs(180),
  },
});
