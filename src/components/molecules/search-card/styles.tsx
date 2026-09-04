import { StyleSheet } from 'react-native';

import { mvs } from '../../../config/metrices';
import { colors } from '../../../config/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: mvs(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },

  imageContainer: {
    width: 130,
    height: mvs(100),
    borderRadius: mvs(10),
    overflow: 'hidden',
    position: 'relative',
  },

  title: {
    color: '#202C43',
    fontSize: mvs(16),
  },
});

export default styles;
