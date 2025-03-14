import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { EpisodeItemProps } from "../types/types";

const EpisodeItem = ({ name, air_date, episode, season }: EpisodeItemProps) => {
  return (
    <View style={styles.episodeCard}>
      <Text style={styles.episodeName}>{name}</Text>
      <Text style={styles.episodeDetails}>{`Aflevering: ${episode}`}</Text>
      <Text style={styles.episodeDetails}>{`Uitzenddatum: ${air_date}`}</Text>
      <Text style={styles.episodeDetails}>{`Seizoen: ${season}`}</Text>
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
