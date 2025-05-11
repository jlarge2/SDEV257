import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TextInput, Button, Image } from "react-native";
import styles from "./styles";

export default function Spaceships() {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredSpaceships, setFilteredSpaceships] = useState([]);

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
        setFilteredSpaceships(detailedSpaceships);
      } catch (error) {
        console.error("Error fetching spaceships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceships();
  }, []);

  const handleSearch = () => {
    const filtered = spaceships.filter((ship) =>
      ship.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSpaceships(filtered);
  };

  const renderItem = ({ item }) => (
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
  );

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
        source={{ uri: "https://img2.wikia.nocookie.net/__cb20130325050438/starwars/images/d/d4/Hangar_Bay_HF-201.png" }}
        style={styles.image}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={filteredSpaceships}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}