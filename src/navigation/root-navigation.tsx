import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootStackParamList from '../types/navigation-types/root-stack';
import TabNavigator from './tab-navigation';
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator
        initialRouteName="BottomTab"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="BottomTab" component={TabNavigator} />
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
