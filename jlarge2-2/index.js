import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';

import Films from './Films';
import Planets from './Planets';
import Spaceships from './Spaceships';

const Stack = createStackNavigator();

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Films" onPress={() => navigation.navigate('Films')} />
      <Button title="Planets" onPress={() => navigation.navigate('Planets')} />
      <Button title="paceships" onPress={() => navigation.navigate('Spaceships')} />
    </View>
  );
}

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Films" component={Films} />
        <Stack.Screen name="Planets" component={Planets} />
        <Stack.Screen name="Spaceships" component={Spaceships} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

registerRootComponent(MainNavigator);