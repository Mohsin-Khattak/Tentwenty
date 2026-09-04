import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostwhite || '#FAFAFC',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#202C43',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202C43',
  },
  subtitle: {
    fontSize: 13,
    color: '#61C3F2',
    fontWeight: '600',
    marginTop: 4,
  },
  content: {
    paddingTop: 94,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#202C43',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  datesList: {
    paddingHorizontal: 20,
    marginBottom: 35,
  },
  dateChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#A6A6A61A',
    marginRight: 10,
  },
  selectedDateChip: {
    backgroundColor: '#61C3F2',
  },
  dateText: {
    fontSize: 12,
    color: '#202C43',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  hallsList: {
    paddingHorizontal: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  selectButton: {
    backgroundColor: '#61C3F2',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#61C3F2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default styles;
