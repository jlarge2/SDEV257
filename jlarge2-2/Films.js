import React from "react";
import { View, Text, Button, StatusBar } from "react-native";
import styles from "./styles";

export default function Films({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text>Films</Text>
      <Button
      title="Planets"
      onPress={() => navigation.navigate("Planets")}
      />
      <Button
      title="Spaceships"
      onPress={() => navigation.navigate("Spaceships")}
      />
    </View>
  );
}