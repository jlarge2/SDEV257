import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch("https://www.swapi.tech/api/planets/");
        const data = await response.json();

        const fetchDetails = data.results.map(async (planet) => {
          const planetResponse = await fetch(planet.url);
          const planetData = await planetResponse.json();
          return planetData.result.properties;
        });

        const detailedPlanets = await Promise.all(fetchDetails);
        setPlanets(detailedPlanets);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"silver"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Planets</Text>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text>Climate: {item.climate}</Text>
            <Text>Terrain: {item.terrain}</Text>
            <Text>Population: {item.population}</Text>
            <Text>Diameter: {item.diameter}</Text>
            <Text>Gravity: {item.gravity}</Text>
            <Text>Orbital Period: {item.orbital_period}</Text>
            <Text>Rotation Period: {item.rotation_period}</Text>
          </View>
        )}
      />
    </View>
  );
}