import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DreamsScreen from './src/screens/DreamsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dreams">
        <Stack.Screen name="Dreams" component={DreamsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
