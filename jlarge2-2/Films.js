import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator, TextInput, Button, Modal } from "react-native";
import styles from "./styles";

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://www.swapi.tech/api/films/");
        const data = await response.json();

        const detailedFilms = data.result.map((film) => film.properties);
        setFilms(detailedFilms);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
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
      <Text style={styles.title}>Films</Text>
      <FlatList
        data={films}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text>Director: {item.director}</Text>
            <Text>Producer: {item.producer}</Text>
            <Text>Release Date: {item.release_date}</Text>
          </View>
        )}
      />
    </View>
  );
}