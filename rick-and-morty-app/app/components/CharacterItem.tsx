import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Router gebruiken om naar detailspagina te navigeren

const CharacterItem = ({ character, onPress }: { character: any, onPress: () => void }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text style={styles.name}>{character.name}</Text>
        <Button title="Bekijk gegevens" onPress={onPress} />
      </View>
    );
  };

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:"white"
  },
});

export default CharacterItem;
