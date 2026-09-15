import { StyleSheet } from 'react-native';

import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';

const styles = StyleSheet.create({
  container: {
    width: mvs(150),
    marginRight: mvs(12),
  },

  imageContainer: {
    width: '100%',
    height: mvs(220),
    borderRadius: mvs(10),
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  titleContainer: {
    position: 'absolute',
    left: mvs(14),
    right: mvs(14),
    bottom: mvs(14),
  },

  title: {
    color: colors.white,
    fontSize: mvs(18),
  },
});

export default styles;
