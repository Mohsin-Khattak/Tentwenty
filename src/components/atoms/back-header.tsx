import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackBlackIcon } from '../../assets/icons';
import { goBack } from '../../navigation/navigation-ref';

interface AppHeaderProps {
  title: string;
  subtitle: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={[styles.header]}>
      <TouchableOpacity onPress={() => goBack()}>
        <BackBlackIcon />
      </TouchableOpacity>
      <View>
        <Text style={styles.movieTitle}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View />
    </View>
  );
};

export default React.memo(AppHeader);

const styles = StyleSheet.create({
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
});
