import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, TextInput, Button } from "react-native";
import * as Notifications from "expo-notifications"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import CharacterList from "./components/characterList";
import { HomeScreenProps, Character } from "./types/types";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);


  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch("https://sampleapis.assimilate.be/rickandmorty/characters");
      const data = await response.json();
      setCharacters(data);
      setFilteredCharacters(data);
      setLoading(false);
    };

    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };

    fetchCharacters();
    loadFavorites();
  }, []);


  const showNotification = async (characterName: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Favoriet toegevoegd!",
        body: `${characterName} is toegevoegd aan je favorieten.`,
      },
      trigger: null, 
    });
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });


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
      filtered = filtered.filter((character) => favorites.includes(character.id));
    }

    if (searchText) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredCharacters(filtered);
  };

  const toggleFavorite = async (id: number) => {
    const character = characters.find((char) => char.id === id);
    if (!character) return;


    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);

 
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));


    if (!favorites.includes(id)) {
      showNotification(character.name);
    }
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
