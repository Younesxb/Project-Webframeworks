import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ImageBackground, StyleSheet } from "react-native";
import HomeScreen from "./home";
import DetailsScreen from "./details";
import EpisodesStack from "./components/EpisodesStack"; 

import { RootStackParamList } from "./types/types";

const Drawer = createDrawerNavigator<RootStackParamList>();

const RootLayout = () => {
  return (
    <ImageBackground
      source={require("./assets/images/RickAndMortyBackground.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <Drawer.Navigator
        initialRouteName="home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparante header
          },
          headerTitleStyle: {
            color: "white", // Witte titel in de header
          },
          drawerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparante drawer
          },
          drawerActiveTintColor: "white", // Actieve tekstkleur in de drawer
          drawerInactiveTintColor: "white", // Inactieve tekstkleur in de drawer
        }}
      >
        <Drawer.Screen
          name="home"
          component={HomeScreen}
          options={{ title: "Rick & Morty karakters" }}
        />
        <Drawer.Screen
          name="details"
          component={DetailsScreen}
          options={{ title: "Details" }}
        />
        <Drawer.Screen
          name="episodes"
          component={EpisodesStack} // Gebruik de aparte EpisodesStack component hier
          options={{ title: "Episodes" }}
        />
      </Drawer.Navigator>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default RootLayout;
