import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mappingArea: {
    flex: 1,
    backgroundColor: '#F6F6FA',
    position: 'relative',
    overflow: 'hidden',
  },
  zoomContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    paddingHorizontal: 4,
    gap: 8,
  },
  zoomButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    justifyContent: 'center',

    // justify: 'center',
  },
  zoomText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#202C43',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginVertical: 4,
  },
  legendSeat: {
    width: 14,
    height: 12,
    borderRadius: 3,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 12,
    color: '#8F8996',
  },
  tagsScrollView: {
    maxHeight: 36,
    marginBottom: 16,
  },
  tagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(97, 195, 242, 0.15)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#202C43',
    marginRight: 6,
  },
  tagClose: {
    fontSize: 10,
    color: '#202C43',
    fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceContainer: {
    backgroundColor: '#F6F6FA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 100,
  },
  priceLabel: {
    fontSize: 10,
    color: '#202C43',
  },
  priceValue: {
    fontSize: 16,
    color: '#202C43',
    marginTop: 2,
  },
  payButton: {
    flex: 1,
    backgroundColor: '#61C3F2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default styles;
