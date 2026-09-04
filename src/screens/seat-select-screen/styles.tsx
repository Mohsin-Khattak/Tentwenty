import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostwhite,
  },
  mappingArea: {
    flex: 1,
    position: 'relative',
  },
  horizontalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomContainer: {
    position: 'absolute',
    bottom: 12,
    right: 18,
    flexDirection: 'row',
    zIndex: 99,
  },
  zoomButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    ...colors.shadow,
  },
  zoomText: {
    fontSize: 16,
    color: colors.darkpurple,
    fontWeight: '600',
  },
  dividerLine: {
    height: 1,
    backgroundColor: colors.lavendergray,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 8,
  },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  legendSeat: {
    width: 13,
    height: 11,
    borderRadius: 2.5,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 12,
    color: colors.oldlavender,
  },
  tagsScrollView: {
    maxHeight: 38,
    marginBottom: 10,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ghostwhite,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: colors.darkpurple,
    marginRight: 6,
  },
  tagClose: {
    fontSize: 11,
    color: colors.darkpurple,
    fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    backgroundColor: colors.ghostwhite,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 95,
  },
  priceLabel: {
    fontSize: 10,
    color: colors.oldlavender,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 16,
    color: colors.darkpurple,
  },
  payButton: {
    flex: 1,
    backgroundColor: colors.skyblue,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 14,
  },
});

export default styles;
