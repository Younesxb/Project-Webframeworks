import React from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import CharacterItem from "./CharacterItem";

interface CharacterListProps {
  characters: Array<{ id: number; name: string; image: string }>;
  isLoading: boolean;
  onPress: (id: number) => void;
}

const CharacterList = ({ characters, isLoading, onPress }: CharacterListProps) => {
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
    data={characters}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      // Geef het hele character object door in plaats van losse props
      <CharacterItem character={item} onPress={() => onPress(item.id)} />
    )}
  />
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CharacterList;
