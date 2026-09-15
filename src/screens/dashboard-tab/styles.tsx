import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    paddingBottom: 100,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.darkpurple,
    marginHorizontal: 16,
    marginTop: 10,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  trendingList: { flexGrow: 0, marginTop: 12 },
  scrollContent: {
    paddingBottom: 100,
  },
});
export default styles;
