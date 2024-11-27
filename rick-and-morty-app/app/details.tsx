import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ImageBackground, Button } from "react-native";

export default function DetailsScreen({ route, navigation }: any) {
  // Haal de 'id' op uit de route parameters of gebruik een default id (bijv. id = 1)
  const { id = 1 } = route.params || {}; // Als er geen id is, stel je 1 in als default

  const [character, setCharacter] = useState<any>(null); // Gebruik 'any' voor dynamische data
  const [loading, setLoading] = useState(true);
  const [maxId, setMaxId] = useState<number>(1); // Default maxId is 1, dit gaan we dynamisch instellen

  // Haal de lijst van characters op om de maxId te bepalen
  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const response = await fetch("https://sampleapis.assimilate.be/rickandmorty/characters");
        const data = await response.json();
        const highestId = Math.max(...data.map((char: { id: number }) => char.id));
        setMaxId(highestId); // Stel de hoogste id in
      } catch (error) {
        console.error("Error fetching maxId:", error);
      }
    };

    fetchMaxId();
  }, []);

  // Haal de character data op op basis van de id
  useEffect(() => {
    if (id) { // Zorg ervoor dat de 'id' beschikbaar is
      const fetchCharacter = async () => {
        try {
          const response = await fetch(`https://sampleapis.assimilate.be/rickandmorty/characters/${id}`);
          if (response.ok) {
            const data = await response.json();
            setCharacter(data); // Sla de volledige character data op
          } else {
            console.error(`Failed to fetch character with id ${id}`);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchCharacter();
    }
  }, [id]);

  // Functie om naar de volgende id te navigeren
  const handleNextCharacter = () => {
    // Als de huidige id de hoogste is, ga dan terug naar de eerste id
    const nextId = id === maxId ? 1 : id + 1;
    navigation.navigate("details", { id: nextId });  // Navigeer naar de volgende id
  };

  // Functie om dynamisch de achtergrondafbeelding te bepalen op basis van de naam van het karakter
  const getBackgroundImage = (name: string) => {
    // Haal de voornaam uit de volledige naam (bijvoorbeeld "Rick Sanchez" -> "Rick")
    const firstName = name.split(" ")[0].toLowerCase();

    switch (firstName) {
      case "rick":
        return require("./assets/images/rickBackground.jpg");
      case "morty":
        return require("./assets/images/mortyBackground.jpg");
      case "beth":
        return require("./assets/images/bethBackground.jpg");
      case "summer":
        return require("./assets/images/summerBackground.jpg");
      case "jerry":
        return require("./assets/images/jerryBackground.jpg");
      case "abadango":
        return require("./assets/images/abadangoBackground.jpg");
      case "abradolf":
        return require("./assets/images/abradolfBackground.jpg");
      case "adjudicator":
        return require("./assets/images/adjudicatorBackground.jpg");
      case "agency":
        return require("./assets/images/agencyBackground.jpg");
      case "alan":
        return require("./assets/images/alanBackground.jpg");
      case "alien":
        return require("./assets/images/alienBackground.jpg");
      case "annie":
        return require("./assets/images/annieBackground.jpg");
      case "antenna":
        return require("./assets/images/antennaBackground.jpg");
      case "ants":
        return require("./assets/images/antsBackground.jpg");
      default:
        return require("./assets/images/default.jpg"); // Default achtergrond
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.container}>
        <Text>No character found</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={getBackgroundImage(character.name)} // Dynamische achtergrond per karakter
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.info}>Species: {character.species}</Text>
        <Text style={styles.info}>Status: {character.status}</Text>
        <Text style={styles.info}>Gender: {character.gender}</Text>
        <Text style={styles.info}>Origin: {character.origin}</Text>

        {/* Button to go to the next character */}
        <Button title="Volgende" onPress={handleNextCharacter} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Zorg ervoor dat tekst leesbaar is tegen de achtergrond
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white'
  },
  info: {
    fontSize: 18,
    marginVertical: 4,
    color: 'white'
  },
});
