import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';
import { mvs } from '../../config/metrices';

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
  topResultsHeader: {
    fontSize: mvs(12),
    fontWeight: '600',
    color: '#202C43',
    marginBottom: mvs(10),
    paddingBottom: mvs(10),
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  resultsHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(16),
    backgroundColor: colors.white || '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  backButton: {
    marginRight: mvs(16),
  },
  resultsCountText: {
    fontSize: mvs(16),
    fontWeight: '500',
    color: '#202C43',
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
export default styles;
