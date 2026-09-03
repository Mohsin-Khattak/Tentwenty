import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, View } from 'react-native';
import { colors } from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootStackParamList from '../types/navigation-types/root-stack';
import TabNavigator from './tab-navigation';
import MoviesDetailsScreen from '../screens/movie-details-screen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator
        initialRouteName="BottomTab"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="BottomTab" component={TabNavigator} />
          <Stack.Screen
            name="MoviesDetailsScreen"
            component={MoviesDetailsScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
