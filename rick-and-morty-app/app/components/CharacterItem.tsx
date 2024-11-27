import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const CharacterItem = ({ character, onPress, toggleFavorite, isFavorite }: any) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(character.id)}>
          <Text style={styles.favorite}>{isFavorite ? "⭐" : "☆"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  favorite: {
    fontSize: 20,
    color: "#FFD700",
  },
});

export default CharacterItem;
