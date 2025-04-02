import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Planets from "./Planets.js";
import Spaceships from "./Spaceships.js";
import Films from "./Films.js";

// Create instances of navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function PlatformSpecificNavigator() {
  if (Platform.OS === "ios") {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Planets" component={Planets} />
        <Tab.Screen name="Spaceships" component={Spaceships} />
        <Tab.Screen name="Films" component={Films} />
      </Tab.Navigator>
    );
  } else if (Platform.OS === "android") {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Planets" component={Planets} />
        <Drawer.Screen name="Spaceships" component={Spaceships} />
        <Drawer.Screen name="Films" component={Films} />
      </Drawer.Navigator>
    );
  }
  return null;
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={PlatformSpecificNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Planets" component={Planets} />
        <Stack.Screen name="Spaceships" component={Spaceships} />
        <Stack.Screen name="Films" component={Films} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}