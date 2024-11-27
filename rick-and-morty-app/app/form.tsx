import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import CharacterForm from "./components/CharacterForm";

const FormScreen = () => {
  const handleAddCharacter = async (name: string, image: string) => {
    try {
      const response = await fetch("https://sampleapis.assimilate.be/rickandmorty/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, image }),
      });

      if (!response.ok) throw new Error("Failed to add character");

      Alert.alert("Success", "Character added successfully!");
    } catch (error) {
      Alert.alert("Error", "Could not add character.");
    }
  };

  return (
    <View style={styles.container}>
      <CharacterForm onSubmit={handleAddCharacter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default FormScreen;
