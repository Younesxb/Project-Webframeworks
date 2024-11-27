import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const CharacterItem = ({ character, onPress, toggleFavorite, isFavorite }: any) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        <TouchableOpacity onPress={() => toggleFavorite(character.id)}>
          <Text style={styles.favorite}>{isFavorite ? "⭐" : "☆"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5, // Voeg wat ruimte tussen items toe
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center", // Centreer de inhoud
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Maak de afbeelding rond
    marginTop: 10,
  },
  info: {
    padding: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  favorite: {
    fontSize: 20,
    color: "#FFD700",
    marginTop: 5,
  },
});

export default CharacterItem;
