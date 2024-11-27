import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";

interface CharacterItemProps {
  character: { id: number; name: string; image: string };
  onPress: () => void;
}

const CharacterItem = ({ character, onPress }: CharacterItemProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100, // Breedte van elk item
    alignItems: "center",
    marginHorizontal: 5, // Ruimte tussen items
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    color: "#fff",
  },
});

export default CharacterItem;
