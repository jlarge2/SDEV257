import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Planets from "./Planets.js";
import Spaceships from "./Spaceships.js";
import Films from "./Films.js";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const connectedMap = {
  none: "Disconnected",
  unknown: "Disconnected",
  wifi: "Connected",
  cell: "Connected",
  mobile: "Connected",
};

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

function App() {
  const [connectionStatus, setConnectionStatus] = useState("Checking...");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const status = connectedMap[state.type] || "Disconnected";
      setConnectionStatus(status === "Disconnected" ? "Network not found" : status);
    });

    return () => unsubscribe();
  }, []);

  if (connectionStatus === "Network not found") {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Network not found</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;