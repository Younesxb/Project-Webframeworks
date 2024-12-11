import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EpisodeDetailsScreen = ({ route }: any) => {
  const { episode } = route.params; // Haal de episode gegevens op



  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.details}>{`Aflevering: ${episode.episode}`}</Text>
      <Text style={styles.details}>{`Uitzenddatum: ${episode.air_date}`}</Text>
      <Text style={styles.details}>{`Seizoen: ${episode.season}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  }
});

export default EpisodeDetailsScreen;
