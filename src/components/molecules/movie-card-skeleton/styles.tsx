import { StyleSheet } from 'react-native';

import { mvs } from '../../../config/metrices';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: mvs(16),
  },

  imageContainer: {
    width: '100%',
    height: mvs(180),
    borderRadius: mvs(10),
    overflow: 'hidden',
    backgroundColor: '#E5E5E5',
  },

  shimmer: {
    width: mvs(120),
    height: '100%',
    backgroundColor: '#F5F5F5',
    opacity: 0.8,
  },
});

export default styles;
