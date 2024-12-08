import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EpisodeDetailsScreen = ({ route }: any) => {
  const { episode } = route.params; // Haal de episode gegevens op

  if (!episode) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Geen details beschikbaar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episode.name || "Naam onbekend"}</Text>
      <Text style={styles.details}>{`Aflevering: ${episode.episode || "N/A"}`}</Text>
      <Text style={styles.details}>{`Uitzenddatum: ${episode.air_date || "Onbekend"}`}</Text>
      <Text style={styles.details}>{`Seizoen: ${episode.season || "Onbekend"}`}</Text>
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
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default EpisodeDetailsScreen;
