import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator, TextInput, Button, Modal } from "react-native";
import styles from "./styles";

export default function Spaceships() {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

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

        const detailedSpaceships = await Promise.all(fetchDetails);
        setSpaceships(detailedSpaceships);
      } catch (error) {
        console.error("Error fetching spaceships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceships();
  }, []);

  const handleSearchSubmit = () => {
    const results = spaceships.filter((ship) =>
      ship.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredResults(results);
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
            <Text style={styles.modalText}>Search Results:</Text>
            {filteredResults.length > 0 ? (
              <FlatList
                data={filteredResults}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text>Model: {item.model}</Text>
                    <Text>Manufacturer: {item.manufacturer}</Text>
                    <Text>Cost: {item.cost_in_credits}</Text>
                    <Text>Length: {item.length}</Text>
                    <Text>Max Speed: {item.max_atmosphering_speed}</Text>
                    <Text>Crew: {item.crew}</Text>
                    <Text>Passengers: {item.passengers}</Text>
                  </View>
                )}
              />
            ) : (
              <Text>No results found.</Text>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Spaceships</Text>
      <FlatList
        data={spaceships}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text>Model: {item.model}</Text>
            <Text>Manufacturer: {item.manufacturer}</Text>
            <Text>Cost: {item.cost_in_credits}</Text>
            <Text>Length: {item.length}</Text>
            <Text>Max Speed: {item.max_atmosphering_speed}</Text>
            <Text>Crew: {item.crew}</Text>
            <Text>Passengers: {item.passengers}</Text>
          </View>
        )}
      />
    </View>
  );
}