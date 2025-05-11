import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator, TextInput, Button, Animated, Image } from "react-native";
import styles from "./styles";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const fadeAnimations = useRef([]).current;

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
        setFilteredPlanets(detailedPlanets);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const fadeIn = (index) => {
    if (!fadeAnimations[index]) {
      fadeAnimations[index] = new Animated.Value(0);
    }
    Animated.timing(fadeAnimations[index], {
      toValue: 1,
      duration: 500,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  };

  const handleSearch = () => {
    const filtered = planets.filter((planet) =>
      planet.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPlanets(filtered);
  };

  const renderItem = ({ item, index }) => {
    fadeIn(index);
    return (
      <Animated.View
        style={{ ...styles.item, opacity: fadeAnimations[index] }}
      >
        <View>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text>Climate: {item.climate}</Text>
          <Text>Terrain: {item.terrain}</Text>
          <Text>Population: {item.population}</Text>
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"silver"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://lumiere-a.akamaihd.net/v1/images/1-alderaan-bio-1_copy_d2ef86c5.jpeg?region=0%2C0%2C1280%2C550" }}
        style={styles.image}
      />
      <StatusBar barStyle="dark-content" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={filteredPlanets}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}