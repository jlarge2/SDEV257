import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator, TextInput, Button, Modal } from "react-native";
import styles from "./styles";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(true);
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
      <StatusBar barStyle="dark-content" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearchSubmit} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You searched for: {searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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