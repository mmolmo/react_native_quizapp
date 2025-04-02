import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuizStart from '../../Screens/QuizStart';
import QuizQuestion from '../../Screens/QuizQuestion';
import QuizEnd from '../../Screens/QuizEnd';

const Stack = createNativeStackNavigator();

const QuizStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuizStart" component={QuizStart} />
      <Stack.Screen name="QuizQuestion" component={QuizQuestion}/>
      <Stack.Screen name="QuizEnd" component={QuizEnd} />
    </Stack.Navigator>
  );
};

export default QuizStack;
