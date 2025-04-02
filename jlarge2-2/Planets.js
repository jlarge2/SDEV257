import React from "react";
import { View, Text, Button, StatusBar } from "react-native";
import styles from "./styles";

export default function Planets({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Planets</Text>
      <Button
        title="Spaceships"
        onPress={() => navigation.navigate("Spaceships")}
      />
      <Button
      title="Films"
      onPress={() => navigation.navigate("Films")}
      />
    </View>
  );
}