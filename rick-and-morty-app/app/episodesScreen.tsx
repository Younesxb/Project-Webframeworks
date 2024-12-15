import React, { useState, useEffect } from "react"; 
import { FlatList, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { EpisodeItemProps } from "./types/types"; // Importeer de interface

const EpisodesScreen = () => {
  const [episodes, setEpisodes] = useState<EpisodeItemProps[]>([]); // Gebruik de EpisodeItemProps interface
  const [loading, setLoading] = useState(true);

  // States voor formulierinput
  const [name, setName] = useState<string>("");
  const [airDate, setAirDate] = useState<string>("");
  const [episode, setEpisode] = useState<string>("");
  const [season, setSeason] = useState<string>("");

  // Laad de afleveringen uit AsyncStorage en de API
  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        // Haal de originele afleveringen van de API op
        const response = await fetch("https://sampleapis.assimilate.be/rickandmorty/episodes");
        const data = await response.json();

        // Laad de opgeslagen afleveringen uit AsyncStorage
        const storedEpisodes = await AsyncStorage.getItem("episodes");
        const storedData = storedEpisodes ? JSON.parse(storedEpisodes) : [];

        // Combineer de originele afleveringen en de opgeslagen afleveringen
        setEpisodes([...data, ...storedData]); // Voeg de originele en opgeslagen afleveringen samen
      } catch (error) {
        console.error("Error loading episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, []);

  // Voeg een nieuwe aflevering toe via de POST request (geïmplementeerd als opslag in AsyncStorage)
  const addEpisode = async () => {
    const newEpisode: EpisodeItemProps = {
      name,
      air_date: airDate,
      episode,
      season,
    };

    const updatedEpisodes = [...episodes, newEpisode];

    try {
      await AsyncStorage.setItem("episodes", JSON.stringify(updatedEpisodes)); // Sla de nieuwe aflevering op in AsyncStorage
      setEpisodes(updatedEpisodes); // Werk de lijst bij met de nieuwe aflevering
      clearForm();

      // Alert bij succesvol toevoegen
      Alert.alert("Succes", "De aflevering is toegevoegd!");
    } catch (error) {
      console.error("Error saving episode:", error);
    }
  };

  // Verwijder een episode uit de lijst en AsyncStorage
  const removeEpisode = async (index: number) => {
    // Vraag om bevestiging voordat je verwijdert
    Alert.alert(
      "Weet je het zeker?",
      "Wil je deze aflevering verwijderen?",
      [
        {
          text: "Annuleren",
          style: "cancel",
        },
        {
          text: "Verwijderen",
          onPress: async () => {
            const updatedEpisodes = episodes.filter((_, i) => i !== index); // Verwijder het item op basis van de index

            try {
              await AsyncStorage.setItem("episodes", JSON.stringify(updatedEpisodes)); // Sla de bijgewerkte lijst op in AsyncStorage
              setEpisodes(updatedEpisodes); // Werk de lijst bij in de staat

              // Alert bij succesvol verwijderen
              Alert.alert("Succes", "De aflevering is verwijderd!");
            } catch (error) {
              console.error("Error removing episode:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Clear the form inputs after adding a new episode
  const clearForm = () => {
    setName("");
    setAirDate("");
    setEpisode("");
    setSeason("");
  };

  // Loader when data is being fetched
  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Form to add a new episode */}
      <TextInput
        style={styles.input}
        placeholder="Afleveringnaam"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888" // Set placeholder color to a greyish tone
      />
      <TextInput
        style={styles.input}
        placeholder="Uitzenddatum"
        value={airDate}
        onChangeText={setAirDate}
        placeholderTextColor="#888" // Set placeholder color to a greyish tone
      />
      <TextInput
        style={styles.input}
        placeholder="Afleveringnummer"
        value={episode}
        onChangeText={setEpisode}
        placeholderTextColor="#888" // Set placeholder color to a greyish tone
      />
      <TextInput
        style={styles.input}
        placeholder="Seizoennummer"
        value={season}
        onChangeText={setSeason}
        placeholderTextColor="#888" // Set placeholder color to a greyish tone
      />
      <Button title="Voeg aflevering toe" onPress={addEpisode} />

      {/* List of episodes */}
      <FlatList
        data={episodes}
        keyExtractor={(item, index) => index.toString()} // Use index as key
        renderItem={({ item, index }) => (
          <View style={styles.episodeItem}>
            <Text>{item.name}</Text>
            <Text>{item.air_date}</Text>
            <Text>Aflevering: {item.episode}</Text>
            <Text>Seizoen: {item.season}</Text>

            {/* Remove button */}
            <TouchableOpacity onPress={() => removeEpisode(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start", // Ensure everything starts from the top
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12, // Increased space between inputs
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  episodeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "column", // Change direction to column for better stacking
    alignItems: "flex-start", // Align text to the start
  },
  removeButton: {
    backgroundColor: "#ff6347", // Tomato color
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10, // Add some margin to separate the button from text
    alignSelf: "center", // Center the button
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default EpisodesScreen;
