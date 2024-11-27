import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ImageBackground, StyleSheet } from 'react-native';
import HomeScreen from './home';
import DetailsScreen from './details';
import EpisodesScreen from './EpisodesScreen';
import { RootStackParamList } from './types/types';  // Zorg ervoor dat je types importeert

const Drawer = createDrawerNavigator<RootStackParamList>();  // Type je navigator

const RootLayout = () => {
  return (
    <ImageBackground
      source={require("./assets/images/RickAndMortyBackground.jpg")} // Voeg de achtergrondafbeelding toe
      style={styles.background} // Zorg ervoor dat de achtergrond het hele scherm bedekt
      resizeMode="cover" // Zorg ervoor dat de afbeelding het scherm vult
    >
      <Drawer.Navigator
        initialRouteName="home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Maak de header semi-transparant
          },
          headerTitleStyle: {
            color: 'white', // Zet de titel in de header naar wit
          },
          drawerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Maak de drawer semi-transparant
          },
          drawerActiveTintColor: 'white', // Zet actieve tekstkleur in de drawer naar wit
          drawerInactiveTintColor: 'white', // Zet inactieve tekstkleur in de drawer naar wit
        }}
      >
        <Drawer.Screen name="home" component={HomeScreen} options={{ title: "Rick & Morty karakters" }} />
        <Drawer.Screen name="details" component={DetailsScreen} options={{ title: "Details" }} />
        <Drawer.Screen name="episodes" component={EpisodesScreen} options={{ title: "Episodes" }} />
      </Drawer.Navigator>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Zorg ervoor dat de achtergrond het volledige scherm bedekt
  },
});

export default RootLayout;
