import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CharacterItemProps } from "../types/types";

const CharacterItem = ({
  character,
  onPress,
  toggleFavorite,
  isFavorite,
}: CharacterItemProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        <TouchableOpacity onPress={() => toggleFavorite(character.id)}>
          <Text style={[styles.favorite, isFavorite && styles.activeFavorite]}>
            {isFavorite ? "⭐" : "☆"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%", 
    height: 100,
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
    color: "#D3D3D3", 
    marginTop: 5,
  },
  activeFavorite: {
    color: "#FFD700", 
  },
});

export default CharacterItem;
