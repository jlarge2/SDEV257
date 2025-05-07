import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator, TextInput, Button, Modal, Animated, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import styles from "./styles";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
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
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const handleSearchSubmit = () => {
    const results = planets.filter((planet) =>
      planet.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredResults(results);
    setModalVisible(true);
  };

  const handleSwipe = (planet) => {
    setSelectedPlanet(planet);
    setModalVisible(true);
  };

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

  const renderItem = ({ item, index }) => {
    fadeIn(index);
    return (
      <Animated.View
        style={{ ...styles.item, opacity: fadeAnimations[index] }}
      >
        <Swipeable
          renderRightActions={renderRightActions}
          onSwipeableRightOpen={() => handleSwipe(item)}
        >
          <View>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text>Climate: {item.climate}</Text>
            <Text>Terrain: {item.terrain}</Text>
            <Text>Population: {item.population}</Text>
            <Text>Diameter: {item.diameter}</Text>
            <Text>Gravity: {item.gravity}</Text>
            <Text>Orbital Period: {item.orbital_period}</Text>
            <Text>Rotation Period: {item.rotation_period}</Text>
          </View>
        </Swipeable>
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

  const renderRightActions = () => (
    <View style={styles.swipeAction}></View>
  );

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
      <Button
        title="Search"
        onPress={() => {
          const planet = planets.find((planet) =>
            planet.name.toLowerCase().includes(searchText.toLowerCase())
          );
          if (planet) {
            setSelectedPlanet(planet);
            setModalVisible(true);
          } else {
            alert("Planet not found");
          }
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPlanet ? (
              <>
                <Text style={styles.modalText}>Name: {selectedPlanet.name}</Text>
                <Text>Climate: {selectedPlanet.climate}</Text>
                <Text>Terrain: {selectedPlanet.terrain}</Text>
                <Text>Population: {selectedPlanet.population}</Text>
                <Text>Diameter: {selectedPlanet.diameter}</Text>
                <Text>Gravity: {selectedPlanet.gravity}</Text>
                <Text>Orbital Period: {selectedPlanet.orbital_period}</Text>
                <Text>Rotation Period: {selectedPlanet.rotation_period}</Text>
              </>
            ) : (
              <Text style={styles.modalText}>No results found.</Text>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Planets</Text>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}