import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  View,
  ImageBackground,
} from "react-native";
import api from "../api"; // our API helper for HTTP requests
import { addDreamStyles as styles } from "./ScreenStyles"; // Import styles
import bgpic from "../../assets/bgpic.png"; // Import the background image

export default function AddDreamScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [climax, setClimax] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [emotion, setEmotion] = useState("");
  const [people, setPeople] = useState("");
  const [objects, setObjects] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      return Alert.alert("Validation Error", "Title is required");
    }
    try {
      await api.post("/dreams", {
        title,
        climax,
        location,
        time,
        emotion,
        people: people.split(",").map((s) => s.trim()).filter(Boolean),
        objects: objects.split(",").map((s) => s.trim()).filter(Boolean),
        notes,
      });
      Alert.alert("Success", "Dream saved!");
      navigation.navigate("Dreams");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ImageBackground source={bgpic} style={styles.backgroundImage}>
      <SafeAreaView style={styles.containerOverlay}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Climax"
          value={climax}
          onChangeText={setClimax}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Time"
          value={time}
          onChangeText={setTime}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Emotion"
          value={emotion}
          onChangeText={setEmotion}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="People (comma‑separated)"
          value={people}
          onChangeText={setPeople}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Objects (comma‑separated)"
          value={objects}
          onChangeText={setObjects}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
          style={[styles.input, { height: 80 }]}
          multiline
          placeholderTextColor="#ccc"
        />
        <View style={styles.buttonWrapper}>
          <Button title="Save Dream" onPress={handleSave} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}