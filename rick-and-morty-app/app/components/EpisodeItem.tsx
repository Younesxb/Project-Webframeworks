// components/EpisodeItem.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface EpisodeItemProps {
  name: string;
  air_date: string;
  episode: string;
}

const EpisodeItem = ({ name, air_date, episode }: EpisodeItemProps) => {
  return (
    <View style={styles.episodeCard}>
      <Text style={styles.episodeTitle}>{name}</Text>
      <Text style={styles.episodeInfo}>Air Date: {air_date}</Text>
      <Text style={styles.episodeInfo}>Episode: {episode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  episodeCard: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  episodeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  episodeInfo: {
    fontSize: 14,
    color: "#555",
  },
});

export default EpisodeItem;
