import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuizStack from './components/Stacks/QuizStack';

export default function App() {
  return (
    <NavigationContainer>
      <QuizStack />
    </NavigationContainer>
  );
}


