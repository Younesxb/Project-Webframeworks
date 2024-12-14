import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AddCharacterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Stel notificaties in
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Functie om een notificatie te tonen
  const showNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Succes!",
        body: `${name} is succesvol toegevoegd.`,
      },
      trigger: null, // Onmiddellijke melding
    });
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      Alert.alert("Toestemming nodig", "Toestemming is nodig om een afbeelding te kiezen.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri); // Gebruik uri van de eerste asset
    }
  };

  const saveCharacter = async () => {
    if (!name || !description || !image) {
      Alert.alert("Invoer vereist", "Vul alle velden in en kies een afbeelding.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://sampleapis.assimilate.be/rickandmorty/characters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            image,
          }),
        }
      );

      if (response.ok) {
        const savedCharacter = await response.json();

        // Sla tijdelijk op in AsyncStorage
        await AsyncStorage.setItem(
          `character_${savedCharacter.id}`,
          JSON.stringify(savedCharacter)
        );

        // Toon notificatie
        await showNotification();

        Alert.alert("Succes", "Karakter succesvol toegevoegd!");
        navigation.goBack(); // Navigeren terug naar het vorige scherm
      } else {
        throw new Error("Er ging iets mis bij het opslaan van het karakter.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Fout", error.message);
      } else {
        Alert.alert("Fout", "Er is een onbekende fout opgetreden.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Naam"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Beschrijving"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title="Kies afbeelding" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button
        title={loading ? "Opslaan..." : "Opslaan"}
        onPress={saveCharacter}
        disabled={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
});

export default AddCharacterScreen;
