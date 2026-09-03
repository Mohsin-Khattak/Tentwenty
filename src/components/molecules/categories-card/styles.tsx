import { StyleSheet } from 'react-native';

import { mvs } from '../../../config/metrices';
import { colors } from '../../../config/colors';

const styles = StyleSheet.create({
  container: {
    width: '48%',
  },

  imageContainer: {
    width: '100%',
    height: mvs(100),
    borderRadius: mvs(10),
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0000004D',
  },

  titleContainer: {
    position: 'absolute',
    left: mvs(14),
    right: mvs(14),
    bottom: mvs(14),
    zIndex: 1,
  },

  title: {
    color: colors.white,
    fontSize: mvs(18),
  },
});

export default styles;
