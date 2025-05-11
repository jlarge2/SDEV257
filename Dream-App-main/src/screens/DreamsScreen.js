import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { Provider, Menu } from "react-native-paper";
import api, { deleteDream } from "../api";
import { dreamsScreenStyles as styles } from "./ScreenStyles"; // Import styles
import earth from "../../assets/Somnia.png"; // Path to your image

export default function DreamsScreen({ navigation }) {
  const [dreams, setDreams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/dreams")
      .then((res) => setDreams(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const DreamItem = ({ item }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <View style={styles.card}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              {item.climax && (
                <View style={styles.bodyContainer}>
                  <Text style={styles.body}>{item.climax}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        }
      >
        <Menu.Item
          title="Edit"
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate("Edit Dream", { dream: item });
          }}
        />
        <Menu.Item
          title="Delete"
          onPress={async () => {
            setMenuVisible(false);
            try {
              await deleteDream(item._id);
              setDreams((prev) => prev.filter((d) => d._id !== item._id));
            } catch (e) {
              Alert.alert("Error", e.message);
            }
          }}
        />
        <Menu.Item
          title="Write Story"
          onPress={() => {
            setMenuVisible(false);
            navigation.navigate("Add Story", { dream: item });
          }}
        />
      </Menu>
    );
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={earth}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.containerOverlay}>
            {/* Header */}
            <Text style={styles.header}>Dreams</Text>

            <FlatList
              data={dreams}
              keyExtractor={(d) => d._id}
              renderItem={({ item }) => <DreamItem item={item} />}
              ListEmptyComponent={
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyText}>No dreams yet…</Text>
                </View>
              }
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </Provider>
  );
}