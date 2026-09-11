import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Medium from '../../../typography/medium-text';
import Regular from '../../../typography/regular-text';
import { SeatsImage } from '../../../assets/images/index';

export interface HallData {
  id: string;
  time: string;
  hallName: string;
  price: string;
  bonus: string;
}

interface HallCardProps {
  item: HallData;
  isSelected: boolean;
  onSelect: (item: HallData) => void;
}

const HallCard: React.FC<HallCardProps> = ({ item, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(item)}
      style={styles.container}
    >
      <View style={styles.timeRow}>
        <Medium style={styles.timeText} label={item.time} />
        <Regular style={styles.hallNameText} label={item.hallName} />
      </View>

      <View style={[styles.cardBox, isSelected && styles.selectedCardBox]}>
        <Image style={styles.seatImage} source={SeatsImage} />
      </View>

      <Text style={styles.priceText}>
        From <Text style={styles.boldText}>{item.price}$</Text> or{' '}
        <Text style={styles.boldText}>{item.bonus} bonus</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default HallCard;

const styles = StyleSheet.create({
  container: {
    width: 250,
    marginRight: 16,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  seatImage: { width: 144, height: 110 },
  timeText: {
    fontSize: 12,
    color: '#202C43',
    marginRight: 8,
  },
  hallNameText: {
    fontSize: 12,
    color: '#8F8F8F',
  },
  cardBox: {
    height: 165,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#EFEFEF',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedCardBox: {
    borderColor: '#61C3F2', // Highlight border color when selected
  },
  screenCurve: {
    width: '85%',
    height: 12,
    borderTopWidth: 2,
    borderTopColor: '#61C3F2',
    borderRadius: 10,
    marginBottom: 14,
  },
  seatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  seatBlock: {
    alignItems: 'center',
  },
  seatRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  miniSeat: {
    width: 5,
    height: 5,
    borderRadius: 1.5,
    backgroundColor: '#61C3F2',
    marginHorizontal: 1.5,
  },
  priceText: {
    marginTop: 10,
    fontSize: 13,
    color: '#8C92AC',
  },
  boldText: {
    fontWeight: '700',
    color: '#202C43',
  },
});
