import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EpisodeItem = ({ name, air_date, episode }: any) => {
  return (
    <View style={styles.episodeCard}>
      <Text style={styles.episodeName}>{name || "Naam onbekend"}</Text>
      <Text style={styles.episodeDetails}>{`Aflevering: ${episode || "N/A"}`}</Text>
      <Text style={styles.episodeDetails}>{`Uitzenddatum: ${air_date || "Onbekend"}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  episodeCard: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Schaduw op Android
  },
  episodeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  episodeDetails: {
    fontSize: 14,
    color: "#555",
  },
});

export default EpisodeItem;
