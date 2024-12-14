import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function DetailsScreen({ route, navigation }: any) {
  const { id = 1 } = route.params || {};

  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [maxId, setMaxId] = useState<number>(1);

  useEffect(() => {
    const fetchMaxId = async () => {
      const response = await fetch(
        "https://sampleapis.assimilate.be/rickandmorty/characters"
      );
      const data = await response.json();
      const highestId = Math.max(
        ...data.map((char: { id: number }) => char.id)
      );
      setMaxId(highestId);
    };

    fetchMaxId();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchCharacter = async () => {
        const response = await fetch(
          `https://sampleapis.assimilate.be/rickandmorty/characters/${id}`
        );
        const data = await response.json();
        setCharacter(data);
        setLoading(false);
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

  const getBackgroundImage = (id: number) => {
    switch (id) {
      case 1:
        return require("./assets/images/rickBackground.jpg");
      case 2:
        return require("./assets/images/mortyBackground.jpg");
      case 3:
        return require("./assets/images/summerBackground.jpg");

      case 4:
        return require("./assets/images/bethBackground.jpg");
      case 5:
        return require("./assets/images/jerryBackground.jpg");
      case 6:
        return require("./assets/images/abadangoBackground.jpg");
      case 7:
        return require("./assets/images/abradolfBackground.jpg");
      case 8:
        return require("./assets/images/adjudicatorBackground.jpg");
      case 9:
        return require("./assets/images/agencyBackground.jpg");
      case 10:
        return require("./assets/images/alanBackground.jpg");

      case 11:
        return require("./assets/images/albertBackground.jpg");
      case 12:
        return require("./assets/images/alexanderBackground.jpg");
      case 13:
        return require("./assets/images/alienGoogahBackground.jpg");
      case 14:
        return require("./assets/images/alienMortyBackground.jpg");
      case 15:
        return require("./assets/images/alienRickBackground.jpg");
      case 16:
        return require("./assets/images/amishBackground.jpg");
      case 17:
        return require("./assets/images/annieBackground.jpg");
      case 18:
        return require("./assets/images/antennaBackground.jpg");
      case 19:
        return require("./assets/images/antennaRickBackground.jpg");
      case 20:
        return require("./assets/images/antsBackground.jpg");
      default:
        return require("./assets/images/default.jpg");
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
      source={getBackgroundImage(character.id)}
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  infoBox: {
    backgroundColor: "white",
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
