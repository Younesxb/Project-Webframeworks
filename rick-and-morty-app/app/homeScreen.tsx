import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
} from "react-native";
import CharacterList from "./components/characterList";
import { HomeScreenProps } from "./types/types";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(
        "https://sampleapis.assimilate.be/rickandmorty/characters"
      );
      const data = await response.json();
      setCharacters(data);
      setFilteredCharacters(data);
      setLoading(false);
    };

    fetchCharacters();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    filterCharacters(text, showFavorites);
  };

  const toggleFavoritesView = () => {
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    filterCharacters(search, newShowFavorites);
  };

  const filterCharacters = (searchText: string, showOnlyFavorites: boolean) => {
    let filtered = characters;

    if (showOnlyFavorites) {
      filtered = filtered.filter((character: any) =>
        favorites.includes(character.id)
      );
    }

    if (searchText) {
      filtered = filtered.filter((character: any) =>
        character.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredCharacters(filtered);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleCharacterPress = (id: number) => {
    navigation.navigate("details", { id });
  };

  return (
    <ImageBackground
      source={require("./assets/images/RickAndMortyBackground.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Zoek een karakter..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={handleSearch}
        />
        <Button
          title={showFavorites ? "Toon Alle" : "Toon Favorieten"}
          onPress={toggleFavoritesView}
        />
        <CharacterList
          characters={filteredCharacters}
          isLoading={loading}
          onPress={handleCharacterPress}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#333",
  },
});

export default HomeScreen;
