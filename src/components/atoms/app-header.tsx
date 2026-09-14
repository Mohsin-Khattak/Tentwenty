import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NotificationIcon, SearchIcon } from '../../assets/icons';
import { colors } from '../../config/colors';
import { mvs } from '../../config/metrices';
import Bold from '../../typography/bold-text';
import SemiBold from '../../typography/semi-bold-text';

interface AppHeaderProps {
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  onSearchPress,
  onNotificationPress,
}) => {
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Bold label={`${greeting},`} fontSize={22} color={colors.darkpurple} />
        <SemiBold
          label={'Mohsin Khattak '}
          fontSize={mvs(16)}
          color={colors.darkpurple}
        />
      </View>
      <View style={styles.headerButton}>
        <TouchableOpacity
          onPress={onSearchPress}
          style={styles.searchButton}
          hitSlop={10}
        >
          <SearchIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.searchButton}
          hitSlop={10}
        >
          <NotificationIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(AppHeader);

const styles = StyleSheet.create({
  container: {
    paddingVertical: mvs(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mvs(20),
    backgroundColor: colors.white,
    borderBottomWidth: mvs(1),
    borderBottomColor: colors.bordercolor,
  },
  searchButton: {
    width: mvs(40),
    height: mvs(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: mvs(10),
  },
});
