import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';  // Import StackScreenProps
import { RootStackParamList } from './types/types';  // Zorg ervoor dat je 'types' bestand de juiste root param lijst heeft

// Definieer de props van de DetailsScreen met behulp van StackScreenProps
type DetailsScreenProps = StackScreenProps<RootStackParamList, 'details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { id } = route.params;  // Verkrijg 'id' van de route parameters
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://sampleapis.assimilate.be/rickandmorty/characters/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

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
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200, borderRadius: 100, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold' },
});

export default DetailsScreen;
