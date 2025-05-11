import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./styles";

export default function FilmsDetails({ route }) {
  const { film } = route.params;

  if (!film) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No film selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Film Details</Text>
      <Text style={styles.text}>Title: {film.title}</Text>
      <Text style={styles.text}>Director: {film.director}</Text>
      <Text style={styles.text}>Producer: {film.producer}</Text>
      <Text style={styles.text}>Release Date: {film.release_date}</Text>
      <Text style={styles.text}>Opening Crawl:</Text>
      <Text style={styles.text}>{film.opening_crawl}</Text>
    </View>
  );
}
