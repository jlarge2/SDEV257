import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, StatusBar, ActivityIndicator, TextInput, Button, Animated, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const fadeAnimations = useRef([]).current;
  const navigation = useNavigation();

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

  const renderRightActions = (item) => (
    <View style={styles.swipeAction}>
      <Button
        title="Details"
        onPress={() => {
          navigation.navigate("FilmsDetails", { film: item });
        }}
      />
    </View>
  );

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
          renderRightActions={() => renderRightActions(item)}
          onSwipeableRightOpen={() => {
            navigation.navigate("FilmsDetails", { film: item });
          }}
        >
          <View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text>Director: {item.director}</Text>
            <Text>Producer: {item.producer}</Text>
            <Text>Release Date: {item.release_date}</Text>
            <Text>{item.opening_crawl}</Text>
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

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://britasia.tv/wp-content/uploads/2018/12/movie-theater-film-reel-background-in-seamless-loop_xk6ivnb9__F0000.png" }}
        style={styles.image}
      />
      <StatusBar barStyle="dark-content" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Text style={styles.title}>Films</Text>
      <FlatList
        data={films}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
      />
    </View>
  );
}