import React, { useMemo, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import HallCard, { HallData } from '../../components/molecules/hall-card';
import styles from './styles';
import BackHeader from '../../components/atoms/back-header';
import { colors } from '../../config/colors';
import Medium from '../../typography/medium-text';
import SemiBold from '../../typography/semi-bold-text';
import { PrimaryButton } from '../../components/atoms/button/primary-button';
import { navigate } from '../../navigation/navigation-ref';

interface DateItem {
  id: string;
  date: string;
}

const DUMMY_HALLS: HallData[] = [
  {
    id: '1',
    time: '12:30',
    hallName: 'Cinetech + Hall 1',
    price: '50',
    bonus: '2500',
  },
  {
    id: '2',
    time: '13:30',
    hallName: 'Cinetech + Hall 2',
    price: '75',
    bonus: '3000',
  },
];

const SeatLayoutScreen = () => {
  const insets = useSafeAreaInsets();

  // Moment ka use karke aj se agle 30 dino ki dates dynamically generate ki hain
  const monthDates: DateItem[] = useMemo(() => {
    const dates: DateItem[] = [];
    const today = moment();

    for (let i = 0; i < 30; i++) {
      const dateObj = today.clone().add(i, 'days');
      dates.push({
        id: dateObj.format('YYYY-MM-DD'),
        date: dateObj.format('D MMM'), // Result format: "5 Mar"
      });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(
    monthDates[0]?.id || '',
  );
  const [selectedHall, setSelectedHall] = useState<string>('1');

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? insets.top : 20,
          backgroundColor: colors.white,
        }}
      />

      <BackHeader
        title="The King’s Man"
        subtitle="In Theaters December 22, 2021"
      />

      <View style={styles.content}>
        {/* Dynamic Date Selector */}
        <Medium style={styles.sectionTitle} label={'Date'} />
        <FlatList
          horizontal
          data={monthDates}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datesList}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedDate;
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedDate(item.id)}
                style={[styles.dateChip, isSelected && styles.selectedDateChip]}
              >
                <SemiBold
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedDateText,
                  ]}
                >
                  {item.date}
                </SemiBold>
              </TouchableOpacity>
            );
          }}
        />

        {/* Cinema Halls Horizontal List */}
        <FlatList
          horizontal
          data={DUMMY_HALLS}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hallsList}
          renderItem={({ item }) => (
            <HallCard
              item={item}
              isSelected={item.id === selectedHall}
              onSelect={selected => setSelectedHall(selected.id)}
            />
          )}
        />
      </View>

      {/* Bottom Select Seats Button */}
      <View
        style={[
          styles.bottomContainer,
          { marginBottom: insets.bottom > 0 ? insets.bottom : 10 },
        ]}
      >
        <PrimaryButton
          onPress={() => {
            navigate('SeatSelectScreen');
          }}
          title="Select Seats"
        />
      </View>
    </View>
  );
};

export default SeatLayoutScreen;
