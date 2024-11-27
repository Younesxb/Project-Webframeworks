import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const CharacterForm = ({ onSubmit }: { onSubmit: (name: string, image: string) => void }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    if (!name || !image) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
    onSubmit(name, image);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Character Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Character Image URL"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Add Character" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default CharacterForm;
