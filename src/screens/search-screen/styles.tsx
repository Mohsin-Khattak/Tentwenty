import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostwhite,
  },
  listPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
});
export default styles;
