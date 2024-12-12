import React from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types/types";
import EpisodeItem from "./components/EpisodeItem";

type NavigationProp = StackNavigationProp<RootStackParamList, "episodes">;

const EpisodesScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [episodes, setEpisodes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch(
        "https://sampleapis.assimilate.be/rickandmorty/episodes"
      );
      const data = await response.json();
      setEpisodes(data);
      setLoading(false);
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EpisodeDetails", { episode: item })
          }
        >
          <EpisodeItem
            name={item.name}
            air_date={item.air_date}
            episode={item.episode}
            season={item.season}
          />
        </TouchableOpacity>
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
