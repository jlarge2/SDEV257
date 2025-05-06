import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator, TextInput, Button, Modal } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import styles from "./styles";

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

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

  const handleSwipe = (film) => {
    setSelectedFilm(film);
    setModalVisible(true);
  };

  const renderRightActions = () => (
    <View style={styles.swipeAction}>
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
      <StatusBar barStyle="dark-content" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedFilm ? (
              <>
                <Text style={styles.modalText}>Title: {selectedFilm.title}</Text>
                <Text>Director: {selectedFilm.director}</Text>
                <Text>Producer: {selectedFilm.producer}</Text>
                <Text>Release Date: {selectedFilm.release_date}</Text>
                <Text>Opening Crawl:</Text>
                <Text>{selectedFilm.opening_crawl}</Text>
              </>
            ) : (
              <Text style={styles.modalText}>No details available.</Text>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Films</Text>
      <FlatList
        data={films}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableRightOpen={() => handleSwipe(item)}
          >
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text>Director: {item.director}</Text>
              <Text>Producer: {item.producer}</Text>
              <Text>Release Date: {item.release_date}</Text>
              <Text>{item.opening_crawl}</Text>
            </View>
          </Swipeable>
        )}
      />
    </View>
  );
}