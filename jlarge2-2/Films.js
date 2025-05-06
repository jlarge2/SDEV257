import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://www.swapi.tech/api/films/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const detailedFilms = data.result.map((film) => film.properties);
        setFilms(detailedFilms);
      } catch (error) {
        console.error("Error fetching films:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
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
            <Text>Opening Crawl:</Text>
            <Text>{item.opening_crawl}</Text>
          </View>
        )}
      />
    </View>
  );
}