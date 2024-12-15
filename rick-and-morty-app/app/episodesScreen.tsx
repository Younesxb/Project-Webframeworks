import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import EpisodeItem from "./components/episodeItem"; 

const EpisodesScreen = () => {
  const [episodes, setEpisodes] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch("https://sampleapis.assimilate.be/rickandmorty/episodes");
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={episodes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <EpisodeItem
          name={item.name}
          air_date={item.air_date}
          episode={item.episode}
          season={item.season}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EpisodesScreen;
