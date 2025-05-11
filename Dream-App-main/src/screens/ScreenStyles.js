import { StyleSheet } from "react-native";

const sharedStyles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    color: "#fff",
  },
  buttonWrapper: {
    marginTop: 8,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  containerOverlay: {
    flex: 1,
    padding: 16,
  },
};

const addDreamStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ...sharedStyles,
});

const addStoryStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  ...sharedStyles,
});

const dreamsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  ...sharedStyles,
});

const editDreamStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  ...sharedStyles,
});

const pingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ...sharedStyles,
});

const storiesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#e9f1ff", // light blue background
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  empty: {
    marginTop: 40,
    textAlign: "center",
    color: "#999",
  },
  error: {
    color: "red",
    padding: 16,
  },
  ...sharedStyles,
});

export {
  addDreamStyles,
  addStoryStyles,
  dreamsScreenStyles,
  editDreamStyles,
  pingScreenStyles,
  storiesScreenStyles,
};