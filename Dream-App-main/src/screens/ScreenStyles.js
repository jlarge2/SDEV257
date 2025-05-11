import { StyleSheet } from "react-native";

const sharedStyles = {
  input: {
    borderWidth: 1,
    borderColor: "#b8E0E2",
    padding: 16,
    marginBottom: 12,
    borderRadius: 6,
    color: "#b8E0E2",
    backgroundColor: "#001638",
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16, // Slightly larger font size
    color: "#045e95",
  },
  buttonWrapper: {
    marginTop: 8,
    backgroundColor: "#B8E0E2",
    borderRadius: 6,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  containerOverlay: {
    flex: 1,
    padding: 16,
  },
    header: {
    fontSize: 24, // Larger font size for the header
    fontWeight: "bold",
    color: "#DFB204", // Gold-like color for the header
    textAlign: "center",
    marginBottom: 16, // Add spacing below the header
    marginTop: 20, // Add spacing above the header
  },
};

const addDreamStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 30,
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
  flex: {
    flex: 1,
  },
  container: {
    padding: 30,
  },
  ...sharedStyles,
});

const editDreamStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 30,
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
    backgroundColor: "#B8E0E2", // light blue background
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