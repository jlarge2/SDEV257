import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function Spaceships() {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaceships = async () => {
      try {
        const response = await fetch("https://www.swapi.tech/api/starships/");
        const data = await response.json();

        const fetchDetails = data.results.map(async (ship) => {
          const shipResponse = await fetch(ship.url);
          const shipData = await shipResponse.json();
          return shipData.result.properties;
        });

        const detailedShips = await Promise.all(fetchDetails);
        setSpaceships(detailedShips);
      } catch (error) {
        console.error("Error fetching spaceships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceships();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="silver" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Spaceships</Text>
      <FlatList
        data={spaceships}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text>Model: {item.model}</Text>
            <Text>Class: {item.starship_class}</Text>
            <Text>Manufacturer: {item.manufacturer}</Text>
            <Text>Cost in Credits: {item.cost_in_credits}</Text>
            <Text>Length: {item.length}</Text>
            <Text>Crew: {item.crew}</Text>
            <Text>Passengers: {item.passengers}</Text>
            <Text>Max Speed: {item.max_atmosphering_speed}</Text>
          </View>
        )}
      />
    </View>
  );
}