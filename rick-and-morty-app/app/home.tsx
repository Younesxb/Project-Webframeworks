import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, TextInput } from "react-native";
import CharacterList from "./components/CharacterList";

const HomeScreen = ({ navigation }: any) => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Zoekterm

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://sampleapis.assimilate.be/rickandmorty/characters");
        const data = await response.json();
        setCharacters(data);
        setFilteredCharacters(data); // Toon standaard alle karakters
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Filter de lijst op basis van de zoekterm
  const handleSearch = (text: string) => {
    setSearch(text); // Update de zoekterm
    const filtered = characters.filter((character: any) =>
      character.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCharacters(filtered); // Update de gefilterde lijst
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
        {/* Zoekbalk */}
        <TextInput
          style={styles.searchBar}
          placeholder="Zoek een karakter..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={handleSearch}
        />
        {/* Lijst van karakters */}
        <CharacterList
          characters={filteredCharacters} // Gebruik de gefilterde lijst
          isLoading={loading}
          onPress={handleCharacterPress}
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
