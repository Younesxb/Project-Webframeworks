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
        <CharacterItem character={item} onPress={() => onPress(item.id)} />
      )}
      numColumns={3} // Zorgt ervoor dat er drie items per rij staan
      columnWrapperStyle={styles.row} // Styling voor elke rij
      contentContainerStyle={styles.grid} // Extra styling voor de grid
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    padding: 10, // Extra padding voor de grid
  },
  row: {
    justifyContent: "space-between", // Items worden evenredig verdeeld
    marginBottom: 10, // Ruimte tussen de rijen
  },
});

export default CharacterList;
