import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ImageBackground, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Voeg react-native-vector-icons toe

export default function DetailsScreen({ route, navigation }: any) {
  const { id = 1 } = route.params || {};

  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [maxId, setMaxId] = useState<number>(1);

  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const response = await fetch("https://sampleapis.assimilate.be/rickandmorty/characters");
        const data = await response.json();
        const highestId = Math.max(...data.map((char: { id: number }) => char.id));
        setMaxId(highestId);
      } catch (error) {
        console.error("Error fetching maxId:", error);
      }
    };

    fetchMaxId();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchCharacter = async () => {
        try {
          const response = await fetch(`https://sampleapis.assimilate.be/rickandmorty/characters/${id}`);
          if (response.ok) {
            const data = await response.json();
            setCharacter(data);
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

  const handleNextCharacter = () => {
    const nextId = id === maxId ? 1 : id + 1;
    navigation.navigate("details", { id: nextId });
  };

  const handlePreviousCharacter = () => {
    const previousId = id === 1 ? maxId : id - 1;
    navigation.navigate("details", { id: previousId });
  };

  const getBackgroundImage = (name: string) => {
    const firstName = name.split(" ")[0].toLowerCase();
    switch (firstName) {
      case "rick": return require("./assets/images/rickBackground.jpg");
      case "morty": return require("./assets/images/mortyBackground.jpg");
      case "beth": return require("./assets/images/bethBackground.jpg");
      case "summer": return require("./assets/images/summerBackground.jpg");
      case "jerry": return require("./assets/images/jerryBackground.jpg");
      case "abadango": return require("./assets/images/abadangoBackground.jpg");
      case "abradolf": return require("./assets/images/abradolfBackground.jpg");
      case "adjudicator": return require("./assets/images/adjudicatorBackground.jpg");
      case "agency": return require("./assets/images/agencyBackground.jpg");
      case "albert": return require("./assets/images/albertBackground.jpg");
      case "alan": return require("./assets/images/alanBackground.jpg");
      case "alexander": return require("./assets/images/alexanderBackground.jpg");
      case "alien": return require("./assets/images/alienBackground.jpg");
      case "annie": return require("./assets/images/annieBackground.jpg");
      case "antenna": return require("./assets/images/antennaBackground.jpg");
      case "amish": return require("./assets/images/amishBackground.jpg");
      case "ants": return require("./assets/images/antsBackground.jpg");
      default: return require("./assets/images/default.jpg");
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

  const genderIcon = character.gender === "Female" ? "female" : "male"; 

  return (
    <ImageBackground
      source={getBackgroundImage(character.name)}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Icon name="favorite" size={30} color="red" />
            <Text style={styles.boxTitle}>Status</Text>
            <Text style={styles.boxContent}>{character.status}</Text>
          </View>
          <View style={styles.infoBox}>
            <Icon name="person" size={30} color="blue" />
            <Text style={styles.boxTitle}>Species</Text>
            <Text style={styles.boxContent}>{character.species}</Text>
          </View>
          <View style={styles.infoBox}>
            <Icon name={genderIcon} size={30} color="purple" />
            <Text style={styles.boxTitle}>Gender</Text>
            <Text style={styles.boxContent}>{character.gender}</Text>
          </View>
          <View style={styles.infoBox}>
            <Icon name="public" size={30} color="green" />
            <Text style={styles.boxTitle}>Origin</Text>
            <Text style={styles.boxContent}>{character.origin}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Vorige" onPress={handlePreviousCharacter} />
          <Button title="Volgende" onPress={handleNextCharacter} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: "90%",
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
    color: 'white',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    width: "45%",
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "green",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  boxContent: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
});
