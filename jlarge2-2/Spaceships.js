import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator, TextInput, Button, Modal, Animated, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import styles from "./styles";

export default function Spaceships() {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpaceship, setSelectedSpaceship] = useState(null);
  const fadeAnimations = useRef([]).current;

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

  const handleSwipe = (spaceship) => {
    setSelectedSpaceship(spaceship);
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
            <Text>Model: {item.model}</Text>
            <Text>Manufacturer: {item.manufacturer}</Text>
            <Text>Cost: {item.cost_in_credits}</Text>
            <Text>Length: {item.length}</Text>
            <Text>Max Speed: {item.max_atmosphering_speed}</Text>
            <Text>Crew: {item.crew}</Text>
            <Text>Passengers: {item.passengers}</Text>
          </View>
        </Swipeable>
      </Animated.View>
    );
  };

  const renderRightActions = () => (
    <View style={styles.swipeAction}></View>
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
          const spaceship = spaceships.find((spaceship) =>
            spaceship.name.toLowerCase().includes(searchText.toLowerCase())
          );
          if (spaceship) {
            setSelectedSpaceship(spaceship);
            setModalVisible(true);
          } else {
            alert("Spaceship not found");
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
            {selectedSpaceship ? (
              <>
                <Text style={styles.modalText}>Name: {selectedSpaceship.name}</Text>
                <Text>Model: {selectedSpaceship.model}</Text>
                <Text>Manufacturer: {selectedSpaceship.manufacturer}</Text>
                <Text>Cost: {selectedSpaceship.cost_in_credits}</Text>
                <Text>Length: {selectedSpaceship.length}</Text>
                <Text>Max Speed: {selectedSpaceship.max_atmosphering_speed}</Text>
                <Text>Crew: {selectedSpaceship.crew}</Text>
                <Text>Passengers: {selectedSpaceship.passengers}</Text>
              </>
            ) : (
              <Text style={styles.modalText}>No details available.</Text>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Spaceships</Text>
      <FlatList
        data={spaceships}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}