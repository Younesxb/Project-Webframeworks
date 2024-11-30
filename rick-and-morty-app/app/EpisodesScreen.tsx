import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from "react-native";
import EpisodeItem from "./components/EpisodeItem"; // Import het EpisodeItem component

const EpisodesScreen = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          "https://sampleapis.assimilate.be/rickandmorty/episodes"
        );
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        console.error("Error fetching episodes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (episodes.length === 0) {
    return (
      <View style={styles.loader}>
        <Text style={styles.errorText}>Geen afleveringen gevonden.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <EpisodeItem
            name={item.name}
            air_date={item.air_date}
            episode={item.episode}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default EpisodesScreen;
