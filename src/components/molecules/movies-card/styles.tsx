import { StyleSheet } from 'react-native';

import { mvs } from '../../../config/metrices';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: mvs(20),
  },

  imageContainer: {
    width: '100%',
    height: mvs(180),
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
    color: '#FFFFFF',
    fontSize: mvs(18),
    fontWeight: '700',
  },
});

export default styles;
