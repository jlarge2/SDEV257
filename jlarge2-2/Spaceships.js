import React from "react";
import { View, Text, Button, StatusBar } from "react-native";
import styles from "./styles";

export default function Spaceships({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Spaceships</Text>
      <Button
      title="Planets"
      onPress={() => navigation.navigate("Planets")}
      />
      <Button
      title="Films"
      onPress={() => navigation.navigate("Films")}
      />
    </View>
  );
}