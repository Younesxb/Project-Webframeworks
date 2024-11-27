import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import CharacterList from "./components/CharacterList";

const HomeScreen = ({ navigation }: any) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://sampleapis.assimilate.be/rickandmorty/characters");
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleCharacterPress = (id: number) => {
    navigation.navigate("details", { id });
  };

  return (
    <ImageBackground
      source={require("./assets/images/RickAndMortyBackground.jpg")} // Gebruik van de lokale afbeelding
      resizeMode="cover" // Past de afbeelding aan om het hele scherm te vullen
      style={styles.background}
    >
      <View style={styles.container}>
        <CharacterList characters={characters} isLoading={loading} onPress={handleCharacterPress} />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparante overlay voor betere leesbaarheid
  },
});

export default HomeScreen;
