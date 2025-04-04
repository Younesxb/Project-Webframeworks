import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EpisodeItemProps } from "./types/types";

const EpisodesScreen = () => {
  const [episodes, setEpisodes] = useState<EpisodeItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState<string>("");
  const [airDate, setAirDate] = useState<string>("");
  const [episode, setEpisode] = useState<string>("");
  const [season, setSeason] = useState<string>("");

  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadEpisodes = async () => {
      const response = await fetch(
        "https://sampleapis.assimilate.be/rickandmorty/episodes"
      );
      const data = await response.json();

      const storedEpisodes = await AsyncStorage.getItem("episodes");
      const storedData = storedEpisodes ? JSON.parse(storedEpisodes) : [];

      setEpisodes([...data, ...storedData]);
      setLoading(false);
    };

    loadEpisodes();
  }, []);


  const addEpisode = async () => {
    const newEpisode: EpisodeItemProps = {
      name,
      air_date: airDate,
      episode,
      season,
    };

    const response = await fetch(
      "https://sampleapis.assimilate.be/rickandmorty/episodes",  
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdW5lcy5iZW56aWFuQHN0dWRlbnQuYXAuYmUiLCJpYXQiOjE3MzQyOTc4NzB9.stLrX68XqTkcFBj-wmEe4jklst3M1T3ELbnHmmVQWao`, 
        },
        body: JSON.stringify(newEpisode),  
      }
    );

    if (response.ok) {
      const addedEpisode = await response.json(); 

   //Server respons test
      console.log("Server Response:", addedEpisode);

      const updatedEpisodes = [...episodes, addedEpisode];
      setEpisodes(updatedEpisodes);


      await AsyncStorage.setItem("episodes", JSON.stringify(updatedEpisodes));

      clearForm();
      Alert.alert("Succes", "De aflevering is toegevoegd!");
    } else {
      Alert.alert("Fout", "Er is iets misgegaan bij het toevoegen.");
    }
  };


  const removeEpisode = async (index: number) => {
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
            const updatedEpisodes = episodes.filter((_, i) => i !== index);
            await AsyncStorage.setItem("episodes", JSON.stringify(updatedEpisodes));
            setEpisodes(updatedEpisodes);
            Alert.alert("Succes", "De aflevering is verwijderd!");
          },
        },
      ],
      { cancelable: false }
    );
  };


  const clearForm = () => {
    setName("");
    setAirDate("");
    setEpisode("");
    setSeason("");
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title={isFormVisible ? "Sluit formulier" : "Voeg aflevering toe"}
        onPress={() => setFormVisible((prevState) => !prevState)}
      />

      {isFormVisible && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Afleveringnaam"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Uitzenddatum"
            value={airDate}
            onChangeText={setAirDate}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Afleveringnummer"
            value={episode}
            onChangeText={setEpisode}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Seizoennummer"
            value={season}
            onChangeText={setSeason}
            placeholderTextColor="#888"
          />
          <Button title="Voeg aflevering toe" onPress={addEpisode} />
        </View>
      )}

      <FlatList
        data={episodes}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.episodeItem}>
            <Text>{item.name}</Text>
            <Text>{item.air_date}</Text>
            <Text>Aflevering: {item.episode}</Text>
            <Text>Seizoen: {item.season}</Text>
            <TouchableOpacity
              onPress={() => removeEpisode(index)}
              style={styles.removeButton}
            >
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
    justifyContent: "flex-start",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  episodeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  removeButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default EpisodesScreen;
