import { useSearchParams } from "expo-router"; // Gebruik de juiste hook
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function DetailsScreen() {
  const { id } = useSearchParams(); // Verkrijg de parameters via de hook
  const [character, setCharacter] = useState<any>(null); // Gebruik 'any' omdat het op dit moment een onbekend type kan zijn
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {  // Controleer of er een id is
      const fetchCharacter = async () => {
        try {
          const response = await fetch(`https://sampleapis.assimilate.be/rickandmorty/characters/${id}`);
          if (response.ok) {
            const data = await response.json();
            setCharacter(data);
          } else {
            console.error(`Failed to fetch character with id ${id}`);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchCharacter();
    }
  }, [id]); // 'id' als dependency zodat effect opnieuw wordt uitgevoerd wanneer 'id' verandert

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.container}>
        <Text>No character found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 200, height: 200, borderRadius: 100, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: "bold" },
});
