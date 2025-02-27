import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import CharacterItem from "./characterItem";
import { CharacterListProps } from "../types/types";

const CharacterList = ({
  characters,
  isLoading,
  onPress,
  toggleFavorite,
  favorites,
}: CharacterListProps) => {
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (characters.length === 0) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "#fff" }}>Geen karakters gevonden</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CharacterItem
          character={item}
          onPress={() => onPress(item.id)}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(item.id)}
        />
      )}
      numColumns={3} 
      columnWrapperStyle={styles.row} 
    />
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: {
    justifyContent: "space-between", 
    marginBottom: 10,
  },
});

export default CharacterList;
