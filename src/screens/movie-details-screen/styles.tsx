import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/colors';
import { mvs } from '../../config/metrices';
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerImage: {
    width: '100%',
    height: height * 0.6,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
    // width: '100%',
    paddingHorizontal: mvs(66),
  },
  title: {
    color: colors.goldenrod,

    textAlign: 'center',
    marginBottom: 6,
  },
  releaseDate: {
    color: '#FFFFFF',
    marginBottom: 20,
  },
  ticketButton: {
    backgroundColor: '#61C3F2',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  trailerButton: {
    borderWidth: 1.5,
    borderColor: '#61C3F2',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  trailerButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  detailsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.darkpurple,
    marginBottom: 14,
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  genreBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginBottom: 20,
  },
  overviewText: {
    fontSize: 12,
    color: '#8F8F8F',
    lineHeight: 22,
  },
});

export default styles;
