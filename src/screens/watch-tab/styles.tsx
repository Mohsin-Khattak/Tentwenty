import { StyleSheet } from 'react-native';
import { mvs } from '../../config/metrices';

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContentContainer: {
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(20),
    paddingTop: mvs(20),
  },
  footerLoader: { paddingVertical: mvs(15) },
});
export default styles;
